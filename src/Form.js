import React from 'react';
import { Button, Input } from 'reactstrap';
import Participant from './model/Participant'
import ParticipantInput from './ParticipantInput'
import { getDateForAccruedAges } from './model/age-calculator'

export default class Form extends React.Component {

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
        // TODO update the Participant according to its ID ; parse its dateOfBirth
        participants.splice(
            participants.indexOf(participants.filter(p => p.id === updated.id)),
            1,
            updated
        );
        const allDatesFilled = this.state.participants.reduce(
            (allFilled, p) => allFilled && p.dateOfBirth && p.dateOfBirth.isValid()
            , true);
        if (allDatesFilled) {
            this.addParticipant();
        }
    }

    setExpectedAge = (field) => {
        this.setState({
            expectedAge: Number.parseInt(field.target.value, 10) || undefined,
            resultDate: ''
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

    render() {
        const { participants, resultDate, expectedAge, error } = this.state;
        const disableProcess = !expectedAge && true;
        return (
            <div>
                <h5>Participants</h5>
                {error && <h6 className='error'>{error.message}</h6>}
                {participants.map((p, index) =>
                    <ParticipantInput
                        key={p.id}
                        index={index}
                        participant={p}
                        onDateOfBirthChange={this.handleDateOfBirthChange}
                    />)
                }
                <Input
                    type='number'
                    name='expectedAge'
                    placeholder='expected age'
                    onChange={this.setExpectedAge}
                    value={expectedAge}
                />
                <Button color='primary' type='submit' onClick={this.process} disabled={disableProcess}>OK</Button>
                {resultDate && <h6>You will reach {expectedAge} years old the {resultDate.format('DD/MM/YYYY')}</h6>}
            </div>
        );
    }
}
