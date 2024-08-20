async function translateText() {
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;
    const text = document.getElementById('translateInput').value;

    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyBIJTYa8-pSRg1vDnl3v-WfOfhLYqL4JoU`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            source: sourceLang,
            target: targetLang,
            format: 'text'
        })
    });

    const data = await response.json();
    document.getElementById('translateResult').innerText = data.data.translations[0].translatedText;
}

async function searchWord() {
    const word = document.getElementById('searchInput').value;
    // Placeholder logic for search
    document.getElementById('searchResult').innerText = `Searching for: ${word}`;
}

async function updateWord() {
    const word = document.getElementById('updateWord').value;
    const translation = document.getElementById('updateTranslation').value;
    // Placeholder logic for update
    document.getElementById('updateResult').innerText = `Updated ${word} to ${translation}`;
}

