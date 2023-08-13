"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'tasksdb',
    user: 'edgarcandales',
    password: 'test1',
};
const db = pgp(connection);
exports.default = db;
