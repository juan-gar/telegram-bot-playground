const { Telegraf } = require('telegraf')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const token = process.env.BOT_TOKEN
let input

const bot = new Telegraf(token)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.hears('weather', (ctx) => {
    //const lat = 41.4107
    //const lon = 2.1806

    geocode(input,(error,{place,latitude,longitude}) => {
        if(error) {
            return console.log(error)
        }

        console.log(input)

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error)
            }
            //console.log(`Here is the forecast for ${place}: ${forecastData}`)
    
            ctx.reply(`The forecast for ${place} is ${forecastData}`)
        })

    })

    
})



bot.launch()