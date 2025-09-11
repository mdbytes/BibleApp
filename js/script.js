const getEnglishTranslations = async () => {
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
            translations[i]['id'].toLowerCase() === 'eng_kjv' ||
            translations[i]['id'].toLowerCase() === 'eng_asv'
        ) {
            englishTranslations.push(translations[i]);
        }
    }

    return englishTranslations;
};

const getBibleBooks = async (translation) => {
    const books = await fetch(
        `https://bible.helloao.org/api/${translation}/books.json`
    ).then((request) => request.json());

    return books['books'];
};

window.addEventListener('load', async () => {
    // Set up translation select
    const translations = await getEnglishTranslations();
    const translationSelect = document.getElementById('translation-select');
    const headerOption = document.createElement('option');
    headerOption.selected = true;
    headerOption.disabled = true;
    headerOption.text = 'Select Bible Translation';
    translationSelect.append(headerOption);

    for (let translation of translations) {
        console.log(translation);
        let newOption = document.createElement('option');
        newOption.value = translation['id'];
        newOption.text = translation['name'];
        translationSelect.append(newOption);
    }

    // Set up book select
    let books = await getBibleBooks('eng_net');

    const bookSelect = document.getElementById('book-select');
    const bookHeaderOption = document.createElement('option');
    bookHeaderOption.selected = true;
    bookHeaderOption.disabled = true;
    bookHeaderOption.text = 'Select Book of the Bible';
    bookSelect.append(bookHeaderOption);

    console.log(books);

    for (let book of books) {
        let newOption = document.createElement('option');
        newOption.value = book['id'];
        newOption.text = book['name'];
        bookSelect.append(newOption);
    }
});

document
    .getElementById('book-select')
    .addEventListener('change', async (evt) => {
        const selectedBook = evt.target.value;
        const translation = document.getElementById('translation-select').value;
        const books = await getBibleBooks(translation);
        const bookDetails = books.filter((b) => b['id'] === selectedBook)[0];
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

document
    .getElementById('search-form')
    .addEventListener('submit', async (evt) => {
        evt.preventDefault();

        document.getElementById('search-results').innerHTML = '';

        const translation = evt.target[0].value;
        const book = evt.target[1].value;
        const chapter = evt.target[2].value;
        console.log(translation, book);

        const results = await fetch(
            `https://bible.helloao.org/api/${translation}/${book}/${chapter}.json`
        ).then((request) => request.json());

        let content = results.chapter.content;

        console.log(content);

        let resultString = document.createElement('div');
        let i = 1;
        for (let verse of content) {
            let newParagraph = document.createElement('p');
            let textSpan = document.createElement('span');
            newParagraph.innerHTML += `<sup>${i}</sup>`;
            textSpan.textContent = '  ' + verse.content[0];
            newParagraph.append(textSpan);
            resultString.append(newParagraph);
            i++;
        }

        document.getElementById('search-results').append(resultString);

        console.log(resultString);
    });
