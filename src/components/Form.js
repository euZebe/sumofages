import React from 'react';
import { Input } from 'reactstrap';
import { translate } from 'react-i18next';
import Participant from '../model/Participant'
import ParticipantInput from './ParticipantInput'
import { getDateForAccruedAges } from '../model/age-calculator'
import FormButtons from './FormButtons'

class Form extends React.Component {

    constructor() {
        super();
        this.state = {
            participants: [new Participant()],
            expectedAge: '',
            resultDate: '',
        };
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
            const resultDate = getDateForAccruedAges(expectedAge, ...participants.slice(0, participants.length - 1));
            this.setState({ resultDate });
        } catch (error) {
            this.setState({ error });
        }
    }

    clearAll = () => {
        this.setState({
            participants: [new Participant()],
            expectedAge: '',
            resultDate: '',
        })
    }

    render() {
        const { t } = this.props;
        const { participants, resultDate, expectedAge, error } = this.state;
        const processButtonDisabled = !expectedAge && true;

        const resultMessageKey = expectedAge >= 2 ? 'result_plural' : 'result_singular';
	const date_format = t('date_format');
	console.log(date_format);

        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <Input
                        type='number'
                        name='expectedAge'
                        placeholder={t('expected_age_label')}
                        onChange={this.setExpectedAge}
                        value={expectedAge}
                        className='col-4'
                    />
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
                    {resultDate && <h6>{expectedAge} {t(resultMessageKey)} {resultDate.format(date_format)}</h6>}
                    {error && <h6 className='error'>{error.message}</h6>}
                </div>
            </div>
        );
    }
}

export default translate()(Form);
