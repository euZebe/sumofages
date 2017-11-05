import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
// import DatePicker from 'react-datepicker'
import { Input } from 'reactstrap'

const DATE_FORMAT = 'DD/MM/YYYY';

export default class ParticipantInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', dateOfBirth: '' };
    }

    handleValueChanged = (field) => {
        this.setState({ [field.target.name]: field.target.value });
    }

    handleDateOfBirthChanged = (field) => {
        const { participant } = this.props;
        const value = field.target.value;
        this.setState({ [field.target.name]: value });
        const dateAsMoment = moment(value, DATE_FORMAT, true);
        if (dateAsMoment.isValid()) {
            participant.name = this.state.name;
            participant.dateOfBirth = dateAsMoment;
            this.props.onDateOfBirthChange(participant);
        }
    }

    render() {
        const { index } = this.props;
        const { name, dateOfBirth } = this.state;
        return (
            <div className='participant-input'>
                <label>#{index}</label>
                <Input
                    name='name'
                    placeholder='name'
                    value={name}
                    onChange={this.handleValueChanged}
                />
                <Input
                    name='dateOfBirth'
                    placeholder='dd/MM/yyyy'
                    value={dateOfBirth}
                    onChange={this.handleDateOfBirthChanged}
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
