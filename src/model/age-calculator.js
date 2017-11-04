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

    const sortedByNextBirthday = sortByNextBirthday(participants);
    const sortedByAge = sortByAge(participants);

    const birthdays = [];
    let year = sortedByAge[0].dateOfBirth.year() + 1;
    while (birthdays.length < expectedAge) {
        for (let p of sortedByNextBirthday) {
            const newBirthday = moment(p.dateOfBirth).year(year);
            if (newBirthday.diff(p.dateOfBirth) >= 1) {
                birthdays.push(newBirthday);
            }
        }
        year++;
    }
    return birthdays[expectedAge - 1];
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

function sortByAge(participants: Participant[]): Participant[] {
    return participants
        .slice(0) // shallow copy
        .sort((p1, p2) => p1.dateOfBirth.diff(p2.dateOfBirth));
}

export { Participant, getDateForAccruedAges, NoParticipantError, NoExpectationError };