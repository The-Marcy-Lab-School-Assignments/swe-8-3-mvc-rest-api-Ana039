import handleFetch from "./handleFetch"

export const getAllHeroes = async () => {
  const [allHeroes, error] = await handleFetch('/api/heroes/') 
  return [allHeroes, error];
}

export const getHeroById = async (id) => {
  const [hero, error] = await handleFetch(`/api/heroes/${id}`); 
  return [hero, error];
}

export const createHero = async (name, power) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, power })
  }

  const [newHero, error] = await handleFetch(`/api/heroes/`, options); 
  return [newHero, error];
}

export const deleteHero = async (id) => {
  const options = {
    method: "DELETE",
  };
  const [success, error] = await handleFetch(`/api/heroes/${id}`, options); 
  return [success, error];
}

export const updateHeroName = async (id, name, power) => {
  const options = {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, power })
  };

  const [updatedHero, error] = await handleFetch(`/api/heroes/${id}`, options); 
  return [updatedHero, error];
}
