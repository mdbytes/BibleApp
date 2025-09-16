import {
    getBibleBooks,
    getBibleVerse,
    getChapterVerses,
    getBibleVerseRange,
    getEnglishTranslations,
} from '../api/index.js';

import {
    displaySingleVerse,
    displayChapterVerses,
    setUpBookSelect,
    setUpBookSelectChangeHandler,
    setUpChapterSelectorChange,
    setUpTranslationsSelect,
    displayManyVerses,
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

export const onTextSearchSubmit = async (evt) => {
    evt.preventDefault();

    document.getElementById('search-results').innerHTML = '';

    const search = evt.target[1].value;
    const translation = evt.target[0].value;
    const book = search.split(' ')[0];
    const chapterVerse = search.split(' ')[1];
    if (!search.includes('-')) {
        const chapterNumber = chapterVerse.split(':')[0];
        const verseNumber = chapterVerse.split(':')[1];
        const bibleVerse = await getBibleVerse(
            translation,
            book,
            chapterNumber,
            verseNumber
        );

        displaySingleVerse(book, chapterNumber, verseNumber, bibleVerse);
    } else {
        const chapterNumber = chapterVerse.split(':')[0];
        const verseRange = chapterVerse.split(':')[1];
        const beginningVerse = verseRange.split('-')[0];
        const endingVerse = verseRange.split('-')[1];

        const books = await getBibleBooks(translation);

        const bookId = books.filter(
            (b) => b['name'].toLowerCase() === book.toLowerCase()
        )[0]['id'];

        const bookName = books.filter(
            (b) => b['name'].toLowerCase() === book.toLowerCase()
        )[0]['name'];

        const verses = await getBibleVerseRange(
            translation,
            bookId,
            chapterNumber,
            beginningVerse,
            endingVerse
        );

        displayManyVerses(bookName, chapterNumber, beginningVerse, verses);
    }
};
