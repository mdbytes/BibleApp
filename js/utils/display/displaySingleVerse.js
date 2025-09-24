export const displaySingleVerse = (
    bookName,
    chapter,
    verseNumber,
    verseQuote
) => {
    let resultString = document.createElement('div');
    resultString.classList.add('row');

    let reference = document.createElement('span');
    reference.classList.add('col-3');
    reference.classList.add('fw-bold');
    reference.textContent = bookName + ' ' + chapter + ':' + verseNumber;

    let quotation = document.createElement('span');
    quotation.classList.add('col-9');

    let verseQuoteLines = verseQuote.split('<br>');
    for (let line of verseQuoteLines) {
        let lineElement = document.createElement('p');
        lineElement.textContent = line.replaceAll('<br>', ' ');
        quotation.append(lineElement);
    }

    resultString.append(reference);
    resultString.append(quotation);

    document.getElementById('search-results').append(resultString);
};
