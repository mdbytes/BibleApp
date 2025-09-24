import {
    setUpTranslationsSelect,
    setUpBookSelect,
    setUpBookSelectChangeHandler,
    setUpChapterSelectorChange,
} from '../utils/index.js';

export const onWindowLoad = async () => {
    // Set up translation select
    setUpTranslationsSelect('translation-select');
    setUpTranslationsSelect('key-word-select');

    // Set up book select
    setUpBookSelect('eng_net');

    // Add event handler for book select change
    setUpBookSelectChangeHandler();

    setUpChapterSelectorChange();
};
