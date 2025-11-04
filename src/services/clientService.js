const { Client } = require("../models");

async function registerClient(email) {
    if (!email) return null;
    return await Client.create({ email });
}

module.exports = { registerClient };