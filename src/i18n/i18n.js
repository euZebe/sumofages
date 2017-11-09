/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';
import messages_en from './en/common.json';
import messages_fr from './fr/common.json';


i18n.use(LanguageDetector).init({
    lng: 'fr',
    debug: true,
    resources: {
        en: { translation: messages_en },
        fr: { translation: messages_fr },
    }
});


// catch the event and make changes accordingly
i18n.on('languageChanged', (lng) => {
    moment.locale(lng);
});


export default i18n;
