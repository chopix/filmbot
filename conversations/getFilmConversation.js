import { InlineKeyboard } from 'grammy'
import { Film } from '../models/Film.js'
import replyWithFilm from '../functions/replyWithFilm.js'

export const getFilmConversation = async (conversation, ctx) => {
	try {
		await ctx.reply('💬 <b>Введите код интересующего вас фильма/сериала</b>')
		let code = await conversation.wait()
		if (isNaN(code.message.text)) {
			do {
				await ctx.reply('<b>❌ Вы должны ввести код!</b>')
				code = await conversation.wait()
			} while (isNaN(code.message.text))
		}

		const film = await Film.findOne({ where: { code: code.message.text } })

		if (!film) {
			const inline = new InlineKeyboard()
				.text('🏠 Домой', 'home')
				.text('🪄 Ввести код ещё раз', 'enterFilmCode')
			return ctx.reply(
				'<b>❌ Ошибка! Фильм с таким кодом не найден. 😕\n\nВыберите действие на кнопках ниже 👇</b>',
				{ reply_markup: inline }
			)
		}
		return await replyWithFilm(
			ctx,
			film.photoFileId,
			film.title,
			film.description,
			JSON.parse(film.genre),
			film.year,
			film.country
		)
	} catch (e) {
		console.log(e)
	}
}
