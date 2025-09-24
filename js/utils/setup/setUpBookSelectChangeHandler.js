import { getBibleBooks } from '../../api/index.js';

export const setUpBookSelectChangeHandler = async () => {
    document
        .getElementById('book-select')
        .addEventListener('change', async (evt) => {
            const selectedBook = evt.target.value;
            const translation =
                document.getElementById('translation-select').value;
            const books = await getBibleBooks(translation);

            const bookDetails = books.filter(
                (b) => b['id'] === selectedBook
            )[0];

            const chapterSelect = document.getElementById('chapter-select');
            chapterSelect.innerHTML = '';
            const chapterHeaderOption = document.createElement('option');
            chapterHeaderOption.selected = true;
            chapterHeaderOption.disabled = true;
            chapterHeaderOption.text = 'Select Chapter';
            chapterSelect.append(chapterHeaderOption);

            for (let i = 1; i <= bookDetails['numberOfChapters']; i++) {
                let newOption = document.createElement('option');
                newOption.value = i;
                newOption.text = i;
                chapterSelect.append(newOption);
            }
        });
};
