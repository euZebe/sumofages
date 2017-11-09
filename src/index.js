import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n'; // initialized i18next instance
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <App />
    </I18nextProvider>
    , document.getElementById('root'));
registerServiceWorker();
