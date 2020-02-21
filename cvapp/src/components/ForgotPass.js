import React from 'react';  
import "./ForgotPass.css";
import InputC from './InputC'
import Button from './Button'

class ForgotPass extends React.Component {
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
           <InputC type = "password" label = "Unesite email adresu" labelClassName = "fpLabel"/>
          </div>
          <div className = "col s12 m12 l12 xl12 resetPassBtnContainer">
            <Button text = "Resetuj lozinku" className = "resetPassBtn"/>
          </div>
        </div>
    );
  }
}

export default ForgotPass;