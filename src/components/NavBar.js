import React from 'react';
import i18next from 'i18next';
import FlagIcon from '../i18n/FlagIcon.js';

export default class NavBar extends React.Component {

    toEnglish = () => {
        i18next.changeLanguage('en');
    }

    toFrench = () => {
        i18next.changeLanguage('fr');
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <a className="navbar-brand">Sumofages</a>

                <div className="navbar-right">
                    <span id="lang_en" onClick={this.toEnglish}>
                        <FlagIcon code="gb" />
                    </span>
                    <span id="lang_fr" onClick={this.toFrench}>
                        <FlagIcon code="fr" />
                    </span>
                    <a href="http://github.com/euzebe/sumofages">
                        <span className="fa fa-github fa-2x text-secondary" />
                    </a>
                </div>

            </nav>
        );
    }
}