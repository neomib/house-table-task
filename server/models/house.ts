import { FLOAT, STRING, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
	const House = sequelize.define('house', {
		address: {
			type: STRING(100),
			allowNull: false,
			comment: "Address of the house"
		},
		currentValue: {
			type: FLOAT(),
			allowNull: false,
			comment: "Current Value"
		},
		loanAmount: {
			type: FLOAT(),
			allowNull: false,
			comment: "Loan Amount"
		},
		risk: {
			type: FLOAT(),
			defaultValue: 0,
			comment: "A risk percentage for loan"
		}
	}, {
		tableName: 'house'
	});



	return House;
}
