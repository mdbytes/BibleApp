import { getChapterVerses, getBibleVerse } from '../api/index.js';
import { displayChapterVerses, displaySingleVerse } from '../utils/index.js';

export const onVerseSelectSubmit = async (evt) => {
    evt.preventDefault();

    document.getElementById('search-results').innerHTML = '';

    const translation = evt.target[0].value;
    const book = evt.target[1].value;
    const chapter = evt.target[2].value;
    const verse = evt.target[3].value;

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
};
