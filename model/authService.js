const bcrypt = require('bcryptjs');
import { createPool } from 'mysql2/promise';

const db = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'onlineshop',
    password: process.env.DB_PASSWORD || 'quang234',
    port: process.env.DB_PORT || 3306
})

let usernameExists = async (username) => {
    const result = await db.query('select USERNAME from user where USERNAME = ? limit 1', [username]);
    return result[0].length > 0;
};
let emailExists = async (username) => {
    const result = await db.query('select EMAIL from user where USERNAME = ? limit 1', [username]);
    return result[0].length > 0;
};


let getUserByUsername = async (username) => {
    const result = await db.query('select * from user where USERNAME = ? limit 1', [username]);
    return result[0] && result[0][0];
};

//Check info input logging
let checkUserCredential = async (username, password) => {
    const user = await getUserByUsername(username);
    console.log('user: ', user)
    if (!user) return null;

    // if (password === user.PASSWORD)
    //     return user;
    const getUser = await bcrypt.compare(password, user.PASSWORD);
    console.log(getUser)
    if (await bcrypt.compare(password, user.PASSWORD))
        
        return user;

    return null;
}
let insertUser = async (username, email, hash) => {
    await db.query("INSERT INTO user (USERNAME, ADMIN, EMAIL, PASSWORD) VALUES (?,'0', ?, ?)", [username, email, hash]);
    console.log(username);
}
let register = async (username, email, password) => {
    console.log(username, email, password)
    if (await emailExists(email))
        throw new Error('Email đã tồn tại!');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return insertUser(username, email, hash);
}


module.exports = {
    usernameExists,
    getUserByUsername,
    checkUserCredential,
    register,
    emailExists
}