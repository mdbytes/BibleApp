import { displayErrorMessage } from '../utils/index.js';

export const getChapterVerseRange = async (
    translation,
    book,
    chapter,
    beginningIndex,
    endingIndex
) => {
    try {
        const results = await fetch(
            `https://bible.helloao.org/api/${translation}/${book}/${chapter}.json`
        ).then((request) => request.json());
        let content = results.chapter.content;

        let verses = document.createElement('div');

        for (i = beginningIndex - 1; i < endingIndex; i++) {
            let str = document.createElement('p');
            for (let line of verse.content) {
                if (line.text) {
                    str.textContent = line.text;
                }
            }
            verses.append(str);
        }

        if (!verses) {
            throw new Error('verse cannot be found');
        }

        return verses;
    } catch (error) {
        console.log(error);
        displayErrorMessage();
    }
};
