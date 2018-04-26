import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { Table, Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import EditableCell from './EditableCell';

export default class OffersTable extends React.Component {

    static propTypes = {
        offers: PropTypes.array.isRequired, // this is passed from the Rails view
        updateHandler: PropTypes.func.isRequired,
    }

    createOffer = (offer) => {
        console.log({ offer })
    }

    updateTableData = (key, id) => {
        return (value) => this.props.updateHandler({key, value, id})
    }

    removeRow = (id) => {
        return () => {
            if (confirm('Are you sure remove this row?')) {
                console.log(`removig ${id}`)
            };
        }
    }

    render() {
        return (
            <Table className="offers-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Advertiser</th>
                    <th>Payout</th>
                </tr>
                </thead>
                <tbody>
                {this.props.offers.map(({ id, name, advertiser, payout }, idx) => {
                    return(<tr key={uniqueId()}>
                        <td>{id}</td>
                        <EditableCell value={name} updateHandler={this.updateTableData('name', idx)} />
                        <EditableCell value={advertiser} updateHandler={this.updateTableData('advertiser', idx)} />
                        <EditableCell value={payout} updateHandler={this.updateTableData('payout', idx)} />
                        <td>
                            <Button color="danger" size="sm" onClick={this.removeRow(idx)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </td>
                    </tr>)
                })}
                </tbody>
            </Table>
        );
    }
}