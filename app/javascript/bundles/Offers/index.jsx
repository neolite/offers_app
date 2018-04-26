import PropTypes from 'prop-types';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import { Button } from 'reactstrap';
import OffersTable from './components/OffersTable';
import AddOfferForm from './components/AddOffer';

export default class App extends React.Component {
    static propTypes = {
        offers: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { offers: this.props.offers, addOffer: false };
        const header = ReactOnRails.authenticityHeaders('X-CSRF-Token');
        const csrfToken = ReactOnRails.authenticityToken();
        console.log({ csrfToken , header })
        axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
        this.rest = axios.create({
            timeout: 10000,
        });
    }

    createOffer = (offer) => {
        console.log({ offer });
        this.rest.post('/offers', {
            offer
        }).then(() => {
            console.log('saved data');
            this.toggleAddOfferForm()
        })
    }
    updateHandler = (val) => {
        console.log(val)
    }

    toggleAddOfferForm = () => {
        this.setState({ addOffer: !this.state.addOffer })
    }

    render() {
        return (
            <div>
                <div className="add-offer">
                    { this.state.addOffer ? <AddOfferForm createHandler={this.createOffer} cancelHandler={this.toggleAddOfferForm}/>
                    : <Button onClick={this.toggleAddOfferForm} color='primary'>New offer</Button>}
                </div>
                <OffersTable offers={this.state.offers} updateHandler={this.updateHandler}/>
            </div>
        );
    }
}
