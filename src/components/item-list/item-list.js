import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";
import './item-list.css';
import Spinner from "../spinner";

export default class ItemList extends Component {
    swapi = new SwapiService()

    state = {
        itemList: null,
        error: false,
        loading: true
    }

    onError = (error) => {
        this.setState({error})
    }

    componentDidMount() {
        const { getData } = this.props
        getData()
            .then((itemList) => {
                this.setState({
                    itemList,
                    loading: false
                })
            })
            .catch(this.onError)
    }

    renderItems = (data) => {
        return data.map((item) => {
            const {id} = item
            const label = this.props.children(item)
            return (
                <li key={id}
                    className="list-group-item"
                    onClick={() => this.props.onPersonId(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state
        if (!itemList) {
            return <Spinner />
        }
        const items = this.renderItems(itemList)
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}