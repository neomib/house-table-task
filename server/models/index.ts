"use strict";
import fs from 'fs';
import path from 'path';
import { Model, ModelStatic, Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'database.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db: { [key: string]: ModelStatic<Model> } = {} as any;

fs
	.readdirSync(__dirname)
	.filter(function (file) {
		return (file.indexOf(".") !== 0) && (file !== "index.ts");
	})
	.forEach(function (file) {
		let model = require(path.join(__dirname, file)).default(sequelize);
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if ("associate" in db[modelName]) (db[modelName] as any).associate(db);
});

(db as any).sequelize = sequelize;
export default db;
