import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faEdit } from '@fortawesome/fontawesome-free-solid';

export default class EditableCell extends React.Component {
    static propTypes = {
        value: PropTypes.string.isRequired, // this is passed from the Rails view
        updateHandler: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            value: this.props.value,
            savedValue: this.props.value,
        }
    }

    handleEdit = () => {
        this.setState({ isEdit: true })
    }

    cancelEdit = () => {
        this.setState({ isEdit: false, value: this.state.savedValue  })
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSave()
        }
    }

    handleSave = () => {
        this.setState({ isEdit: false })
        this.props.updateHandler(this.state.value)
    }

    render() {
        return(
            <td className="editable-cell">
            {
                this.state.isEdit ?
                    <span>
                        <input value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                        <Button onClick={this.handleSave} color="success" size="sm">
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        <Button onClick={this.cancelEdit} color="secondary" size="sm">
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </span>
                    : <span>
                        {this.state.value}
                        <Button onClick={this.handleEdit} color="light" size="sm">
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </span>
            }
            </td>
        )
    }

}