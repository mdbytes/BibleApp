export const getEnglishTranslations = async () => {
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

export const getBibleBooks = async (translation) => {
    const books = await fetch(
        `https://bible.helloao.org/api/${translation}/books.json`
    ).then((request) => request.json());

    return books['books'];
};

export const getChapterVerses = async (translation, book, chapter) => {
    const results = await fetch(
        `https://bible.helloao.org/api/${translation}/${book}/${chapter}.json`
    ).then((request) => request.json());
    let content = results.chapter.content;
    return content.map((b) => b['content'][0]);
};

export const getBibleVerse = async (
    translation,
    bookId,
    chapterNumber,
    verseNumber
) => {
    const verses = await getChapterVerses(translation, bookId, chapterNumber);

    return verses[verseNumber - 1];
};

export const getBibleVerseRange = async (
    translation,
    bookId,
    chapterNumber,
    startingVerse,
    endingVerse
) => {
    const verses = await getChapterVerses(translation, bookId, chapterNumber);

    let range = [];

    for (let i = startingVerse - 1; i < endingVerse; i++) {
        range.push(verses[i]);
    }

    return range;
};
