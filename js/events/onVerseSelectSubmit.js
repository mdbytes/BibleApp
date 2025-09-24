import { getChapterVerses, getBibleVerse } from '../api/index.js';
import {
    displayChapterVerses,
    displayErrorMessage,
    displaySingleVerse,
} from '../utils/index.js';

export const onVerseSelectSubmit = async (evt) => {
    evt.preventDefault();
    try {
        document.getElementById('search-results').innerHTML = '';

        const translation = evt.target[0].value;
        const book = evt.target[1].value;
        const chapter = evt.target[2].value;
        const verse = evt.target[3].value;

        if (!translation || !book || !chapter) {
            throw new Error('missing translation, book or chapter');
        }

        if (verse === 'Select Verse') {
            const verses = await getChapterVerses(translation, book, chapter);
            displayChapterVerses(verses);
        } else {
            const quotation = await getBibleVerse(
                translation,
                book,
                chapter,
                verse
            );
            displaySingleVerse(book, chapter, verse, quotation);
        }
    } catch (error) {
        console.log(error);
        displayErrorMessage();
    }
};
