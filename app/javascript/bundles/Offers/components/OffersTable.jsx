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
        removeHandler: PropTypes.func.isRequired,
    }

    updateTableData = (key, id) => {
        return (value) => this.props.updateHandler({key, value, id})
    }

    removeRow = (id) => {
        return () => {
            if (confirm('Are you sure remove this row?')) {
                this.props.removeHandler(id)
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
                {this.props.offers.map(({ id, name, advertiser, payout }) => {
                    return(<tr key={uniqueId()}>
                        <td>{id}</td>
                        <EditableCell value={name} updateHandler={this.updateTableData('name', id)} />
                        <EditableCell value={advertiser} updateHandler={this.updateTableData('advertiser', id)} />
                        <EditableCell value={payout} updateHandler={this.updateTableData('payout', id)} />
                        <td>
                            <Button color="danger" size="sm" onClick={this.removeRow(id)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </td>
                    </tr>)
                })}
                </tbody>
            </Table>
        );
    }
}