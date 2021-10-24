// 00_Подключаем router из библиотеки экспресс
// 00_1_Подключаем модельки
const { Router } = require('express')
const Todo = require ('../models/Todo')
const router = Router()

// 02_Обращаемся к роутеру, и для того, чтобы обрабатывать гет-запросы (т.е, что мы отправляем из браузера для получения страниц) - вызываем метод гет
// Чтобы пользователю что-то вернуть, вызываем метод рендер, который рендерит страницы. В данном случае index - это наша главная страница. Подключаем роутер в файле index.js.
// Чтобы наш тайтл выглядел красиво нужно: вторым параметром в метод рендер передать объект с данными. Чтобы кнопки оставались подсвеченными, нужно в объект также передать флаги. Далее идём в navbar.
// Добавляем модельки, прописываем асинг, параметр todos, дописываем его в объект и далее чтобы это обработать, идём на главную страницу (index.hbs)
router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

// 03_Делаем тоже самое, что и для главной страницы, только меняем на create. ДАльше идём создавать эту страницу в папке views, файл create.hbs.
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

// 05_Строим модельки. Для того чтобы экспресс мог парсить body нам необходимо дописать логику в index.js. Чтобы сохранялись данные прописываем todo.save.
// 05_1 Для добавления красивых стилей создаем папку public, а в ней файл index.css. 
router.post('/create', async (req, res) => {
    const todo = new Todo ({
        title: req.body.title
    })

    await todo.save();
    res.redirect('/')
})

// 06_Чтобы тудушки сохраняли свойства, после прописывания id в index.hbs пишем новый router.post.
// 06_1 Чтобы свойства изменялись по мере их изменения в приложении, нужно внести изменения в index.hbs
router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save ()

    res.redirect('/')
})

// 01_Экспортируем этот роутер наружу из файла
module.exports = router
