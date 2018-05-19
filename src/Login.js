import React, { Component } from 'react';
import io from 'socket.io-client';

const userList = ['Alice', 'Bob', 'Carol'];
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);

    this.socket = io('localhost:5000');
  }
  handleOnClick(ev) {
    this.socket.emit('LOGIN', ev);
  }
  render() {
    return (
      <button onClick={this.handleOnClick('Alice')}>Alice</button>
      // <button onClick=>Bob</button>
    );
  }
}

export default LoginPage;
