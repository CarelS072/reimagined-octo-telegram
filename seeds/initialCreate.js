const journalTemplate = {
  "facebook" : {
  "title" : "Insert title here",
  "date" : "Can I grab the date from the created_at column here?",
  "content" : "Insert content here"
  },
  "fitbit" : {
    "steps" : "100"
  }
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('journal').del()
    .then(function () {
      // Inserts seed entries
      return knex('journal').insert([
        {title: 'test', journalPage: journalTemplate},
        {title: 'test', journalPage: journalTemplate},
        {title: 'test', journalPage: journalTemplate}
      ])
    })
}

