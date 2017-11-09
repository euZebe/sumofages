import React from 'react';
import { Jumbotron } from 'reactstrap';
import { translate } from 'react-i18next';
import './App.css';
import Form from './Form';
import NavBar from './NavBar';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            sum: 14
        };
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <NavBar />

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
