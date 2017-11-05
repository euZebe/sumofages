// @flow

import moment from 'moment'
import shortid from 'shortid'

export default class Participant {

    id: string;
    name: string;
    dateOfBirth: moment;

    constructor(dateOfBirth: moment = moment(), name: string = '') {
        this.id = shortid.generate();
        this.name = name;
        this.dateOfBirth = moment(dateOfBirth.startOf('day'));
    }

    get age(): number {
        return moment().diff(this.dateOfBirth, 'years');
    }

    toString(): string {
        return JSON.stringify({id: this.id, name: this.name, dateOfBirth: this.dateOfBirth.toString()})
    }
}
