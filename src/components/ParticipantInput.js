import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'
import i18next from 'i18next'
import { Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

class ParticipantInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', dateOfBirth: null, dateFormat: props.t('date_format_accepted') };

        i18next.on('languageChanged', (lng) => this.setState({ dateFormat: props.t('date_format_displayed') }));
    }

    handleValueChanged = (field) => {
        this.setState({ [field.target.name]: field.target.value });
    }

    handleDateOfBirthChanged = (date) => {
        if (moment.isMoment(date) && date.isValid()) {
            this.setState({ dateOfBirth: date });
            const { participant } = this.props;
            participant.name = this.state.name;
            participant.dateOfBirth = date;
            this.props.onDateOfBirthChange(participant);
        }
    }

    render() {
        const { t } = this.props;
        const { name, dateOfBirth, dateFormat } = this.state;

        if (this.props.participant.dateOfBirth) {
            console.log(this.props.participant.dateOfBirth.format('DD/MM/YYYY'))
        }

        return (
            <div className='row justify-content-center'>
                <Input
                    name='name'
                    placeholder={t('name_label')}
                    value={name}
                    onChange={this.handleValueChanged}
                    className='col-6'
                />
                <DatePicker
                    name='dateOfBirth'
                    selected={dateOfBirth}
                    onChange={this.handleDateOfBirthChanged}
                    className='form-control'
                    dateFormat={dateFormat}
                    placeholderText={t('date_of_birth_label')}
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

export default translate()(ParticipantInput);
