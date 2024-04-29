import { Film } from '../models/Film.js'
import { InlineKeyboard } from 'grammy'
import genres from '../genres.js'
import replyWithFilm from '../functions/replyWithFilm.js'

function getMaxFileSizeObject(array) {
	if (!Array.isArray(array) || array.length === 0) {
		return null // возвращаем null, если массив пустой или не является массивом
	}

	let maxFileSizeObject = array.reduce((max, current) => {
		return max.file_size > current.file_size ? max : current
	})

	return maxFileSizeObject
}

export const addFilmConversation = async (conversation, ctx) => {
	try {
		await ctx.reply('Картинка')
		const img = await conversation.waitFor(['message:media'])
		const maxFileSizeObject = getMaxFileSizeObject(img.message.photo)
		const photoFileId = maxFileSizeObject.file_id
		await ctx.reply('Название')
		const title = await conversation.wait()
		await ctx.reply('Описание')
		const description = await conversation.wait()
		await ctx.reply('Жанр')
		let message = ''
		for (let key in genres) {
			message += key + ' - ' + genres[key] + '\n'
		}
		await ctx.reply(message)
		const genre = await conversation.wait()
		await ctx.reply('Год выпуска')
		const year = await conversation.wait()
		await ctx.reply('Страна')
		const country = await conversation.wait()
		await ctx.reply('Код')
		const code = await conversation.wait()
		const film = await Film.findOne({ where: { code: code.message.text } })
		if (film) {
			const inline = new InlineKeyboard().text('🏠 Домой', 'home')
			return ctx.reply('Фильм с таким кодом уже есть', { reply_markup: inline })
		}
		await replyWithFilm(
			ctx,
			photoFileId,
			title.message.text,
			description.message.text,
			JSON.parse(genre.message.text),
			year.message.text,
			country.message.text
		)
		return await Film.create({
			code: code.message.text,
			title: title.message.text,
			description: description.message.text,
			genre: genre.message.text,
			country: country.message.text,
			year: year.message.text,
			photoFileId: photoFileId,
		})
	} catch (e) {
		console.log(e)
	}
}
