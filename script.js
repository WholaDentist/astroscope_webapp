// Импорт данных гороскопов больше не нужен
// import horoscopeData from './horoscope-data.js';

// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// DOM элементы
const form = document.getElementById('horoscopeForm');
const signInput = document.getElementById('sign-input');
const dateInput = document.getElementById('date-input');
const horoscopeContainer = document.getElementById('horoscope-container');
const adContainer = document.getElementById('ad-container');

// Переключение между типами ввода
document.querySelectorAll('input[name="input_type"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'sign') {
            signInput.classList.remove('hidden');
            dateInput.classList.add('hidden');
        } else {
            signInput.classList.add('hidden');
            dateInput.classList.remove('hidden');
        }
    });
});

// Функция определения знака зодиака по дате
function getZodiacSign(day, month) {
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "capricorn";
}

// Функция получения реального гороскопа через API
async function getHoroscope(sign) {
    try {
        console.log('Получаем гороскоп для знака:', sign);
        
        const response = await fetch('https://aztro.sameerkumar.website/?' + new URLSearchParams({
            sign: sign,
            day: 'today'
        }), {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Ошибка при получении гороскопа');
        }

        const data = await response.json();
        
        // Переводим описание с помощью второго API запроса
        const translateResponse = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=' + encodeURIComponent(data.description));
        const translatedData = await translateResponse.json();
        const translatedDescription = translatedData[0][0][0];

        const horoscope = `
🌟 Гороскоп на ${new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})}

${translatedDescription}

💫 Счастливое число: ${data.lucky_number}
🎨 Цвет удачи: ${translateColor(data.color)}
💝 Совместимость: ${getZodiacSignName(data.compatibility)}
🌺 Настроение: ${translateMood(data.mood)}
`;
        
        console.log('Сформированный гороскоп:', horoscope);
        return horoscope;
    } catch (error) {
        console.error('Ошибка при получении гороскопа:', error);
        throw error;
    }
}

// Функция перевода цветов
function translateColor(color) {
    const colors = {
        'Red': 'Красный',
        'Blue': 'Синий',
        'Green': 'Зеленый',
        'Yellow': 'Желтый',
        'Purple': 'Фиолетовый',
        'Pink': 'Розовый',
        'Orange': 'Оранжевый',
        'Brown': 'Коричневый',
        'White': 'Белый',
        'Black': 'Черный',
        'Gold': 'Золотой',
        'Silver': 'Серебряный'
    };
    return colors[color] || color;
}

// Функция перевода настроения
function translateMood(mood) {
    const moods = {
        'Happy': 'Радостное',
        'Calm': 'Спокойное',
        'Romantic': 'Романтичное',
        'Energetic': 'Энергичное',
        'Peaceful': 'Умиротворенное',
        'Thoughtful': 'Задумчивое',
        'Excited': 'Взволнованное',
        'Relaxed': 'Расслабленное'
    };
    return moods[mood] || mood;
}

// Функция получения названия знака на русском
function getZodiacSignName(sign) {
    const signs = {
        'Aries': 'Овен',
        'Taurus': 'Телец',
        'Gemini': 'Близнецы',
        'Cancer': 'Рак',
        'Leo': 'Лев',
        'Virgo': 'Дева',
        'Libra': 'Весы',
        'Scorpio': 'Скорпион',
        'Sagittarius': 'Стрелец',
        'Capricorn': 'Козерог',
        'Aquarius': 'Водолей',
        'Pisces': 'Рыбы'
    };
    return signs[sign] || sign;
}

// Функция показа рекламы
function showAd() {
    adContainer.innerHTML = `
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${process.env.AD_CLIENT_ID}"
             data-ad-slot="${process.env.AD_CLIENT_SECRET}"
             data-ad-format="auto"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    `;
}

// Обработка отправки формы
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let sign;
    const inputType = document.querySelector('input[name="input_type"]:checked').value;
    
    if (inputType === 'sign') {
        sign = document.getElementById('sign-select').value;
        if (!sign) {
            alert('Пожалуйста, выберите знак зодиака');
            return;
        }
    } else {
        const birthDate = document.getElementById('birth-date-input').value;
        if (!birthDate) {
            alert('Пожалуйста, введите дату рождения');
            return;
        }
        const [year, month, day] = birthDate.split('-');
        sign = getZodiacSign(parseInt(day), parseInt(month));
    }

    // Показываем рекламу
    showAd();
    horoscopeContainer.innerHTML = '<div class="loading">Получаем ваш гороскоп... ⌛</div>';

    try {
        const horoscope = await getHoroscope(sign);
        horoscopeContainer.innerHTML = horoscope.replace(/\n/g, '<br>');
        
        // Показываем кнопку "Отправить в Telegram"
        tg.MainButton.setText('Отправить в Telegram');
        tg.MainButton.show();
        
        // Сохраняем данные для отправки
        window.horoscopeData = {
            sign: sign,
            text: horoscope
        };
    } catch (error) {
        console.error('Ошибка:', error);
        horoscopeContainer.textContent = 'Произошла ошибка при получении гороскопа. Попробуйте позже.';
    }
});

// Обработка кнопки "Отправить в Telegram"
tg.MainButton.onClick(() => {
    if (window.horoscopeData) {
        tg.sendData(JSON.stringify(window.horoscopeData));
    }
}); 