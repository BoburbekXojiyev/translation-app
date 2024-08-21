const apiKey = 'AIzaSyBIJTYa8-pSRg1vDnl3v-WfOfhLYqL4JoU';

// A simple in-memory dictionary for demonstration purposes
let dictionary = {};

// Helper function to update the dictionary in localStorage
function saveDictionary() {
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
}

// Helper function to load the dictionary from localStorage
function loadDictionary() {
    const storedDictionary = localStorage.getItem('dictionary');
    if (storedDictionary) {
        dictionary = JSON.parse(storedDictionary);
    }
}

// Initialize dictionary on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDictionary();

    // Translator functionality
    const translateButton = document.getElementById('translateButton');
    if (translateButton) {
        translateButton.addEventListener('click', function() {
            const text = document.getElementById('inputText').value;
            const langChoice = document.getElementById('languageSelect').value;

            let srcLang = 'en', destLang = 'uz';
            if (langChoice === 'uz-en') {
                srcLang = 'uz';
                destLang = 'en';
            }

            fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${encodeURIComponent(text)}&source=${srcLang}&target=${destLang}`)
                .then(response => response.json())
                .then(data => {
                    const translation = data.data.translations[0].translatedText;
                    document.getElementById('translationResult').textContent = `Tarjima: ${translation}`;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }

    // Search functionality
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const word = document.getElementById('searchInput').value.toLowerCase();
            const langChoice = document.getElementById('searchLanguageSelect').value;
            let translation;

            if (langChoice === 'en') {
                translation = dictionary[word];
            } else if (langChoice === 'uz') {
                translation = Object.keys(dictionary).find(key => dictionary[key] === word);
            }

            if (translation) {
                document.getElementById('searchResult').textContent = `Natija: ${translation}`;
            } else {
                if (confirm(`${word} lug'atda mavjud emas. Uni lug'atga qo'shasizmi?`)) {
                    const newTranslation = prompt(`Yangi tarjimani kiriting:`);
                    if (newTranslation) {
                        if (langChoice === 'en') {
                            dictionary[word] = newTranslation.toLowerCase();
                        } else if (langChoice === 'uz') {
                            dictionary[newTranslation.toLowerCase()] = word;
                        }
                        saveDictionary();
                        document.getElementById('searchResult').textContent = `${word} lug'atga qo'shildi.`;
                    }
                } else {
                    document.getElementById('searchResult').textContent = `${word} lug'atda mavjud emas.`;
                }
            }
        });
    }

    // Update functionality
    const updateButton = document.getElementById('updateButton');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            const word = document.getElementById('wordInput').value.toLowerCase();
            const newTranslation = document.getElementById('translationInput').value.toLowerCase();

            if (dictionary[word]) {
                dictionary[word] = newTranslation;
                saveDictionary();
                document.getElementById('updateResult').textContent = `${word} so'zi yangilandi.`;
            } else {
                document.getElementById('updateResult').textContent = `${word} lug'atda mavjud emas.`;
            }
        });
    }

    // Exit functionality
    const exitButton = document.getElementById('exitButton');
    if (exitButton) {
        exitButton.addEventListener('click', function() {
            if (confirm('Dasturdan chiqmoqchimisiz?')) {
                // Note: Browser does not allow closing a tab programmatically if it's not user-initiated.
                // This will only work if the tab was opened by the same script.
                window.close();
            }
        });
    }
});
