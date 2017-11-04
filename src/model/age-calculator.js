// @flow

import moment from 'moment'

class Participant {

    name: string;
    dateOfBirth: moment;

    constructor(dateOfBirth: moment = moment(), name: string = '') {
        this.name = name;
        this.dateOfBirth = moment(dateOfBirth.startOf('day'));
    }

    get age(): number {
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

    const quotient = Math.floor((expectedAge - sumOfAges) / participants.length);
    const rest = (expectedAge - sumOfAges) % participants.length;
    const participantsByNextBirthday = sortByNextBirthday(participants);
    if (rest === 0) {
        const index = participantsByNextBirthday.length - 1;
        return moment().add(quotient, 'years').dayOfYear(participantsByNextBirthday[index].dateOfBirth.dayOfYear());
    }
    return moment().add(quotient, 'years').dayOfYear(participantsByNextBirthday[rest - 1].dateOfBirth.dayOfYear());
}

function sortByNextBirthday(participants: Participant[]): Participant[] {
    const currentDayOfYear = moment().dayOfYear();
    const sortedByDayOfYear = participants.slice(0)
        .sort((p1, p2) => p1.dateOfBirth.dayOfYear() - p2.dateOfBirth.dayOfYear());

    const nbElementsToShift = participants.filter(p => p.dateOfBirth.dayOfYear() > currentDayOfYear).length
    const first = sortedByDayOfYear.slice(sortedByDayOfYear.length - nbElementsToShift);
    const second = sortedByDayOfYear.slice(0, sortedByDayOfYear.length - nbElementsToShift);
    return first.concat(second);
}

export { Participant, getDateForAccruedAges, NoParticipantError, NoExpectationError };