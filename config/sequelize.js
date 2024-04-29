import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(
	'mysql://host:BY3VH5r47ojGesqPOUZdSeYI@77.246.100.5:3306/filmbot'
)

export { sequelize }
