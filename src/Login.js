import React, { Component } from 'react';
import { Button , ButtonGroup , PageHeader, Label, Panel} from 'react-bootstrap';

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
const labelStyles = {textAlign: "center"};
const footerStyles = {textAlign: "center", fontSize: 15};
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
        <div className="well" style={wellStyles}>
          <h1 style={{textAlign: "center"}}>Select User</h1>
          <br/>
          <Button onClick={this.handleOnClick} name="Alice" bsSize="lg" block>Alice</Button>
          <Button onClick={this.handleOnClick} name="Bob" bsSize="lg" block>Bob</Button>
          <Button onClick={this.handleOnClick} name="Carol" bsSize="lg" block>Carol</Button>
          <Button onClick={this.handleOnClick} name="Dave" bsSize="lg" block>Dave</Button>
          
        </div>
        <p style={footerStyles}>Messenger-App</p>
      </div>
      // <button onClick=>Bob</button>
    );
  }
}

export default LoginPage;