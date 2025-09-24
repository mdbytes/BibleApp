import { displayErrorMessage } from '../utils/index.js';
import { getChapterVerses } from './getChapterVerses.js';

export const getBibleVerseRange = async (
    translation,
    bookId,
    chapterNumber,
    startingVerse,
    endingVerse
) => {
    try {
        const verses = await getChapterVerses(
            translation,
            bookId,
            chapterNumber
        );

        let range = [];

        for (let i = startingVerse - 1; i < endingVerse; i++) {
            range.push(verses[i]);
        }

        if (!range) {
            throw new Error('passage cannot be found');
        }
        return range;
    } catch (error) {
        console.log(error);
        displayErrorMessage();
    }
};
