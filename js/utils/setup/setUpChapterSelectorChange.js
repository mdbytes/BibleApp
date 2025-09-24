import { getChapterVerses } from '../../api/index.js';

export const setUpChapterSelectorChange = async () => {
    document
        .getElementById('chapter-select')
        .addEventListener('change', async (evt) => {
            const selectedChapter = evt.target.value;
            const translation =
                document.getElementById('translation-select').value;
            const selectedBook = document.getElementById('book-select').value;
            const chapterVerses = await getChapterVerses(
                translation,
                selectedBook,
                selectedChapter
            );

            const numberOfVerses = chapterVerses.length;
            const verseSelect = document.getElementById('verse-select');
            verseSelect.innerHTML = '';
            const verseHeaderOption = document.createElement('option');
            verseHeaderOption.selected = true;
            verseHeaderOption.disabled = true;
            verseHeaderOption.text = 'Select Verse';
            verseSelect.append(verseHeaderOption);

            for (let i = 1; i <= numberOfVerses; i++) {
                let newOption = document.createElement('option');
                newOption.value = i;
                newOption.text = i;
                verseSelect.append(newOption);
            }
        });
};
