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
      msgTo: '',
      message: '',
      log: '',
    };
    const loadMessage = (data) => {
      this.setState({ chatLog: [...this.state.chatLog, data] });
      if (data.from !== this.state.user && data.from !== this.state.msgTo) {
        alert(`new message from ${data.from} received`);
      }
      console.log(data.from);
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


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMsgToChange = this.handleMsgToChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.loadMessage = this.loadMessage.bind(this);
  }


  handleChange(event) {
    this.setState({ user: event.target.value });
  }


  handleMsgToChange(event) {
    this.setState({ msgTo: event.target.value });
  }

  handleSubmit(event) {
    // alert('User ' + this.state.user + ' login...');
    this.setState({ login: true });
    this.socket.emit('LOGIN');
    event.preventDefault();
  }

  handleOnClick(event) {
    this.setState({ msgTo: event.target.name });
  }

  sendMessage(ev) {
    ev.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
      from: this.state.user,
      to: this.state.msgTo,
      message: this.state.message,
    });
    this.setState({ message: '' });
  }

  loadMessage(data) {
    this.setState({ chatLog: [...this.state.chatLog, data] });

    if (this.state.chatLog[this.state.chatLog.lenght - 1].from !== this.state.msgTo) {
      // prompt('New message from '+{chatLog[chatLog.lenght-1].from}+'...');
      prompt('new message');
    }
  }


  render() {
    if (this.state.login === true) {
      const header = (this.state.msgTo === '')?"Messenger":this.state.msgTo;
      const contactList = [];
      for (let i = 0; i < userList.length; ++i) {
        if (userList[i] !== this.state.user) {
          if (userList[i] === this.state.msgTo) {
            contactList.push(<button onClick={this.handleOnClick} name={userList[i]} className="btn btn-secondary btn-lg btn-block">{userList[i]}</button>,);
          } else {
            contactList.push(<button onClick={this.handleOnClick} name={userList[i]} className="btn btn-outline-secondary btn-lg btn-block">{userList[i]}</button>,);
          }
        }
      }
      const _log = [];
      for (let i = 0; i < this.state.chatLog.length; i++) {
        if (this.state.chatLog[i].from === this.state.user && this.state.chatLog[i].to === this.state.msgTo) { _log.push(<div>{this.state.chatLog[i].from}: {this.state.chatLog[i].message}</div>); } else if (this.state.chatLog[i].from === this.state.msgTo && this.state.chatLog[i].to === this.state.user) { _log.push(<div>{this.state.chatLog[i].from}: {this.state.chatLog[i].message}</div>); }
      }
      return (
        <div className="container">
          <div id="fixed-height-row" className="row">
            <div className="col-12">
              <h1>{header}</h1>
              <div className="row">
                <div className="col-2">
                  <div className="btn-group-vertical">
                    {contactList}
                  </div>
                </div>
                <div className="col-10">
                  {_log}
                </div>
              </div>
              <input type="text" placeholder="Message" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
              <br />
              <button onClick={this.sendMessage} >Send</button>

            </div>

          </div>
        </div>
        /*
        <div>
          <form>
            <select value={this.state.msgTo} onChange={this.handleMsgToChange}>
              {_list}
            </select>
          </form>
          <p>{this.state.user} sending message to {this.state.msgTo} ...</p>
          <div className="card-footer">
            <br />
            <input type="text" placeholder="Message" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
            <br />
            <button onClick={this.sendMessage} >Send</button>
            <br />
          </div>
          <div className="msg-log">
            {_log}
          </div>
        </div>
        */
      );
    }


    return (
      <LoginPage socket={this.socket} />
    );
  }
}

export default App;
