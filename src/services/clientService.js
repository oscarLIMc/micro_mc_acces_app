const { Client } = require("../models");

async function registerClient(email) {
    if (!email) return null;
    return await Client.create({ email });
}

async function getClientByEmail(email) {
    return await Client.findOne({ where: { email } });
}

module.exports = { registerClient, getClientByEmail };