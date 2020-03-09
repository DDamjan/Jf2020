import React from 'react';  
import "./ChangePassword.css";
import InputC from './InputC'
import Button from './Button'
import {connect} from 'react-redux';    
import * as userActions from '../common/actions/userActions';
import './Registration.css'


class ChangePassword extends React.Component {

  constructor(props){
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      passwordError: false,
      passwordErrorMessage: ''
    }
  }

  onInputChange(data, index) {
    const info = this.state;
    info[index] = data;
    this.setState({info});
  }

  keyPressHandle(event) {
    if (event.key === 'Enter'){
      this.onSubmit()
    }
  }

  onSubmit(){

    if (this.state.newPassword !== this.state.confirmPassword){
      this.setState({passwordError: true, passwordErrorMessage: 'Uneli ste dve različite šifre' })
      return
    }
    if (this.state.newPassword.length < 8) {
      this.setState({passwordError: true, passwordErrorMessage: "Sifra mora sadrzati barem 8 karaktera"});
      return
    }
    let regex = /\d/g;  // Ovo je neka regularna ekspresija
    if (!regex.test(this.state.newPassword)) {
      this.setState({passwordError: true, passwordErrorMessage: 'Sifra mora posedovati barem jednu brojku'});
    }

    this.setState({
      passwordError: false
    })

    this.props.submit({
      token: this.props.match.params.token,
      password: this.state.newPassword
    });
  }

  render(){
    return (
        <div className = "row changePassContainer" onKeyPress={ e => this.keyPressHandle(e)}>
          <a href="/" className = "cpHome">
            <img src = "/photos/home.png" alt = "job fair"></img>
          </a>
          <div className = "col s12 cpHeaderContainer">
            <p className = "changePassH"> Promeni lozinku </p>
          </div>
          <div className = "col s12">
           <InputC type = "password" label = "Nova lozinka" labelClassName = "cpLabel"
            onSubmit={this.onInputChange} index={'newPassword'} value={this.state.newPassword}/>
            <InputC type = "password" label = "Ponovi lozinku" labelClassName = "cpLabel"
            onSubmit={this.onInputChange} index={'confirmPassword'} value={this.state.confirmPassword}/>
          </div>
          <div>
              {this.state.passwordError? 
                (<div className = "col s12 m12 l12 xl12">
                    <span className="ydha red-text text-darken-1"> {this.state.passwordErrorMessage} </span>
                </div>) 
                : null
            }
          </div>
          <div className = "col s12 m12 l12 xl12 changePassBtnContainer">
            <Button text = "Promeni lozinku" className = "changePassBtn" onClick={this.onSubmit}/>
          </div>
        </div>
    );
  }
}


const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit: credentials => dispatch(userActions.resetPassword(credentials)),
    setModalMessage: message => dispatch(userActions.setModalMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);