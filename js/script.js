import {
    onWindowLoad,
    onVerseSelectSubmit,
    onTextSearchSubmit,
} from './events/index.js';
window.addEventListener('load', onWindowLoad);

document
    .getElementById('search-form')
    .addEventListener('submit', async (evt) => {
        await onVerseSelectSubmit(evt);
    });

document
    .getElementById('key-word-search')
    .addEventListener('submit', async (evt) => {
        onTextSearchSubmit(evt);
    });
