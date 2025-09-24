import { getBibleBooks } from '../../api/index.js';

export const setUpBookSelect = async (translation) => {
    let books = await getBibleBooks(translation);

    const bookSelect = document.getElementById('book-select');
    const bookHeaderOption = document.createElement('option');
    bookHeaderOption.selected = true;
    bookHeaderOption.disabled = true;
    bookHeaderOption.text = 'Select Book of the Bible';
    bookSelect.append(bookHeaderOption);

    for (let book of books) {
        let newOption = document.createElement('option');
        newOption.value = book['id'];
        newOption.text = book['name'];
        bookSelect.append(newOption);
    }
};
