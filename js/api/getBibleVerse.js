import { getChapterVerses } from './getChapterVerses.js';

export const getBibleVerse = async (
    translation,
    bookId,
    chapterNumber,
    verseNumber
) => {
    const verses = await getChapterVerses(translation, bookId, chapterNumber);

    console.log(verses);
    return verses[verseNumber - 1];
};
