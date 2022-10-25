import React, { Component } from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorButton from "../UI/error-button";

const Record = ({item, label, fields}) => {
  return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{fields}</span>
      </li>
  )
}

export {Record}

export default class ItemDetails extends Component {
  swapi = new SwapiService()

  state = {
    itemDetail: null,
    loading: false,
    error: false,
    image: null
  }

  componentDidUpdate(prevProps) {
    if(this.props.personId !== prevProps.personId) {
      this.updatePerson()
    }
  }

  componentDidMount() {
    this.updatePerson()
  }

  onError(error) {
    this.setState({
      error,
      loading: false
    })
  }

  updatePerson() {
    const id = this.props.personId
    if (!id) {
      return
    }
    const {getData, getImageUrl} = this.props

    this.setState({loading: true})
    getData(id)
      .then((itemDetail) => {
        this.setState({
          itemDetail,
          loading: false,
          image: getImageUrl(itemDetail)
        })
      })
      .catch(this.onError)
  }

  render() {
    const {itemDetail, loading, image} = this.state
    if (loading) {
      return <Spinner />
    }
    if (!itemDetail) {
      return <span>Choose the person for more information</span>
    }
    const {id, name, height, birthYear, gender} = itemDetail
    return (
      <div className="person-details card mt-0">
        <img className="person-image"
          src={image} />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child, idx) => {
              return <li>{idx}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}
