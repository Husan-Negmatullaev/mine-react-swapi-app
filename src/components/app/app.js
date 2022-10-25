import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import ItemDetails from '../item-details';

import './app.css';
import ErrorButton from "../UI/error-button";
import ErrorIndicator from "../error-indicator";
import PersonPage from "../person-page";
import SwapiService from "../../services/swapi-service";
import ErrorBoundary from "../UI/error-boundary";
import Raw from "../UI/raw";
import {Record} from "../item-details/item-details";

export default class App extends Component {
    swapi = new SwapiService()

    render() {
        const { getPerson,
                getPlanet,
                getPersonImage,
                getStarshipImage} = this.swapi

        const personDetails = (
            <ItemDetails
                getData={getPerson}
                personId={11}
                getImageUrl={getPersonImage}>
                <Record label="Gender" fields="gender" />
                <Record label="Birth Year" fields="birthYear" />
            </ItemDetails>
        )

        const starshipDetail = (
            <ItemDetails
                getData={getPlanet}
                personId={11}
                getImageUrl={getStarshipImage}/>
        )
        return (
            <ErrorBoundary>
                <Header />
                {/*<RandomPlanet />*/}
                {/*<ErrorButton />*/}
                {/*<PersonPage />*/}
                <Raw left={personDetails} right={starshipDetail} />
            </ErrorBoundary>
        );
    }
};