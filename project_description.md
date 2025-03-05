# Техническое задание для разработки приложения с гороскопами в Telegram Web App

## Обзор проекта

Цель проекта — разработать простое веб-приложение, которое предоставляет персонализированные ежедневные гороскопы на основе знака зодиака или даты рождения пользователя. Приложение должно быть интегрировано в Telegram Web App и монетизировано с помощью рекламы через Google AdSense.

## Функциональные требования

- Пользователь может выбрать один из двух способов ввода данных:
  - Выбрать знак зодиака из выпадающего списка.
  - Ввести дату рождения для автоматического определения знака зодиака.
- После отправки данных пользователь видит рекламный баннер, пока загружается гороскоп.
- После завершения показа рекламы отображается ежедневный гороскоп для выбранного или рассчитанного знака зодиака.

## Нефункциональные требования

- Приложение должно быть адаптивным и корректно отображаться на мобильных устройствах.
- Приложение должно загружаться быстро и обеспечивать удобный пользовательский опыт.
- Приложение должно обрабатывать ошибки (например, недоступность API или некорректный ввод) с выводом понятных сообщений.

## Техническая реализация

- **Фронтенд**: HTML, CSS, JavaScript.
- **API**: Prokerala Astrology API (использовать бесплатный план).
- **Реклама**: Google AdSense.
- **Интеграция с Telegram**: Telegram Web App SDK.

## Пользовательский интерфейс

- **Форма ввода**:
  - Радиокнопки для выбора способа ввода:
    - "Выбрать знак зодиака".
    - "Ввести дату рождения".
  - Условные поля ввода (отображаются в зависимости от выбора):
    - Выпадающий список `<select>` с 12 знаками зодиака (если выбран первый вариант).
    - Поле `<input type="date">` для ввода даты рождения (если выбран второй вариант).
  - Кнопка "Получить гороскоп" (`<button type="submit">`).
- **Области отображения**:
  - Контейнер для рекламы (`<div id="ad-container">`).
  - Контейнер для текста гороскопа (`<div id="horoscope-container">`).

## План реализации проекта

### 1. Настройка окружения разработки
- Установить редактор кода (например, Visual Studio Code).
- Настроить локальный сервер для тестирования (например, использовать расширение Live Server в VSCode).

### 2. Получение учетных данных
- Зарегистрироваться на [Prokerala API](https://api.prokerala.com/) и получить API-токен.
- Зарегистрироваться в [Google AdSense](https://support.google.com/adsense/) и получить идентификатор клиента (`data-ad-client`) и слот рекламы (`data-ad-slot`).

### 3. Создание HTML-структуры
- Создать файл `index.html`.
- Добавить форму с радиокнопками, условными полями ввода и кнопкой отправки.
- Добавить контейнеры для рекламы и гороскопа.

### 4. Стилизация с помощью CSS
- Создать файл `styles.css`.
- Настроить адаптивный дизайн для формы, рекламы и текста гороскопа.
- Убедиться, что интерфейс выглядит аккуратно и удобно на мобильных устройствах.

### 5. Реализация функциональности на JavaScript
- Создать файл `script.js`.
- Добавить:
  - Логику переключения полей ввода в зависимости от выбранной радиокнопки.
  - Функцию расчета знака зодиака по дате рождения (если выбрана дата).
  - Обработку отправки формы: получение данных, вызов рекламы, запрос к API и отображение гороскопа.
  - Обработку ошибок (например, некорректный ввод или сбой API).

### 6. Интеграция с Telegram Web App
- Подключить скрипт Telegram Web App SDK в `index.html`:
  ```html
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  ```
- Настроить приложение согласно [документации Telegram Web App](https://core.telegram.org/bots/webapps).

### 7. Развертывание приложения
- Загрузить проект на хостинг (например, GitHub Pages или Netlify).
- Получить публичный URL приложения.

### 8. Настройка Telegram-бота
- Создать бота через BotFather в Telegram.
- Установить URL веб-приложения для бота с помощью команды `/setwebapp`.

### 9. Тестирование
- Проверить работу приложения локально через Live Server.
- Протестировать приложение в Telegram через созданного бота.
- Убедиться, что форма, реклама и гороскоп отображаются корректно.

## Ресурсы

- [Документация Prokerala Astrology API](https://api.prokerala.com/docs) — для настройки запросов к API.
- [Документация Google AdSense](https://support.google.com/adsense/) — для интеграции рекламы.
- [Документация Telegram Web App](https://core.telegram.org/bots/webapps) — для интеграции с Telegram.

## Примеры кода

### Расчет знака зодиака
```javascript
function getZodiacSign(day, month) {
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
}
```

### Запрос к API
```javascript
async function getHoroscope(sign, date) {
    const response = await fetch('https://api.prokerala.com/v2/astrology/horoscope', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sign: sign, date: date })
    });
    const data = await response.json();
    return data.horoscope;
}
```

### Интеграция рекламы
```javascript
function showAd() {
    const adContainer = document.getElementById('ad-container');
    adContainer.innerHTML = `
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="YOUR_AD_CLIENT_ID"
             data-ad-slot="YOUR_AD_SLOT"
             data-ad-format="auto"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    `;
}
```

### Пример обработки формы
```javascript
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputType = document.querySelector('input[name="input_type"]:checked').value;
    let sign;
    if (inputType === 'sign') {
        sign = document.querySelector('#sign-select').value;
    } else {
        const birthDate = document.querySelector('#birth-date-input').value;
        const [year, month, day] = birthDate.split('-');
        sign = getZodiacSign(parseInt(day), parseInt(month));
    }
    if (!sign) {
        alert('Пожалуйста, выберите знак зодиака или введите дату рождения.');
        return;
    }
    const today = new Date().toISOString().split('T')[0];
    showAd();
    try {
        const horoscope = await getHoroscope(sign, today);
        document.getElementById('horoscope-container').textContent = horoscope;
    } catch (error) {
        console.error('Ошибка при получении гороскопа:', error);
        document.getElementById('horoscope-container').textContent = 'Произошла ошибка. Попробуйте снова.';
    }
});
```

## Замечания

- Замените `YOUR_API_TOKEN`, `YOUR_AD_CLIENT_ID` и `YOUR_AD_SLOT` на реальные значения после регистрации.
- Убедитесь, что API-токен и параметры рекламы хранятся безопасно и не отображаются в публичном коде.

Этот план и примеры кода должны помочь вашему джуниор-специалисту реализовать проект. Удачи в разработке!