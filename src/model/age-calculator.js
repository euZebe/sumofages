// @flow

import moment from 'moment'

import Participant from './Participant'

const NoParticipantError = new Error('No participant');
const NoExpectationError = new Error('No expected age');

/**
 * get the date when participants summed ages will be the expected age
 * @param expectedAge - number
 * @param participants - array of Participant
 * @returns the birthday matching expectedAge
 */
function getDateForAccruedAges(expectedAge: number, ...participants: Participant[]): moment {
    if (!expectedAge) {
        throw NoExpectationError;
    }
    if (!participants.length) {
        throw NoParticipantError;
    }

    const sortedByNextBirthday = sortByNextBirthday(participants);
    const olderPerson = sortByAge(participants)[0];

    const birthdays = [];
    let year = olderPerson.dateOfBirth.year() + 1;
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

/**
 * sort participants by their next birthday, starting from today
 * @param participants
 * @returns {Array.<Participant>}
 */
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
    return participants.sort((p1, p2) => p1.dateOfBirth.diff(p2.dateOfBirth));
}

export { Participant, getDateForAccruedAges, NoParticipantError, NoExpectationError };
