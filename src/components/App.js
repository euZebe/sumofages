import React from 'react';
import { Jumbotron } from 'reactstrap';
import { translate } from 'react-i18next';
import Form from './Form';
import NavBar from './NavBar';
import Footer from './Footer'

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
                    <h6 id='howto_title'>{t('howto_title')}</h6>
                    <ul>
                        <li>{t('howto_step1')}</li>
                        <li>{t('howto_step2')}</li>
                        <li>{t('howto_step3')}</li>
                    </ul>
                    <div>{t('howto_by_age')}</div>
                    <div>{t('howto_by_day')}</div>
                    <hr className="my-2" />
                    <Form/>
                </Jumbotron>

                <Footer />
            </div>
        );
    }
}

export default translate()(App);
