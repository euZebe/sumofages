import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import i18next from 'i18next'
import { Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

class ParticipantInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', dateOfBirth: null };
        this.DATE_FORMAT = props.t('date_format_accepted');

        i18next.on('languageChanged', (lng) => this.DATE_FORMAT = props.t('date_format_accepted'));
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
        const { t } = this.props;
        const { name, dateOfBirth } = this.state;
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
                    selected={dateOfBirth}
                    onChange={this.handleDateOfBirthChanged}
                    className='form-control'
                    dateFormat={this.DATE_FORMAT}
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
