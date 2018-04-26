import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class AddOffer extends React.Component {
    static propTypes = {
        createHandler: PropTypes.func.isRequired,
        cancelHandler: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            advertiser: '',
            payout: '',
            errors: {
                name: false,
                advertiser: false,
                payout: false,
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const isInvalid = value.length < 2;
        this.setState({
            [name]: value,
            errors: Object.assign(this.state.errors, { [name]: isInvalid })
        })
    }

    submitForm = (e) => {
        e.stopPropagation()
        const { errors, ...offer } = this.state;
        const isTrue = (e) => e === true;
        const formErrors = Object.entries(offer).reduce((acc, [k, v]) => Object.assign(acc, {[k]: v.length < 2}), {});
        if (Object.values(formErrors).some(isTrue)) {
            this.setState({ errors: formErrors });
            return false
        }
        this.props.createHandler(offer);
    }

    cancelSubmit = () => {
        this.props.cancelHandler();
    }

    render() {
        const { errors, name, advertiser, payout } = this.state;
        return (
            <Form inline onSubmit={this.submitForm}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Name</Label>
                    <Input type="text" name="name" value={name} onChange={this.handleChange} invalid={errors.name}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Advertiser</Label>
                    <Input type="text" name="advertiser" value={advertiser} onChange={this.handleChange} invalid={errors.advertiser}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Payout</Label>
                    <Input type="number" pattern="[0-9.]+" step="0.5" name="payout" value={payout} onChange={this.handleChange} invalid={errors.payout}/>
                </FormGroup>
                <Button color="success" className="mb-2 mr-sm-2 mb-sm-0" onClick={this.submitForm}>Save</Button>
                <Button color="secondary" className="mb-2 mr-sm-2 mb-sm-0"  onClick={this.cancelSubmit}>Cancel</Button>
            </Form>
        );
    }
}