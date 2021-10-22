// Подключаем некоторые штуки из мангуса (из бд) 
// Далее в роутере подключаем нашу модель
const { Schema, model } = require ('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', schema)