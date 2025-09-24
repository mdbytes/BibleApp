import { displayErrorMessage } from '../utils/index.js';

export const getBibleBooks = async (translation) => {
    try {
        const books = await fetch(
            `https://bible.helloao.org/api/${translation}/books.json`
        ).then((request) => request.json());

        return books['books'];
    } catch (error) {
        console.log(error);
        displayErrorMessage();
    }
};
