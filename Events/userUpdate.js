const sql = require(`../config/Database`)

module.exports = {
    name: 'userUpdate',
    async execute(oldUser, newUser) {
        console.log(`User Updated:\n${oldUser}, ${newUser}`)
    }
};
