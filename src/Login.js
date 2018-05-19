import React, { Component } from 'react';


const footerStyles = { textAlign: 'center', fontSize: 15 };
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);

    this.socket = this.props.socket;// io('localhost:5000');
  }
  handleOnClick(ev) {
    ev.preventDefault();
    this.socket.emit('LOGIN', ev.target.name);
  }
  render() {
    return (
      <div className="container" style={{ flex: 0.2 }}>
        <br />
        <h1 className="display-4">Select User</h1>
        <br />
        <button onClick={this.handleOnClick} name="Alice" className="btn btn-outline-secondary btn-lg btn-block">Alice</button>
        <button onClick={this.handleOnClick} name="Bob" className="btn btn-outline-secondary btn-lg btn-block">Bob</button>
        <button onClick={this.handleOnClick} name="Carol" className="btn btn-outline-secondary btn-lg btn-block">Carol</button>
        <button onClick={this.handleOnClick} name="Dave" className="btn btn-outline-secondary btn-lg btn-block">Dave</button>
        <button onClick={this.handleOnClick} name="Eve" className="btn btn-outline-secondary btn-lg btn-block">Eve</button>        
        <br />
        <p style={footerStyles}>-Messenger-App-</p>
      </div>
      // <button onClick=>Bob</button>
    );
  }
}

export default LoginPage;
