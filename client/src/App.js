import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/cookies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        <label>{this.state.response}</label>
        <form onSubmit={this.handleSubmit}>
          <label>Profile </label>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <textarea value={this.state.responseToPost} style={{ width: '50%', height: '70vh' }} />
      </div>
    );
  }
}

export default App;
