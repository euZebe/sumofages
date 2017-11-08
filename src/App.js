import React from 'react';
import { Jumbotron } from 'reactstrap';
import './App.css';
import Form from './Form'

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            sum: 14
        };
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Sumofages</a>
                    <a className="navbar-right" href="http://github.com/euzebe/sumofages">
                        <span className="fa fa-github fa-2x text-secondary" />
                    </a>
                </nav>

                <Jumbotron>
                    <p>
                        This is a simple tool to get the accrued age of several persons,
                        and to get the date when this sum reaches a certain age.
                    </p>
                    <hr className="my-2" />
                    <Form/>
                </Jumbotron>

                <div id="footer">
                    crafted by euZebe, Toulouse 2017
                </div>
            </div>
        );
    }
}

export default App;
