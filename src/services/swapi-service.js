export default class SwapiService {
  _apiBase = 'https://swapi.dev/api'
  _imageBase = 'https://starwars-visualguide.com/assets/img'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`)
    }
    const body = await res.json()
    return body
  }

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`)
    return res.results.map(this._transformPerson)
  }

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}`)
    return this._transformPerson(person)
  }

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`)
    return res.results.map(this._transformPlanet)
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}`)
    return this._transformPlanet(planet)
  }

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`)
    return res.results.map(this._transformStarship)
  }

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}`)
    return this._transformStarship(starship)
  }

  getPersonImage = ({id}) => {
    return `${this._imageBase}/characters/${id}.jpg`
  }

  getStarshipImage = ({id}) => {
    return `${this._imageBase}/starships/${id}.jpg`
  }
  getPlanetImage = ({id}) => {
    return `${this._imageBase}/planets/${id}.jpg`
  }

  _extractId(item) {
    const idRegExp = (/\/([0-9]*)\/$/)
    return item.url.match(idRegExp)[1]
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    }
  }

  _transformStarship = (ship) => {
    return {
      id: this._extractId(ship),
      name: ship.name,
      model: ship.model,
      manufacturer: ship.manufacturer,
      costInCredits: ship.costInCredits,
      length: ship.length,
      crew: ship.crew,
      passengers: ship.passengers,
      cargoCapacity: ship.cargoCapacity
    }
  }

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      height: person.height,
      birthYear: person.birth_year,
      gender: person.gender
    }
  }
}

