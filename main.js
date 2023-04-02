const inputEl = document.getElementById('txt');
const txtEl = document.getElementById('info-txt');

const meaningContainerEl = document.getElementById('result-container');
const titleEl = document.getElementById('title');
const meaningEl = document.getElementById('meaning');
const audioEl = document.getElementById('audio');

async function fetchAPI(word) {
    try {
        txtEl.style.display = 'block';
        meaningContainerEl.style.display = 'none';
        txtEl.innerText = `Searching for the meaning of the word "${word}"...`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);

        // if (!response.ok) {
        //     throw new Error('Unable to fetch data from API.');
        // }

        const result = await response.json();

        if (!result[0]) {
            txtEl.style.display='none'
            meaningContainerEl.style.display = 'block';
            titleEl.innerText = word;
            meaningEl.innerText = 'No definition found.';
            audioEl.style.display = 'none';
        } else {
            txtEl.style.display = 'none';
            meaningContainerEl.style.display = 'block';
            titleEl.innerText = result[0].word;

            if (!result[0].meanings[0] || !result[0].meanings[0].definitions[0]) {
                meaningEl.innerText = 'Definition not available.';
            } else {
                meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            }

            if (!result[0].phonetics[0] || !result[0].phonetics[0].audio) {
                audioEl.style.display = 'none';
            } else {
                audioEl.src = result[0].phonetics[0].audio;
                audioEl.style.display = 'inline-flex';
            }
        }
        
    } catch(error) {
        // txtEl.innerText = `An error occurred while trying to fetch data. Please check your internet connection and try again later.`;
        console.log(error);
    }
}

inputEl.addEventListener('keyup', (event) => {
    if (event.target.value && event.key === 'Enter') {
        fetchAPI(event.target.value);
    }
});