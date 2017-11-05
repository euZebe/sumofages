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
            <div className="App">
                <Jumbotron>
                    <h1>Sumofages</h1>
                    <p>
                        This is a simple tool to get the accrued age of several persons,
                        and to get the date when this sum will reach a certain age.
                    </p>
                    <hr className="my-2" />
                    <Form/>
                </Jumbotron>
            </div>
        );
    }
}

export default App;
