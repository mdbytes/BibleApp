import { getEnglishTranslations } from '../../api/index.js';

export const setUpTranslationsSelect = async (id) => {
    const translations = await getEnglishTranslations();
    const translationSelect = document.getElementById(id);
    const headerOption = document.createElement('option');
    headerOption.selected = true;
    headerOption.disabled = true;
    headerOption.text = 'Select Bible Translation';
    translationSelect.append(headerOption);

    for (let translation of translations) {
        let newOption = document.createElement('option');
        newOption.value = translation['id'];
        newOption.text = translation['name'];
        translationSelect.append(newOption);
    }
};
