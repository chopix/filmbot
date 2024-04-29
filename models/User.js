import { sequelize } from '../config/sequelize.js'
import { DataTypes, Model, Sequelize } from 'sequelize'

export class User extends Model {}
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		tgId: {
			type: DataTypes.BIGINT(100),
			unique: true,
			allowNull: false,
			field: 'tg_id',
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: 'is_admin',
		},
	},
	{
		sequelize,
		modelName: 'user',
	}
)
