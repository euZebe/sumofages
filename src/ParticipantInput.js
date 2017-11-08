import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const DATE_FORMAT = 'DD/MM/YYYY';

export default class ParticipantInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', dateOfBirth: null };
    }

    handleValueChanged = (field) => {
        this.setState({ [field.target.name]: field.target.value });
    }

    handleDateOfBirthChanged = (dateOfBirth) => {
        const { participant } = this.props;
        this.setState({ dateOfBirth });
        if (dateOfBirth.isValid()) {
            participant.name = this.state.name;
            participant.dateOfBirth = dateOfBirth;
            this.props.onDateOfBirthChange(participant);
        }
    }

    render() {
        const { name, dateOfBirth } = this.state;
        return (
            <div className='row justify-content-around'>
                <Input
                    name='name'
                    placeholder='name'
                    value={name}
                    onChange={this.handleValueChanged}
                    className='col-6'
                />
                <DatePicker
                    selected={dateOfBirth}
                    onChange={this.handleDateOfBirthChanged}
                    className='form-control'
                    dateFormat={DATE_FORMAT}
                />
            </div>
        );
    }
}

ParticipantInput.propTypes = {
    onDateOfBirthChange: PropTypes.func,
    participant: PropTypes.object,
    index: PropTypes.number,
}
