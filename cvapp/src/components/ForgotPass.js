import React from 'react';  
import "./ForgotPass.css";
import InputC from './InputC'
import Button from './Button'
import {connect} from 'react-redux';
import * as userActions from '../common/actions/userActions';

class ForgotPass extends React.Component {

  constructor(props){
    super(props)
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      inputData: ''
    }
    
  }

  onInputChange(data, index){
    this.setState({
      inputData: data
    })
  }

  onSubmit(){

    this.props.submit(this.state.inputData);
    this.props.setModalMessage('Na unetoj email adresi ćete dobili link za resetovanje sifre, ukoliko ne dobijete mail proverite spam folder i folder neželjene poruke. Ukoliko uopšte niste dobili mail nakon 10 minuta pošaljite zahtev ponovo')
    this.props.setRegModal();
  }

  render(){
    return (
        <div className = "row forgotPassContainer">
          <a href="/" className = "home">
            <img src = "photos/home.png" alt = "job fair"></img>
          </a>
          <div className = "col s12 fpHeaderContainer">
            <p className = "forgotPassQ"> Zaboravljena lozinka? </p>
          </div>
          <div className = "col s12">
           <InputC type = "text" label = "Unesite email adresu" labelClassName = "fpLabel"
            onSubmit={this.onInputChange} index={null} value={this.state.inputData}/>
          </div>
          <div className = "col s12 m12 l12 xl12 resetPassBtnContainer">
            <Button text = "Resetuj lozinku" className = "resetPassBtn" onClick={this.onSubmit}/>
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
    submit: email => dispatch(userActions.forgotPassword(email)),
    setModalMessage: message => dispatch(userActions.setModalMessage(message))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPass);