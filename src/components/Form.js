import React from 'react';
import { func } from 'prop-types';
import { Input } from 'reactstrap';
import { translate } from 'react-i18next';
import 'react-toggle/style.css'
import Toggle from 'react-toggle'
import { getDateForAccruedAges, getDateForAccruedDays, Participant } from 'sumofages-lib';
import ParticipantInput from './ParticipantInput'
import FormButtons from './FormButtons'

const computationModes = [ 'by-ages', 'by-days'];

class Form extends React.Component {

    constructor() {
        super();
        this.state = {
            participants: [new Participant()],
            expectedAge: '',
            resultDate: '',
        };

        this.mode = computationModes[0];
    }

    addParticipant = () => {
        this.state.participants.push(new Participant());
        this.setState({ participants: this.state.participants })
    }

    handleDateOfBirthChange = (updated) => {
        const { participants } = this.state;
        participants.splice(
            participants.indexOf(participants.filter(p => p.id === updated.id)[0]),
            1,
            updated
        );
        const allDatesFilled = this.state.participants.reduce(
            (allFilled, p) => allFilled && p.dateOfBirth && p.dateOfBirth.isValid()
            , true);
        if (allDatesFilled) {
            this.addParticipant();
        }
        this.setState({ error: '' })
    }

    setExpectedAge = (field) => {
        this.setState({
            expectedAge: Number.parseInt(field.target.value, 10) || undefined,
            resultDate: '',
        });
    }

    process = () => {
        const { expectedAge, participants } = this.state;
        try {
            // remove the last participant as it is a blank one
            const clearedParticipants = participants.slice(0, participants.length - 1);

            const resultDate = this.mode === computationModes[0]
                ? getDateForAccruedAges(expectedAge, ...clearedParticipants)
                : getDateForAccruedDays(expectedAge, ...clearedParticipants);
            
            this.setState({ resultDate, error: null });
        } catch (error) {
            console.error(error)
            this.setState({ error, resultDate: null });
        }
    }

    clearAll = () => {
        this.setState({
            participants: [new Participant()],
            expectedAge: '',
            resultDate: '',
        })
    }

    handleModeChange = () => {
        this.mode = computationModes.find(m => m !== this.mode);
    }

    render() {
        const { t } = this.props;
        const { participants, resultDate, expectedAge, error } = this.state;
        const processButtonDisabled = !expectedAge && true;

        const resultMessageKey = expectedAge >= 2 ? 'result_plural' : 'result_singular';
        const date_format = t('date_format_displayed');

        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <Input
                        type='number'
                        name='expectedAge'
                        placeholder={t('expected_age_label')}
                        onChange={this.setExpectedAge}
                        value={expectedAge}
                        className='col-sm-6'
                    />
                </div>
                <div className='row justify-content-center'>
                    <div className='toggle'>
                        <span>{t('by_age')}</span>
                        <Toggle icons={{checked: null, unchecked: null}} onChange={this.handleModeChange}/>
                        <span>{t('by_day')}</span>
                    </div>
                </div>

                {participants.map(p =>
                    <ParticipantInput
                        key={p.id}
                        participant={p}
                        onDateOfBirthChange={this.handleDateOfBirthChange}
                    />)
                }

                <FormButtons
                    process={this.process}
                    processButtonDisabled={processButtonDisabled}
                    clearAll={this.clearAll}
                />

                <div className='row justify-content-center'>
                    {resultDate &&
                    <h6 id="result">{expectedAge} {t(resultMessageKey)} {resultDate.format(date_format)}</h6>}
                    {error && <h6 id="error" className='error'>{error.message}</h6>}
                </div>
            </div>
        );
    }
}

Form.propTypes = {
    t: func.isRequired,
};

export default translate()(Form);
