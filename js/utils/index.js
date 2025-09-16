import {
    getEnglishTranslations,
    getBibleBooks,
    getChapterVerses,
} from '../api/index.js';

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

export const setUpBookSelect = async (translation) => {
    let books = await getBibleBooks(translation);

    const bookSelect = document.getElementById('book-select');
    const bookHeaderOption = document.createElement('option');
    bookHeaderOption.selected = true;
    bookHeaderOption.disabled = true;
    bookHeaderOption.text = 'Select Book of the Bible';
    bookSelect.append(bookHeaderOption);

    for (let book of books) {
        let newOption = document.createElement('option');
        newOption.value = book['id'];
        newOption.text = book['name'];
        bookSelect.append(newOption);
    }
};

export const setUpBookSelectChangeHandler = async () => {
    document
        .getElementById('book-select')
        .addEventListener('change', async (evt) => {
            const selectedBook = evt.target.value;
            const translation =
                document.getElementById('translation-select').value;
            const books = await getBibleBooks(translation);

            const bookDetails = books.filter(
                (b) => b['id'] === selectedBook
            )[0];

            const chapterSelect = document.getElementById('chapter-select');
            chapterSelect.innerHTML = '';
            const chapterHeaderOption = document.createElement('option');
            chapterHeaderOption.selected = true;
            chapterHeaderOption.disabled = true;
            chapterHeaderOption.text = 'Select Chapter';
            chapterSelect.append(chapterHeaderOption);

            for (let i = 1; i <= bookDetails['numberOfChapters']; i++) {
                let newOption = document.createElement('option');
                newOption.value = i;
                newOption.text = i;
                chapterSelect.append(newOption);
            }
        });
};

export const setUpChapterSelectorChange = async () => {
    document
        .getElementById('chapter-select')
        .addEventListener('change', async (evt) => {
            const selectedChapter = evt.target.value;
            const translation =
                document.getElementById('translation-select').value;
            const selectedBook = document.getElementById('book-select').value;
            const chapterVerses = await getChapterVerses(
                translation,
                selectedBook,
                selectedChapter
            );

            const numberOfVerses = chapterVerses.length;
            const verseSelect = document.getElementById('verse-select');
            verseSelect.innerHTML = '';
            const verseHeaderOption = document.createElement('option');
            verseHeaderOption.selected = true;
            verseHeaderOption.disabled = true;
            verseHeaderOption.text = 'Select Verse';
            verseSelect.append(verseHeaderOption);

            for (let i = 1; i <= numberOfVerses; i++) {
                let newOption = document.createElement('option');
                newOption.value = i;
                newOption.text = i;
                verseSelect.append(newOption);
            }
        });
};

export const displayChapterVerses = (verses) => {
    let resultString = document.createElement('div');
    let i = 1;
    for (let verse of verses) {
        let newParagraph = document.createElement('p');
        let textSpan = document.createElement('span');
        newParagraph.innerHTML += `<sup>${i}</sup>`;
        textSpan.textContent = '  ' + verse;
        newParagraph.append(textSpan);
        resultString.append(newParagraph);
        i++;
    }

    document.getElementById('search-results').append(resultString);
};

export const displayManyVerses = (
    bookName,
    chapterNumber,
    startingVerseNumber,
    verses
) => {
    let resultString = document.createElement('div');
    let i = startingVerseNumber;
    let heading = document.createElement('h3');
    heading.textContent = bookName + ' Chapter ' + chapterNumber;
    resultString.append(heading);

    for (let verse of verses) {
        let newParagraph = document.createElement('p');
        let textSpan = document.createElement('span');
        newParagraph.innerHTML += `<sup>${i}</sup>`;
        textSpan.textContent = '  ' + verse;
        newParagraph.append(textSpan);
        resultString.append(newParagraph);
        i++;
    }

    document.getElementById('search-results').append(resultString);
};

export const displaySingleVerse = (
    bookName,
    chapter,
    verseNumber,
    verseQuote
) => {
    let resultString = document.createElement('div');
    resultString.classList.add('row');

    let reference = document.createElement('span');
    reference.classList.add('col-3');
    reference.classList.add('fw-bold');
    reference.textContent = bookName + ' ' + chapter + ':' + verseNumber;

    let quotation = document.createElement('span');
    quotation.classList.add('col-9');
    quotation.textContent = '"' + verseQuote + '"';

    resultString.append(reference);
    resultString.append(quotation);

    document.getElementById('search-results').append(resultString);
};
