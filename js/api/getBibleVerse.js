import { displayErrorMessage } from '../utils/index.js';
import { getChapterVerses } from './getChapterVerses.js';

export const getBibleVerse = async (
    translation,
    bookId,
    chapterNumber,
    verseNumber
) => {
    try {
        const verses = await getChapterVerses(
            translation,
            bookId,
            chapterNumber
        );

        if (!verses[verseNumber - 1]) {
            throw new Error('verse cannot be found');
        }
        return verses[verseNumber - 1];
    } catch (error) {
        console.log(error);
        displayErrorMessage();
    }
};
