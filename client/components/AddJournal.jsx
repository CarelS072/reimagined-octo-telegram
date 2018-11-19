import React from 'react'

export class AddJournal extends React.Component {
  state = {
    title: '',
    date: '',
    content : "Insert content here",
    facebook : {
    title : "Insert title here",
    date : "Can I grab the date from the created_at column here?",
    content : "Insert content here"
    },
    fitbit : {
      steps : "100"
    }
  }

  changeHandler(){

  }

  onSubmit(){

  }


  render() {
    return (
      <div>
        <h3>General</h3>
        <input type='text' placeholder={this.state.title} />
        <input type='date' placeholder={this.state.date} />
        <h3>Facebook</h3>
        <input type='text' placeholder={this.state.facebook.title} />
        <input type='text' placeholder={this.state.facebook.date} />
        <input type='text' placeholder={this.state.facebook.content} />
        <input type='text' placeholder={this.state.content} />
        <h3>Fitbit</h3>
        <input type='text' placeholder={this.state.fitbit.steps} />
        <input type='text' placeholder={this.state.title} />
        <input type='text' placeholder={this.state.title} />

      </div>
    )
  }
}

export default AddJournal
