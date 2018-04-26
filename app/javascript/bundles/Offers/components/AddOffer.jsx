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
            advertisement: '',
            payout: '',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm = (e) => {
        e.stopPropagation()
        this.props.createHandler(this.state)
    }

    cancelSubmit = () => {
        this.props.cancelHandler();
    }

    render() {
        return (
            <Form inline onSubmit={this.submitForm}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Name</Label>
                    <Input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Advert</Label>
                    <Input type="text" name="advertisement" value={this.state.advertisement} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Payout</Label>
                    <Input type="number" step="0.5" name="payout" value={this.state.payout} onChange={this.handleChange}/>
                </FormGroup>
                <Button color="success" className="mb-2 mr-sm-2 mb-sm-0" onClick={this.submitForm}>Save</Button>
                <Button color="secondary" className="mb-2 mr-sm-2 mb-sm-0"  onClick={this.cancelSubmit}>Cancel</Button>
            </Form>
        );
    }
}