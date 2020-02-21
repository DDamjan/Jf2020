import React from 'react';  
import './Button.css'

class Button extends React.Component {

  render(){
    let className = "waves-effect waves-light btn button z-depth-2 " + this.props.className;
    return (
        <a data-target= {this.props.dataTarget} href= { this.props.href } className = {className} onClick = {this.props.onClick}> {this.props.text} </a>
    );
  }
}

export default Button;