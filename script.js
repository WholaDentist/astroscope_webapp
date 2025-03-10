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

// Конфигурация Gemini API
const GEMINI_API_KEY = 'AIzaSyDZgKbAd317FGSdRDzDu9-kuXMYohx1Z-I';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY;

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

// База предсказаний для каждой сферы жизни
const predictions = {
    love: [
        "Сегодня звезды благоприятствуют романтическим отношениям",
        "Хороший день для новых знакомств",
        "Возможны неожиданные повороты в личной жизни",
        "Прекрасное время для укрепления существующих отношений",
        "День подходит для романтического свидания"
    ],
    career: [
        "Благоприятный период для карьерного роста",
        "Возможно поступление интересного делового предложения",
        "Хороший день для важных переговоров",
        "Ваши профессиональные навыки будут высоко оценены",
        "Подходящее время для новых проектов"
    ],
    health: [
        "Отличный день для начала здорового образа жизни",
        "Уделите внимание своему здоровью и самочувствию",
        "Энергетический потенциал на высоком уровне",
        "Хорошее время для физической активности",
        "День подходит для восстановления сил"
    ],
    finance: [
        "Благоприятный день для финансовых операций",
        "Возможны неожиданные денежные поступления",
        "Хорошее время для планирования бюджета",
        "Удачный период для инвестиций",
        "Будьте внимательны к финансовым возможностям"
    ]
};

// Характеристики знаков
const signCharacteristics = {
    aries: {
        element: "Огонь",
        planet: "Марс",
        characteristics: "энергичность, лидерство, энтузиазм"
    },
    taurus: {
        element: "Земля",
        planet: "Венера",
        characteristics: "надежность, практичность, упорство"
    },
    gemini: {
        element: "Воздух",
        planet: "Меркурий",
        characteristics: "общительность, любознательность, адаптивность"
    },
    cancer: {
        element: "Вода",
        planet: "Луна",
        characteristics: "чувствительность, интуиция, забота"
    },
    leo: {
        element: "Огонь",
        planet: "Солнце",
        characteristics: "творчество, благородство, уверенность"
    },
    virgo: {
        element: "Земля",
        planet: "Меркурий",
        characteristics: "аналитичность, практичность, внимание к деталям"
    },
    libra: {
        element: "Воздух",
        planet: "Венера",
        characteristics: "дипломатичность, справедливость, гармония"
    },
    scorpio: {
        element: "Вода",
        planet: "Плутон",
        characteristics: "страстность, проницательность, решительность"
    },
    sagittarius: {
        element: "Огонь",
        planet: "Юпитер",
        characteristics: "оптимизм, свобода, философский взгляд"
    },
    capricorn: {
        element: "Земля",
        planet: "Сатурн",
        characteristics: "амбициозность, ответственность, дисциплина"
    },
    aquarius: {
        element: "Воздух",
        planet: "Уран",
        characteristics: "оригинальность, независимость, дружелюбие"
    },
    pisces: {
        element: "Вода",
        planet: "Нептун",
        characteristics: "интуиция, творчество, сострадание"
    }
};

// Функция получения случайного элемента из массива
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Функция генерации гороскопа
function generateHoroscope(sign) {
    const signInfo = signCharacteristics[sign];
    const currentDate = new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const horoscope = `
🌟 Гороскоп на ${currentDate}
для знака ${getZodiacSignName(sign)}

⭐️ Общая характеристика:
Стихия: ${signInfo.element}
Планета: ${signInfo.planet}
Ключевые качества: ${signInfo.characteristics}

💝 Любовь и отношения:
${getRandomElement(predictions.love)}

💼 Карьера и работа:
${getRandomElement(predictions.career)}

❤️ Здоровье и самочувствие:
${getRandomElement(predictions.health)}

💰 Финансы:
${getRandomElement(predictions.finance)}

🎲 Счастливое число: ${Math.floor(Math.random() * 100)}
🎨 Цвет удачи: ${getRandomElement(['Красный', 'Синий', 'Зеленый', 'Фиолетовый', 'Золотой', 'Серебряный'])}
`;

    return horoscope;
}

// Функция получения названия знака на русском
function getZodiacSignName(sign) {
    const signs = {
        'aries': 'Овен',
        'taurus': 'Телец',
        'gemini': 'Близнецы',
        'cancer': 'Рак',
        'leo': 'Лев',
        'virgo': 'Дева',
        'libra': 'Весы',
        'scorpio': 'Скорпион',
        'sagittarius': 'Стрелец',
        'capricorn': 'Козерог',
        'aquarius': 'Водолей',
        'pisces': 'Рыбы'
    };
    return signs[sign] || sign;
}

// Функция получения гороскопа через Gemini API
async function getHoroscopeFromGemini(sign) {
    const signInfo = signCharacteristics[sign];
    const prompt = `Сгенерируй детальный гороскоп на сегодня для знака ${getZodiacSignName(sign)}.
    Учти следующие характеристики знака:
    - Стихия: ${signInfo.element}
    - Планета: ${signInfo.planet}
    - Ключевые качества: ${signInfo.characteristics}
    
    Гороскоп должен включать:
    1. Общий прогноз на день
    2. Любовь и отношения
    3. Карьера и работа
    4. Здоровье и самочувствие
    5. Финансы
    
    Формат должен быть позитивным, но реалистичным. Используй эмодзи для каждого раздела.
    Добавь в конце счастливое число (от 1 до 100) и цвет удачи.`;

    try {
        console.log('Отправляем запрос к Gemini API...');
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gemini-pro",
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        console.log('Получен ответ от API:', response.status);
        const responseText = await response.text();
        console.log('Тело ответа:', responseText);

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status} ${responseText}`);
        }

        const data = JSON.parse(responseText);
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
            throw new Error('Некорректный формат ответа от API');
        }

        const generatedText = data.candidates[0].content.parts[0].text;

        // Форматируем ответ
        const currentDate = new Date().toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `🌟 Гороскоп на ${currentDate}\nдля знака ${getZodiacSignName(sign)}\n\n${generatedText}`;
    } catch (error) {
        console.error('Ошибка при получении гороскопа:', error);
        // Если произошла ошибка, используем локальную генерацию
        console.log('Используем локальную генерацию как запасной вариант');
        return generateHoroscope(sign);
    }
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
    horoscopeContainer.innerHTML = '<div class="loading">Составляем ваш гороскоп... ⌛</div>';

    try {
        const horoscope = await getHoroscopeFromGemini(sign);
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