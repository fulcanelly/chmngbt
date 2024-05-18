const { Telegraf } = require('telegraf')
const { channelPost } = require('telegraf/filters')

require('dotenv').config()


// console.log(process.env.BOT_TOKEN)

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.on(channelPost(), async ctx => {
  // console.log('loh')
  console.log({
    from: ctx.from,
    text: ctx.text,
    caption: ctx.update.channel_post.caption
  })

  if (ctx.update.channel_post.forward_origin) {
    return
  }

  let caption = ctx.update.channel_post.caption

  if (caption) {
    return await ctx.editMessageCaption(caption + ' af')
  }

  if (ctx.text) {
    return await ctx.editMessageText(ctx.text + ' af')
  }

})

bot.launch()
