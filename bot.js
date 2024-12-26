import { Bot, InlineKeyboard, session } from 'grammy'
import 'dotenv/config'
import { sequelize } from './config/sequelize.js'
import { User } from './models/User.js'
import { hydrateReply, parseMode } from '@grammyjs/parse-mode'
import { conversations, createConversation } from '@grammyjs/conversations'
import { getFilmConversation } from './conversations/getFilmConversation.js'
import { addFilmConversation } from './conversations/addFilmConversation.js'

const bot = new Bot(process.env.TOKEN)
bot.use(hydrateReply)
bot.use(
	session({
		initial() {
			return {}
		},
	})
)

// Install the conversations plugin.
bot.use(conversations())

bot.use(createConversation(getFilmConversation))
bot.use(createConversation(addFilmConversation))

bot.api.config.use(parseMode('HTML'))

bot.command('start', async ctx => {
	try {
		const user = await User.findOne({ where: { tgId: ctx.from.id } })
		if (!user) {
			await User.create({ tgId: ctx.from.id })
		}

		let inline
		if (user.isAdmin === true) {
			inline = new InlineKeyboard()
				.text('🎥 Ввести код фильма', 'enterFilmCode')
				.text('Добавить фильм', 'addFilm')
		} else {
			inline = new InlineKeyboard().text(
				'🎥 Ввести код фильма',
				'enterFilmCode'
			)
		}
		await ctx.reply(
			'<b>🎬 Привет! Добро пожаловать в мир кино с КиноБум!</b>  \n\n<i>Здесь ты найдешь огромную коллекцию фильмов различных жанров, чтобы окунуться в удивительные истории и незабываемые приключения.</i> \n\n<b>🍿 Нажми на кнопку ниже, чтобы начать свое кинематографическое путешествие прямо сейчас! 💫</b>',
			{ reply_markup: inline }
		)
	} catch (e) {
		console.log(e)
	}
})

bot.callbackQuery('home', async ctx => {
	try {
		await ctx.answerCallbackQuery()
		const user = await User.findOne({ where: { tgId: ctx.from.id } })
		let inline
		if (user.isAdmin === true) {
			inline = new InlineKeyboard()
				.text('🎥 Ввести код фильма', 'enterFilmCode')
				.text('Добавить фильм', 'addFilm')
		} else {
			inline = new InlineKeyboard().text(
				'🎥 Ввести код фильма',
				'enterFilmCode'
			)
		}
		await ctx.reply(
			'<b>🎬 Привет! Добро пожаловать в мир кино с КиноБум!</b>  \n\n<i>Здесь ты найдешь огромную коллекцию фильмов различных жанров, чтобы окунуться в удивительные истории и незабываемые приключения.</i> \n\n<b>🍿 Нажми на кнопку ниже, чтобы начать свое кинематографическое путешествие прямо сейчас! 💫</b>',
			{ reply_markup: inline }
		)
	} catch (e) {
		console.log(e)
	}
})

bot.callbackQuery('enterFilmCode', async ctx => {
	try {
		await ctx.answerCallbackQuery()
		await ctx.conversation.enter('getFilmConversation')
	} catch (e) {
		console.log(e)
	}
})

bot.callbackQuery('addFilm', async ctx => {
	try {
		await ctx.answerCallbackQuery()
		await ctx.conversation.enter('addFilmConversation')
	} catch (e) {
		console.log(e)
	}
})

sequelize.sync()

bot.start()
