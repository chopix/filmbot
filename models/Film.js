import { sequelize } from '../config/sequelize.js'
import { DataTypes, Model, Sequelize } from 'sequelize'

export class Film extends Model {}
Film.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		code: {
			type: DataTypes.BIGINT(100),
			unique: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		year: {
			type: DataTypes.INTEGER,
		},
		country: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		genre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		photoFileId: {
			type: DataTypes.TEXT,
		},
	},
	{
		sequelize,
		modelName: 'film',
	}
)
