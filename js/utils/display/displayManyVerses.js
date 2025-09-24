export const displayManyVerses = (
    bookName,
    chapterNumber,
    startingVerseNumber,
    verses
) => {
    let resultString = document.createElement('div');
    let i = startingVerseNumber;
    let heading = document.createElement('h3');
    heading.textContent = bookName + ' Chapter ' + chapterNumber;
    resultString.append(heading);

    console.log('verses**', verses);
    for (let verse of verses) {
        let newParagraph = document.createElement('p');
        let textSpan = document.createElement('span');
        newParagraph.innerHTML += `<sup>${i}</sup>`;
        textSpan.textContent = '  ' + verse.replaceAll('<br>', ' ');
        newParagraph.append(textSpan);
        resultString.append(newParagraph);
        i++;
    }

    document.getElementById('search-results').append(resultString);
};
