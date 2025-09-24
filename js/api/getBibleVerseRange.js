import { getChapterVerses } from './getChapterVerses.js';

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
