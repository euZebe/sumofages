import React from 'react';
import { Jumbotron } from 'reactstrap';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import './App.css';
import Form from './Form';
import FlagIcon from '../i18n/FlagIcon.js';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            sum: 14
        };
    }

    toEnglish = () => {
        i18next.changeLanguage('en');
    }

    toFrench = () => {
        i18next.changeLanguage('fr');
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Sumofages</a>
                    <div className="navbar-right">
                        <span onClick={this.toEnglish}><FlagIcon code="gb" /></span>
                        <span onClick={this.toFrench}><FlagIcon code="fr" /></span>
                        <a href="http://github.com/euzebe/sumofages">
                            <span className="fa fa-github fa-2x text-secondary" />
                        </a>
                    </div>
                </nav>

                <Jumbotron>
                    <h6>{t('howto_title')}</h6>
                    <ul>
                        <li>{t('howto_step1')}</li>
                        <li>{t('howto_step2')}</li>
                        <li>{t('howto_step3')}</li>
                    </ul>
                    <hr className="my-2" />
                    <Form/>
                </Jumbotron>
            </div>
        );
    }
}

export default translate()(App);
