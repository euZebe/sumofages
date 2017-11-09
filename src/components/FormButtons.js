import React from 'react'
import { Button } from 'reactstrap'
import { translate } from 'react-i18next'
import 'font-awesome/css/font-awesome.min.css'

class FormButtons extends React.Component {
    render() {
        const { process, processButtonDisabled, clearAll, t } = this.props;
        return (
            <div className='row justify-content-center'>
                <Button
                    color='primary'
                    type='submit'
                    onClick={process}
                    disabled={processButtonDisabled}
                ><span className="fa fa-play" /> {t('process_button')}</Button>
                <Button
                    color='outline-secondary'
                    aria-pressed='false'
                    onClick={clearAll}
                ><span className="fa fa-eraser" /> {t('clear_button')}</Button>

            </div>
        );

    }
}

export default translate()(FormButtons);
