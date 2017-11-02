// @flow

import moment from 'moment'

class Participant {

    name: string;
    dateOfBirth: moment;

    constructor(dateOfBirth: moment = moment(), name: string = '') {
        this.name = name;
        this.dateOfBirth = moment(dateOfBirth.startOf('day'));
    }

    get age() {
        return moment().diff(this.dateOfBirth, 'years');
    }


}

const NoParticipantError = new Error('No participant');
const NoExpectationError = new Error('No expected age');

function getDateForAccruedAges(expectedAge: number, ...participants: Participant[]) {
    if (!expectedAge) {
        throw NoExpectationError;
    }
    if (!participants.length) {
        throw NoParticipantError;
    }

    const sumOfAges = participants.reduce((sum, p) => sum + p.age, 0);

    const quotient = Math.floor((expectedAge - sumOfAges)) / participants.length;
    const rest = (expectedAge - sumOfAges) % participants.length;
    return moment().add(quotient, 'years').dayOfYear(participants[rest].dateOfBirth.dayOfYear());

}

export { Participant, getDateForAccruedAges, NoParticipantError, NoExpectationError };