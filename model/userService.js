const db = require('../config/connectDB');

let updateProfile = async (data, idUser) => {
    const {
        updateAva: ava,
        updateFullname: fullname,
        updateEmail: email,
        updatePhone: phone,
        updateSex: sex
    } = data;
    let values = [];
    let sql = "UPDATE user SET ";
    if (ava) {
        sql += " AVATAR = ? ";
        values.push(ava);
    }
    if (fullname) {
        if (ava) sql += ", ";
        sql += "FULLNAME = ? ";
        values.push(fullname);
    }
    if (email) {
        if (ava || fullname) sql += ", ";
        sql += "EMAIL = ? ";
        values.push(email);
    }
    if (phone) {
        if (ava || fullname || email) sql += ", ";
        sql += "PHONE = ? ";
        values.push(phone);
    }
    if (sex && sex === "female") {
        if (ava || fullname || email || phone) sql += ", ";
        sql += "SEX = ? ";
        values.push(`Nữ`);
    }
    else if (sex && sex === "male") {
        if (ava || fullname || email || phone) sql += ", ";
        sql += "SEX = ? ";
        values.push(`Nam`);
    }
    else if (sex && sex === "sexOther") {
        if (ava || fullname || email || phone) sql += ", ";
        sql += "SEX = ? ";
        values.push(`Khác`);
    }
    sql += "WHERE IDUSER = ?";
    values.push(parseInt(idUser));
    let result;
    try {
        result = await db.query(sql, values);
    } catch (err) {
        return null;
    }
    
    return result[0] && result.length > 0;
}

module.exports = {
    updateProfile
}