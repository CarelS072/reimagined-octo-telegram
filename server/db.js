const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)
const devDB = connection

module.exports = {

}

function getJournal (db = connection) {
  return db('journal').select()
}

function getJournalEntry (id, db = connection) {
  return db('journal').where('id', id).first()
}
function getRandom (arrLength, id) {
  return Math.floor(Math.random() * Math.floor(arrLength))
} 

function getTarget (id, db = connection) {
  let i = id
  while ((i === 0) || (i === id)) {
    i = getRandom(9)
  }
  return db('journal').where('id', i).first()
}

function getAct (db = connection) {
  let i = getRandom(16)
  return db('journal').where('id', i).first()
}

