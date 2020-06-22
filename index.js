const { Telegraf } = require('telegraf')
const forecast = require('./utils/forecast')


const bot = new Telegraf('1026118206:AAHk-RW2yuebNUGW5kIEQ4_eaxk3f-F39Xk')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.hears('weather', (ctx) => {
    const lat = 41.4107
    const lon = 2.1806

    forecast(lat, lon, (error, forecastData) => {
        if(error) {
            return console.log(error)
        }
        //console.log(`Here is the forecast for ${place}: ${forecastData}`)

        ctx.reply(forecastData)
    })
})



bot.launch()