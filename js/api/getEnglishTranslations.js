import { displayErrorMessage } from '../utils/index.js';

export const getEnglishTranslations = async () => {
    try {
        let response = [];

        response = await fetch(
            `https://bible.helloao.org/api/available_translations.json`
        ).then((request) => request.json());

        let translations = response['translations'];

        let englishTranslations = [];

        let numTranslations = translations.length;

        for (let i = 0; i < translations.length; i++) {
            if (
                translations[i]['id'].toLowerCase() === 'eng_net' ||
                translations[i]['id'].toLowerCase() === 'eng_kjv'
            ) {
                englishTranslations.push(translations[i]);
            }
        }
        return englishTranslations;
    } catch (error) {
        console.log(error);
        displayErrorMessage();
    }
};
