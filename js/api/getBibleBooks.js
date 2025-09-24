export const getBibleBooks = async (translation) => {
    const books = await fetch(
        `https://bible.helloao.org/api/${translation}/books.json`
    ).then((request) => request.json());

    return books['books'];
};
