export const displayErrorMessage = () => {
    let resultString = document.createElement('div');
    resultString.classList.add('row');

    let reference = document.createElement('span');
    reference.classList.add('col');
    reference.classList.add('fw-bold');
    reference.classList.add('text-danger');
    reference.textContent =
        'There was a problem retrieving that passage.  Recheck your input or try again later.';

    resultString.append(reference);

    document.getElementById('search-results').append(resultString);
};
