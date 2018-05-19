import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';
//import LoginPage from './Login';


const userList = ['Alice', 'Bob', 'Carol'];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      login: false,
      msgTo: '',
      message: '',
      msglog: '',
    };
    const loadMessage = (data) => {
      this.setState({ msglog: [...this.state.msglog, data] });
      if (data.from !== this.state.user && data.from !== this.state.msgTo) {
        alert(`new message from ${data.from} received`);
      }
      console.log(data.from);


      // if(this.state.msglog[this.state.msglog.lenght-1].from !== this.state.msgTo){
      // alert('New message from '+{this.state.msglog[this.state.msglog.lenght-1].from}+'...');
      // alert('new message')
      // }
    };
    const loadMessageLog = (data) => {
      console.log('loading chatlog');
      this.setState({ msglog: data });
    };

    this.socket = io('localhost:5000');
    this.socket.on('RECEIVE_MESSAGE', (data) => {
      if (this.state.login) {
        loadMessage(data);
      }
    });
    this.socket.on('RECEIVE_MESSAGE_LOG', (data) => {
      this.setState({ 
        msglog: data,
        login: true
      });
      loadMessageLog(data);
    });


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMsgToChange = this.handleMsgToChange.bind(this);
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
    this.setState({msglog: [...this.state.msglog, data]});

    if(this.state.msglog[this.state.msglog.lenght-1].from !== this.state.msgTo){
        //prompt('New message from '+{msglog[msglog.lenght-1].from}+'...');
        prompt('new message');
      }
  }
  


  render() {
    if (this.state.login === true) {
      const _list = [];
      for (let i = 0; i < userList.length; ++i) {
        if (userList[i] !== this.state.user) {
          _list.push(<option value={userList[i]}>{userList[i]}</option>);
        }
      }
      const _log = [];
      for (let i = 0; i < this.state.msglog.length; i++) {
        if (this.state.msglog[i].from === this.state.user && this.state.msglog[i].to === this.state.msgTo) { _log.push(<div>{this.state.msglog[i].from}: {this.state.msglog[i].message}</div>); } else if (this.state.msglog[i].from === this.state.msgTo && this.state.msglog[i].to === this.state.user) { _log.push(<div>{this.state.msglog[i].from}: {this.state.msglog[i].message}</div>); }
      }
      return (
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
      );
    }
    
    
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Choose User:
          <select value={this.state.user} onChange={this.handleChange}>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Carol">Carol</option>
          </select>
        </label>
        <input type="submit" value="Login" />
      </form>
    );
    
  }
}

export default App;
