// @flow

import moment from 'moment'

export default class Participant {

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
