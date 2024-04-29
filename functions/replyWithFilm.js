import genres from '../genres.js'
import { InlineKeyboard } from 'grammy'

export default async (ctx, photo, title, description, genre, year, country) => {
	const inline = new InlineKeyboard().text('🏠 Домой', 'home')
	const selectedGenres = genre.map(index => genres[index]).join(', ')
	await ctx.replyWithPhoto(photo, {
		caption: `<b>📚 ${title}\n\n🎬 ${selectedGenres}\n🌍 ${year}, ${country}</b>\n\n<i>${description}</i>`,
		reply_markup: inline,
	})
}
