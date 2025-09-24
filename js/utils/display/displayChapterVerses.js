export const displayChapterVerses = (verses) => {
    let resultString = document.createElement('div');
    let i = 1;
    for (let verse of verses) {
        let newParagraph = document.createElement('p');
        let textSpan = document.createElement('span');
        newParagraph.innerHTML += `<sup>${i}</sup>`;
        textSpan.textContent = '  ' + verse.replaceAll('<br', ' ');
        newParagraph.append(textSpan);
        resultString.append(newParagraph);
        i++;
    }

    document.getElementById('search-results').append(resultString);
};
