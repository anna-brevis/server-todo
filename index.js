// 00_Подключаем express
const express = require('express');

// 05_Подключаем базу mongodb
const mongoose = require('mongoose');

// 07_Подключаем handlebars
const exphbs = require('express-handlebars');

// 11_Подключаем роутер
// 11_1 Чтобы его зарегистрировать, идём ниже пункта 10
const todoRoutes = require('./routes/todos');

// 03_Обозначаем порт, на котором будет работать приложение
// 04_Если у нас есть системная переменная Порт, то тогда я буду брать её из системной переменной, иначе 3000
const PORT = process.env.PORT || 3000;

// 01_Создаём объект приложения
const app = express();

// 08_Настраиваем пакет hbs (вызываем метод create, который позволяет настроить конфигурации для будущего шаблонизатора)
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

// 09_В hbs есть ключ engine(движок (для рендеринга страниц)), который мы должны зарегистрировать в экспрессе
// 09_1 объект и его параметр
app.engine('hbs', hbs.engine);

// 10_Используем зарегистрированный ключ (после этого создаём в корневой папке папку views, а в ней файл index.hbs). Создаём папку routes c файлом todos.js
// 10_1 ключ и его значение
// 10_2 для хранения видов нашего сайта
app.set('view engine', 'hbs');
app.set('views', 'views');

// 12_Регистрируем роутер/ После этого в папке views создаём новую папку layouts, а в ней файл main.hbs.
app.use(todoRoutes);

// 06_Запускаем сервер (после этого нужно в node установить handlebars)
// 06_1 Функция ассинхронная, читобы вызвать метод await
// 06_2 Сначала подключается база, потом подключается сервер на доступную базу. Подключение к базе данных, в '' вставляем ссылку на бд, с сайта mongodb. Меняем пароль на тот что мы придумали, удаляем квери-параметры (те, что после ?).
// 06_3 Колбек будет вызван в том случае, если сервер уже запущен
async function start() {
    try {  
        await mongoose.connect('mongodb+srv://anka:1z2x3c4v@cluster0.bpwya.mongodb.net/todos', {
            useNewUrlParser: true, // useFindAndModify: false
        }) 
        app.listen(PORT, () => {
            console.log('Server has been sterted...');
        })
    } catch (e) {
        console.log(e); // Вывод ошибки
    }
}
// Чтобы заработало, выводим старт
start()

