'use strict'
import moment from 'moment'
import {
    getDateForAccruedAges, InvalidParticipantDateOfBirth, NoExpectationError, NoParticipantError,
    Participant
} from './age-calculator'

const now = moment();

test('calculator should throw an error if no expectation', () => {
    expect(() => getDateForAccruedAges(null)).toThrow(NoExpectationError);
})

test('calculator should throw an error if no participant', () => {
    expect(() => getDateForAccruedAges(25)).toThrow(NoParticipantError);
})

test('calculator should throw an error if a participant has no birth date', () => {
    const participant = new Participant();
    participant.dateOfBirth = '';
    expect(() => getDateForAccruedAges(20, participant)).toThrow(InvalidParticipantDateOfBirth);
})

test('calculator should return X years later when today is the only participant\'s birthday and expected is +X', () => {
    const _36YearsAgo = moment().add(-36, 'years').startOf('day');
    const _36YearOldParticipant = new Participant(_36YearsAgo);
    const EXPECTED_AGE = 40;
    const nextBirthday = moment(_36YearOldParticipant.dateOfBirth).add(EXPECTED_AGE, 'years');
    expect(getDateForAccruedAges(EXPECTED_AGE, _36YearOldParticipant)).toEqual(nextBirthday);
})

test('calculator should return the date of the next birthday when expecting the age after', () => {
    const _3YearsAnd8MonthsAgo = moment().year(now.year() - 3).month(now.month() - 8);
    const _3YearOldParticipant = new Participant(_3YearsAnd8MonthsAgo);
    const twoBirthdaysLater = moment(_3YearOldParticipant.dateOfBirth).add(5, 'years');
    expect(getDateForAccruedAges(5, _3YearOldParticipant)).toEqual(twoBirthdaysLater);
})

test('calculator should return the date of the previous birthday when expecting the current age', () => {
    const _3YearsAnd8MonthsAgo = moment().year(now.year() - 3).month(now.month() - 10);
    const _3YearOldParticipant = new Participant(_3YearsAnd8MonthsAgo);
    const previousBirthday = moment(_3YearOldParticipant.dateOfBirth).add(2, 'years');
    expect(getDateForAccruedAges(2, _3YearOldParticipant).startOf('day')).toEqual(previousBirthday);
})

test('calculator should return next birthday when two participants and expected is sum + 1', () => {
    const _36YearsAgo = moment().add(-36, 'years').startOf('day');
    const _36YearOldParticipant = new Participant(_36YearsAgo);
    const _3YearsAnd8MonthsAgo = moment().year(now.year() - 3).month(now.month() - 8);
    const _3YearOldParticipant = new Participant(_3YearsAnd8MonthsAgo);

    const nextBirthdayOf3YearOldParticipant = moment(_3YearOldParticipant.dateOfBirth).add(4, 'years');

    expect(getDateForAccruedAges(40, _36YearOldParticipant, _3YearOldParticipant))
        .toEqual(nextBirthdayOf3YearOldParticipant);
})

test('calculator should return julie\'s birthay', () => {
    const julie = new Participant(moment([1981, 4, 15]), 'Julie');
    const euZebe = new Participant(moment([1981, 9, 22]), 'euZèbe');
    const niobe = new Participant(moment([2014, 2, 12]), 'Niobé');
    const ernest = new Participant(moment([2015, 6, 12]), 'Ernest');
    const titouan = new Participant(moment([2017, 0, 1]), 'Titouan');

    const result = getDateForAccruedAges(80, julie, euZebe, niobe, ernest, titouan);
    expect(result).toEqual(moment(julie.dateOfBirth).year(2018));
})

test('quand on aura 20 ans en l\'an 2001', () => {
    const julie = new Participant(moment([1981, 4, 15]), 'Julie');
    const euZebe = new Participant(moment([1981, 9, 22]), 'euZèbe');

    expect(getDateForAccruedAges(40, julie, euZebe)).toEqual(moment(euZebe.dateOfBirth).year(2001));
})

test('allow also array of participants', () => {
    const julie = new Participant(moment([1981, 4, 15]), 'Julie');
    const euZebe = new Participant(moment([1981, 9, 22]), 'euZèbe');

    expect(getDateForAccruedAges(40, [julie, euZebe])).toEqual(moment(euZebe.dateOfBirth).year(2001));
})
