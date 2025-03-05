// Импорт данных гороскопов
import horoscopeData from './horoscope-data.js';

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

// Функция получения гороскопа
function getHoroscope(sign) {
    try {
        console.log('Получаем гороскоп для знака:', sign);
        const data = horoscopeData[sign];
        
        if (!data) {
            throw new Error('Неверный знак зодиака');
        }

        const currentDate = new Date().toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const horoscope = `🌟 Гороскоп на ${currentDate}:\n\n${data.description}\n\n💫 Счастливое число: ${data.lucky_number}\n🎨 Цвет удачи: ${data.color}\n💝 Совместимость: ${data.compatibility}`;
        console.log('Сформированный гороскоп:', horoscope);
        return horoscope;
    } catch (error) {
        console.error('Ошибка при получении гороскопа:', error);
        throw error;
    }
}

// Обработка отправки формы
form.addEventListener('submit', (e) => {
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
    horoscopeContainer.textContent = 'Загрузка гороскопа...';

    try {
        const horoscope = getHoroscope(sign);
        horoscopeContainer.innerHTML = horoscope.replace(/\n/g, '<br>');
        
        // Уведомляем Telegram о изменении высоты контента
        tg.MainButton.setText('Поделиться');
        tg.MainButton.show();
    } catch (error) {
        console.error('Ошибка при получении гороскопа:', error);
        horoscopeContainer.textContent = `Произошла ошибка: ${error.message}`;
    }
});

// Обработка кнопки "Поделиться"
tg.MainButton.onClick(() => {
    const horoscope = horoscopeContainer.textContent;
    tg.sendData(horoscope);
}); 