const Sequelize = require("sequelize");
const _conn = new Sequelize(process.env.DATABASE_URL);

const Users = _conn.define('user', {
    name: Sequelize.STRING
})

const sync = ()=>{
    return _conn.sync({force:true})
};

const seed = ()=>{
    return Promise.all([
        Users.create({name: "Larry"}),
        Users.create({name: "Moe"}),
        Users.create({name: "Curly"}),
        Users.create({name: "Shemp"})
    ]);
}

module.exports = {
    sync,
    seed,
    models: {
        Users
    }
}