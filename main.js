
// link appedner bot
// todo
// * docker compose (1 service)
// * docker file
// * take link from env variable


const { Telegraf } = require('telegraf')
const { channelPost } = require('telegraf/filters')

require('dotenv').config()


// console.log(process.env.BOT_TOKEN)

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.on(channelPost(), async ctx => {

  const link = '' // тут хз, 

  if (ctx.update.channel_post.forward_origin) {
    return
  }

  let caption = ctx.update.channel_post.caption

  if (caption) {
    return await ctx.editMessageCaption(caption + link)
  }

  if (ctx.text) {
    return await ctx.editMessageText(ctx.text + link)
  }

})

bot.launch()
