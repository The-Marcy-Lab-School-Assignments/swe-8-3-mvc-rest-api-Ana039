import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getHeroById, updateHeroName, deleteHero } from '../adapters/heroAdapters';

const HeroDetails = () => {
  const [hero, setHero] = useState({})
  const [newHeroName, setNewHeroName] = useState('');
  const [power, setPower] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      const [foundHero, error] = await getHeroById(id);
      setHero(foundHero);
    };
    doFetch();
  }, [])

  // when the delete button is pressed, send a DELETE request
  const handleDeleteHero = async () => {
    await deleteHero(id);
    navigate('/');
  }

  // when the form is filled out, send a PATCH request
  const handleUpdateHero = async (e) => {
    e.preventDefault();

    const [updatedHero, error] = await updateHeroName(id, newHeroName, power);
    setHero(updatedHero);
    setNewHeroName('');
    setPower('');  
  }

  return (
    <>
      <Link to='/'>Go Home</Link>
      <h1>Hero Details</h1>
      <p>Name: {hero.name}</p>
      <p>Id: {hero.id}</p>
      <p>Power: {hero.power}</p>
      <form onSubmit={handleUpdateHero}>
        <label htmlFor="name">Update Hero Name</label> 
        <input type="text" name="name" id="name" value={newHeroName} onChange={(e) => setNewHeroName(e.target.value)} placeholder='New Name' />
        <label htmlFor="power"> Update Hero Power</label>
        <input type="text" name="power" id="power" value={power} onChange={(e) => setPower(e.target.value)}  placeholder='New Power' />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDeleteHero} className='danger'>Delete Hero</button>
    </>
  )
}

export default HeroDetails;
