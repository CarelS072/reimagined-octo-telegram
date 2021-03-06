
exports.up = (knex, Promise) => {
  return knex.schema.createTable('journal', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.date('created_at').defaultTo(knex.fn.now())
    table.date('created_at').defaultTo(knex.fn.now())
    table.json('profile')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('journal')
} 

