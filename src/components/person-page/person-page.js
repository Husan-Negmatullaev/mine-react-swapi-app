import React, {Component} from 'react';

import './person-page.scss'
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Raw from "../UI/raw";
import ErrorBoundary from "../UI/error-boundary";

export default class PersonPage extends Component {
    swapi = new SwapiService()

    state = {
        personId: null
    }

    onPersonId = (id) => {
        this.setState({
            personId: id
        })
    }

    render() {
        const {personId, error} = this.state
        if (error) {
            return <ErrorIndicator />
        }

        const itemList = (
            <ItemList
                getData={this.swapi.getAllPeople}
                onPersonId={this.onPersonId}>
                {(i) => (
                    <span>{i.name}, ({i.birthYear}, {i.gender})</span>
                )}
            </ItemList>
        )

        const personDetails = (
            <ItemDetails personId={personId} />
        )

        return (
            <ErrorBoundary>
                <Raw left={itemList} right={personDetails} />
            </ErrorBoundary>
        )
    }
}