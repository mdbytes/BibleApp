export const getChapterVerseRange = async (
    translation,
    book,
    chapter,
    beginningIndex,
    endingIndex
) => {
    const results = await fetch(
        `https://bible.helloao.org/api/${translation}/${book}/${chapter}.json`
    ).then((request) => request.json());
    let content = results.chapter.content;
    console.log(content);
    console.log(content.length);
    let verses = document.createElement('div');

    for (i = beginningIndex - 1; i < endingIndex; i++) {
        let str = document.createElement('p');
        console.log(verse);
        for (let line of verse.content) {
            if (line.text) {
                str.textContent = line.text;
            }
        }
        verses.append(str);
    }

    return verses;
};
