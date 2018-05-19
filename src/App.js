import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';
import LoginPage from './Login';


const userList = ['Alice', 'Bob', 'Carol', 'Dave'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      login: false,
      msgTo: 'Messenger',
      message: '',
      log: '',
      newMsg: '',
    };
    const loadMessage = (data) => {
      this.setState({ chatLog: [...this.state.chatLog, data] });
      if (data.from !== this.state.user && data.from !== this.state.msgTo) {
        this.setState({ newMsg: [...this.state.newMsg, data.from] });
      }
    };

    this.socket = io('localhost:5000');
    this.socket.on('RECEIVE_MESSAGE', (data) => {
      if (this.state.login) {
        loadMessage(data);
      }
    });
    this.socket.on('MESSAGE_LOG', (data) => {
      this.setState({
        chatLog: data.log,
        user: data.usr,
        login: true,
      });
    });


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleSubmit(event) {
    // alert('User ' + this.state.user + ' login...');
    this.setState({ login: true });
    this.socket.emit('LOGIN');
    event.preventDefault();
  }

  handleOnClick(event) {
    this.setState({ msgTo: event.target.name });
    if (this.state.newMsg.includes(event.target.name)) {
      const index = this.state.newMsg.indexOf(event.target.name);
      if (index !== -1) {
        this.state.newMsg.splice(index, 1)
        this.setState({ newMsg: this.state.newMsg});
      }
    }
  }

  sendMessage(ev) {
    ev.preventDefault();
    if (this.message !== '' && this.msgTo !== 'Messenger') {
      this.socket.emit('SEND_MESSAGE', {
        from: this.state.user,
        to: this.state.msgTo,
        message: this.state.message,
      });
      this.setState({ message: '' });
    }
  }

  render() {
    if (this.state.login === true) {
      const contactList = [];
      for (let i = 0; i < userList.length; ++i) {
        if (userList[i] !== this.state.user) {
          if (userList[i] === this.state.msgTo) {
            contactList.push(<button onClick={this.handleOnClick} name={userList[i]} className="btn btn-secondary btn-lg btn-contact btn-block">{userList[i]}</button>);
          } else if (this.state.newMsg.includes(userList[i])) {
            contactList.push(<button onClick={this.handleOnClick} name={userList[i]} className="btn btn-outline-danger btn-lg btn-contact btn-block">{userList[i]}</button>);
          } else {
            contactList.push(<button onClick={this.handleOnClick} name={userList[i]} className="btn btn-outline-secondary btn-lg btn-contact btn-block">{userList[i]}</button>);
          }
        }
      }
      const _log = [];
      for (let i = 0; i < this.state.chatLog.length; i++) {
        if (this.state.chatLog[i].from === this.state.user && this.state.chatLog[i].to === this.state.msgTo) {
          _log.push(<p>{this.state.chatLog[i].from}: {this.state.chatLog[i].message}</p>);
        } else if (this.state.chatLog[i].from === this.state.msgTo && this.state.chatLog[i].to === this.state.user) {
          _log.push(<p>{this.state.chatLog[i].from}: {this.state.chatLog[i].message}</p>);
        }
      }
      return (
        <div className="container">
          <div className="row">
            <div className="col-4" />
            <div className="col-8">
              <h1>{this.state.msgTo}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="btn-group-vertical btn-block">
                {contactList}
              </div>
            </div>
            <div className="col-8 main ">
              <div className="row">
                {_log}
              </div>
              <div className="row bottom input-group">
                <input type="text" className="form-control" palceholder="Enter Message..." value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={this.sendMessage}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }


    return (
      <LoginPage socket={this.socket} />
    );
  }
}

export default App;
