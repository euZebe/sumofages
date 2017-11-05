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
        this.expectedAge = field.target.value;
    }

    process = () => {
        const resultDate = getDateForAccruedAges(this.expectedAge, this.state.participants);
        this.setState({ resultDate });
    }

    render() {
        const { participants, resultDate } = this.state;
        return (
            <div>
                <h5>Participants</h5>
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
                />
                <Button color='primary' type='submit' onClick={this.process}>OK</Button>
                {resultDate && <h6>You will reach {this.expectedAge} years old the {resultDate}</h6>}
            </div>
        );
    }
}
