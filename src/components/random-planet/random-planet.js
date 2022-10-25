import React, { Component } from 'react';

import './random-planet.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

    swapi = new SwapiService()

    state = {
        planet: null,
        error: false,
        loading: true,
    }

    componentDidMount() {
        this.updatePlanet()
        this.interval = setInterval(this.updatePlanet, 2500)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        })
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 10) + 2
        this.swapi
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }

    onError = (error) => {
        this.setState({
            error,
            loading: false
        })
    }

    render() {
        const {loading, error, planet} = this.state

        const hasData = !(loading || error)
        const sendError = error ? <ErrorIndicator /> : null
        const loader = loading ? <Spinner /> : null
        const content = hasData ? <PlanetView planet={planet} /> : null

        return (
            <div className="random-planet jumbotron rounded">
                {sendError}
                {loader}
                {content}
            </div>
        );
    }
}

const PlanetView = ({planet}) => {
    const {id, name, population, rotationPeriod, diameter} = planet
    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )

}