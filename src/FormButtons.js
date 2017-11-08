import React from 'react'
import { Button } from 'reactstrap'
import 'font-awesome/css/font-awesome.min.css'

export class FormButtons extends React.Component {
    render() {
        const { process, processButtonDisabled, clearAll } = this.props;
        return (
            <div className='row justify-content-center'>
                <Button
                    color='primary'
                    type='submit'
                    onClick={process}
                    disabled={processButtonDisabled}
                ><span className="fa fa-play" /> Go</Button>
                <Button
                    color='outline-secondary'
                    aria-pressed='false'
                    onClick={clearAll}
                ><span className="fa fa-eraser" /> clear all</Button>

            </div>
        );

    }
}