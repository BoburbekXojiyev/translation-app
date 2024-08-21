// DOM elementlarini olish
const form = document.getElementById('updateForm');
const updateWordInput = document.getElementById('updateWord');
const updateTranslationInput = document.getElementById('updateTranslation');
const updateResult = document.getElementById('updateResult');

// Formani yuborishni boshqarish
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Formaning standart yuborilishini to'xtatish

    // Inputlardan qiymatlarni olish
    const word = updateWordInput.value.trim();
    const translation = updateTranslationInput.value.trim();

    // Kiritilgan qiymatlarni tekshirish
    if (word && translation) {
        // Ma'lumotlarni qayta ishlash (masalan, serverga yuborish yoki lokal saqlash)
        // Bu yerda faqat namunaviy natijani ko'rsatish

        // Natijani ko'rsatish
        updateResult.textContent = `The word "${word}" has been updated with the new translation: "${translation}".`;
        updateResult.style.color = 'green'; // Muvaffaqiyatli yangilanganligi haqida tasdiqlash

        // Formani tozalash
        form.reset();
    } else {
        // Xatolik haqida xabar ko'rsatish
        updateResult.textContent = 'Please fill out both fields.';
        updateResult.style.color = 'red'; // Xatolik xabari uchun rang
    }
});
