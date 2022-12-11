const bcrypt = require('bcryptjs');
import { createPool } from 'mysql2/promise';

const db = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'onlineshop',
    password: process.env.DB_PASSWORD || 'root',
    port: process.env.DB_PORT || 3306
})

let usernameExists = async (username) => {
    const result = await db.query('select USERNAME from user where USERNAME = ? limit 1', [username]);
    return result[0].length > 0;
};


let getUserByUsername = async (username) => {
    const result = await db.query('select * from user where USERNAME = ? limit 1', [username]);
    return result[0] && result[0][0];
};

//Check info input logging
let checkUserCredential = async (username, password) => {
    console.log(username, password);
    const user = await getUserByUsername(username);
    if (!user) return null;
    if (password === user.PASSWORD)
        return user;
    // if (await bcrypt.compare(password, user.password))
    //     return user;
    return null;
}

module.exports = {
    usernameExists,
    getUserByUsername,
    checkUserCredential
}