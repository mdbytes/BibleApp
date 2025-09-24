import {
    getBibleBooks,
    getBibleVerse,
    getBibleVerseRange,
} from '../api/index.js';

import { displaySingleVerse, displayManyVerses } from '../utils/index.js';

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
        const books = await getBibleBooks(translation);
        const bookObject = books.filter(
            (b) => b['name'].toLowerCase() === book.toLowerCase()
        )[0];

        console.dir(bookObject);

        const bibleVerse = await getBibleVerse(
            translation,
            bookObject['id'],
            chapterNumber,
            verseNumber
        );

        console.log('verse', bibleVerse);

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

        console.log(verses);

        displayManyVerses(bookName, chapterNumber, beginningVerse, verses);
    }
};
