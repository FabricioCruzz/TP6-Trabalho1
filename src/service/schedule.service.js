let database = []

const getAll = () => database

const create = schedule => {
    // database.push(schedule)
    database = schedule
}

module.exports = {
    getAll,
    create
}