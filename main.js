const { Telegraf } = require('telegraf')
const { channelPost } = require('telegraf/filters')

require('dotenv').config()


const bot = new Telegraf(process.env.BOT_TOKEN)
const LINK_TEXT = process.env.LINK_TEXT
const LINK = process.env.LINK

function appendUrlEntity(text, linkText, url) {
  const entity = {
    offset: text.length,
    length: linkText.length,
    type: 'text_link',
    url
  }
  return {
    entity,
    text: text + linkText
  }
}

bot.on(channelPost(), async ctx => {
  console.log(ctx.update.channel_post)
  if (ctx.update.channel_post.forward_origin) {
    return
  }

  let caption = ctx.update.channel_post.caption
  const inputText = caption ?? ctx.text
  const updatedTextNEntity = appendUrlEntity(inputText + '\n\n', LINK_TEXT, LINK)
  const entites = ctx.update.channel_post.entities || ctx.update.channel_post.caption_entities || []
  const updatedEntities = entites.concat([updatedTextNEntity.entity])

  if (caption) {
    return await ctx.editMessageCaption(updatedTextNEntity.text, { caption_entities: updatedEntities })
  }

  if (ctx.text) {
    return await ctx.editMessageText(updatedTextNEntity.text, { entities: updatedEntities })
  }

})

bot.launch()
