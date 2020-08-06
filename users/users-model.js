const db = require('../data/db-config');

module.exports = {
    add, 
    find, 
    findBy,
    findById
}

function find() {
    return db('users').orderBy('id');
}

function findBy(filter) {
    return db('users').where(filter).orderBy('id');
}

function findById(id) {
    return db('users').where({id}).first();
}

function add(user) {
    return db('users')
        .insert(user)
        .then(id => {
            return findById(id)
        })
        .catch(err => {
            console.log(err)
        })
}