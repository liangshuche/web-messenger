import React, { Component } from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);

    this.socket = this.props.socket;//io('localhost:5000');
  }
  handleOnClick(ev) {
    ev.preventDefault();
    this.socket.emit('LOGIN', ev.target.name);
  }
  render() {
    return (
      <div>
        <h1>Select User</h1>
        <button onClick={this.handleOnClick} name="Alice">Alice</button>
        <button onClick={this.handleOnClick} name="Bob">Bob</button>
        <button onClick={this.handleOnClick} name="Carol">Carol</button>
        <button onClick={this.handleOnClick} name="Dave">Dave</button>
      </div>
      // <button onClick=>Bob</button>
    );
  }
}

export default LoginPage;