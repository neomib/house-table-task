import express from 'express';
import Validator from 'validator';
import models from '../models';
import { calcRisk } from './business/houses';

const router = express.Router();

/**
 * Get all houses
 */
// router.get('/', (req, res) => {
// 	models.house.findAll({
// 		order: [['currentValue', 'ASC']]
// 	}).then(houses => {
// 		if (houses && Object.keys(houses).length > 0)
// 			res.json({ success: true, houses });
// 		else
// 			res.status(400).json({ success: false, error: "No house was found." });
// 	})
// });

/**
 * Get house by ID
 */
router.get('/:id', (req, res) => {
	let error = null;
	let id = req.params.id || null;

	if (!id) error = "Invalid request.";
	else if (Validator.isEmpty(id)) error = "Invalid request.";
	else if (!Validator.isInt(id)) error = "Value must be integer.";
	else if (Number(id) <= 0) error = "Invalid value.";

	if (error) res.status(400).json({ success: false, error: error, data: {} });

	models.house.findByPk(req.params.id)
		.then(data => {
			if (data)
				res.json({ success: true, house: data });
			else
				res.status(400).json({ success: false, error: "House not found.", house: {} });
		})
});

/**
 * Insert new house
 */
router.post('/', (req, res) => {
	let { address, currentValue, loanAmount } = req.body;
	models.house
		.build({ address, currentValue, loanAmount, risk: calcRisk(currentValue, loanAmount) })
		.save()
		.then((house) => res.json({ success: true, houseId: house.get("id") }))
		.catch((err) => res.status(400).json({ success: false, errors: { globals: err } }));
});

/**
 * Update house by ID
 */
router.put('/:id', (req, res) => {
	let { id, currentValue, loanAmount } = req.body;
	const risk = calcRisk(currentValue, loanAmount);
	models.house
		.update({ currentValue, loanAmount, risk }, { where: { id } })
		.then(() => res.json({ success: true, currentValue, loanAmount, risk }))
		.catch((err) => res.status(400).json({ success: false, errors: { globals: "Ops, something wrong happened.." } }));
});

/**
 * Delete house by ID
 */
router.delete('/:id', (req, res) => {
	let id = req.params.id;
	models.house
		.destroy({ where: { id } })
		.then((rowDeleted) => res.json({ success: true, deleted: rowDeleted }))
		.catch((err) => res.status(500).json({ success: false, errors: { globals: err } }));
});

export default router;
