'use strict'
import moment from 'moment'
import { getDateForAccruedAges, NoExpectationError, NoParticipantError, Participant } from './age-calculator'

const now = moment();

test('calculator should throw an error if no expectation', () => {
    expect(() => getDateForAccruedAges(null)).toThrow(NoExpectationError);
})

test('calculator should throw an error if no participant', () => {
    expect(() => getDateForAccruedAges(25)).toThrow(NoParticipantError);
})

test('calculator should return X years later when today is the only participant\'s birthday and expected is +X', () => {
    const _36YearsAgo = moment().add(-36, 'years').startOf('day');
    const _36YearOldParticipant = new Participant(_36YearsAgo);
    const EXPECTED_AGE = 40;
    const nextBirthday = moment(_36YearOldParticipant.dateOfBirth).add(EXPECTED_AGE, 'years');
    expect(getDateForAccruedAges(EXPECTED_AGE, _36YearOldParticipant).startOf('day')).toEqual(nextBirthday);
})

test('calculator should return the date of the next birthday when expecting the age after', () => {
    const _3YearsAnd8MonthsAgo = moment().year(now.year() - 3).month(now.month() - 8);
    const _3YearOldParticipant = new Participant(_3YearsAnd8MonthsAgo);
    const twoBirthdaysLater = moment(_3YearOldParticipant.dateOfBirth).add(5, 'years');
    expect(getDateForAccruedAges(5, _3YearOldParticipant).startOf('day')).toEqual(twoBirthdaysLater);
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

    expect(getDateForAccruedAges(
        40,
        _36YearOldParticipant,
        _3YearOldParticipant,
        ).startOf('day')).toEqual(nextBirthdayOf3YearOldParticipant);
})

test('calculator should return dorothee\'s birthay', () => {
    const dorothee = new Participant(moment([1981, 4, 18]), 'Dorothée');
    const jean = new Participant(moment([1981, 9, 26]), 'Jean');
    const alienor = new Participant(moment([2014, 2, 15]), 'Aliénor');
    const samuel = new Participant(moment([2015, 6, 17]), 'Samuel');
    const quentin = new Participant(moment([2017, 0, 3]), 'Quentin');

    const result = getDateForAccruedAges(
        80,
        dorothee, jean, alienor, samuel, quentin,
    ).startOf('day');
    expect(result).toEqual(moment(dorothee.dateOfBirth).year(2018));
})

test('quand on aura 20 ans en l\'an 2001', () => {
    const dorothee = new Participant(moment([1981, 4, 18]), 'Dorothée');
    const jean = new Participant(moment([1981, 9, 26]), 'Jean');

    expect(getDateForAccruedAges(40, dorothee, jean).startOf('day')).toEqual(moment(jean.dateOfBirth).year(2001));
})
