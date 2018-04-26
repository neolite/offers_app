import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import Loader from 'react-loaders';
import OffersTable from './components/OffersTable';
import AddOfferForm from './components/AddOffer';
import Api from './lib/Api';

export default class App extends React.Component {
    static propTypes = {
        offers: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { offers: this.props.offers, addOffer: false, isLoading: false };
        this.rest = Api;
    }

    createOffer = (offer) => {
        this.setState({ isLoading: true })
        this.rest.post('/offers', {
            offer
        })
        .then(() => {
            this.toggleAddOfferForm()
            this.updateOffers()
        })
        .catch(console.error)
        .finally(() => this.setState({ isLoading: false }))
    }

    updateOffer = ({ key, value, id }) => {
        this.setState({ isLoading: true })
        this.rest
        .put(`/offers/${id}`, { [key]: value })
        .then(() => this.updateOffers())
        .catch(console.error)
        .finally(() => this.setState({ isLoading: false }))
    }

    toggleAddOfferForm = () => {
        this.setState({ addOffer: !this.state.addOffer })
    }

    updateOffers = () => {
        this.rest.get('/offers.json')
        .then((req) => {
            this.setState({ offers: req.data })
        })
        .catch(console.error)
        .finally(() => this.setState({ isLoading: false }))
    }

    removeOffer = (id) => {
        this.rest
        .delete(`/offers/${id}`)
        .then(() => this.updateOffers())
        .catch(console.error)
    }

    render() {
        return (
            <div>
                <span className="loader-wrapper">
                    <Loader type="ball-rotate" active={this.state.isLoading} />
                </span>
                <div className="add-offer">
                    { this.state.addOffer ? <AddOfferForm createHandler={this.createOffer} cancelHandler={this.toggleAddOfferForm}/>
                    : <Button onClick={this.toggleAddOfferForm} color='primary'>New offer</Button>}
                </div>
                <OffersTable offers={this.state.offers} updateHandler={this.updateOffer} removeHandler={this.removeOffer}/>
            </div>
        );
    }
}
