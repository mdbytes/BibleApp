import { displayErrorMessage } from '../utils/index.js';

export const getChapterVerses = async (translation, book, chapter) => {
    try {
        const results = await fetch(
            `https://bible.helloao.org/api/${translation}/${book}/${chapter}.json`
        ).then((request) => request.json());
        let verses = results.chapter.content;
        console.log(verses);
        let verseArray = [];

        for (let verse of verses) {
            let lineText = '';
            for (let line of verse.content) {
                if (typeof line === 'object' && line.text) {
                    lineText += line.text;
                }
                if (typeof line === 'string') {
                    lineText += line;
                }
                if (line.lineBreak) {
                    lineText += '<br>';
                }
            }
            verseArray.push(lineText);
        }

        if (!verseArray) {
            throw new Error('passage cannot be found');
        }

        return verseArray;
    } catch (error) {
        console.log(error);
        displayErrorMessage();
    }
};
