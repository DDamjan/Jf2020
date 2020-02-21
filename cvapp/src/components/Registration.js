import React from 'react';  
import './Registration.css'
import InputC from "./InputC"
import Button from "./Button"
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { registerUser } from '../common/actions/userActions';
import {connect} from 'react-redux';


var registracija = [
    {
      naslov: "Osnovni podaci",
      labels: ["Ime*","Ime roditelja","Prezime*","Datum rođenja*"]
    },
    {
      naslov: "Kontakt",
      labels: ["Broj telefona*","LinkedIn"]
    },
    {
      naslov: "Prebivalište",
      labels: ["Država*","Grad*", "Adresa*"]
    },
    {
      naslov: "Boravište",
      labels: ["Država","Grad", "Adresa"]
    },
    {
      naslov: "Login informacije",
      labels: ["Email*","Lozinka*","Ponovi lozinku*"]
    },
  ];

class Registration extends React.Component {

  constructor(props){
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this._termsAndConditions = this._termsAndConditions.bind(this);
    let data = [];
    for(let i = 0; i < 19; i++){
      data[i] = '';
    }
    this.state = {
      termsAndConditions: false,
      currentRegInput: 0,
      steps: [1,2,3,4,5],
      passwordError: false,
      passwordErrorMessage: '',
      inputError: false,
      data // 0 - name, 1 - middleName, 2 - surname, 3 - Date of birth
               // 4 - phone number, 5 - linkedIn
               // 8 - Country, 9 - City, 10 - Adress  --- Permament residsence
               // 12 - Contry, 13 - City, 14 - Adress --- Current residence
               // 16 - email, 17- password, 18 - confirm password
    };
    this.props.setBestLogo(false);
  }

  _termsAndConditions(e){
    this.setState({termsAndConditions: e.target.checked})
  }

  formValidation() {
    if (this.state.currentRegInput === 0 ) {
      if (this.state.data[0]  === '' || this.state.data[2] === '' || this.state.data[3] === '' ){
        this.setState({inputError: true})
        return false;
      }
    }

    if (this.state.currentRegInput === 1 && this.state.data[4] === ''){
      this.setState({inputError: true})
      return false;
    }

    if (this.state.currentRegInput === 2) {
      if (this.state.data[8]  === '' || this.state.data[9] === '' || this.state.data[10] === '' ){
        this.setState({inputError: true})
        return false;
      }
    }

    if (this.state.currentRegInput === 4) {
      if (this.state.data[16]  === '' || this.state.data[17] === '' || this.state.data[18] === '' ){
        this.setState({inputError: true})
        return false;
      }

      if (!this.state.termsAndConditions) {
        // Jeste da nije password Error ali jednostavije je iskoristiti samo ovo
        this.setState({passwordError: true, passwordErrorMessage: "Morate se složiti sa uslovima korišćenja"})
        return false
      }
    }
    

    return true
  }

  onClickNext(e){
    e.preventDefault();

    if (this.formValidation()) {
      if (this.state.currentRegInput === 4) {
        if (this.state.data[17] !== this.state.data[18]){
          this.setState({passwordError: true, passwordErrorMessage: 'Uneli ste dve različite šifre, pokušajte ponovo' })
          return
        }
        // if (this.state.data[17].length < 8) {
        //   this.setState({passwordError: true, passwordErrorMessage: "Sifra mora sadrzati barem 8 karaktera"});
        //   return
        // }
        // let regex = /\d/g;  // Ovo je neka regularna ekspresija
        // if (!regex.test(this.state.data[17])) {
        //   this.setState({passwordError: true, passwordErrorMessage: 'Sifra mora posedovati barem jednu brojku'});
        // }
      
        //this.props.submit(this.state.data);
      }
  
      
  
      if(this.state.currentRegInput < 4){
        this.setState({
          inputError: false,
          currentRegInput: this.state.currentRegInput + 1
        });
      }
    }

    
  }

  onClickBack(e){
    e.preventDefault();


    if(this.state.currentRegInput > 0){
      this.setState({
        passwordError: false,
        inputError: false,
        currentRegInput: this.state.currentRegInput - 1
      });
    }
  }

  onInputChange(data, index) {
    const info = this.state.data;
    info[index] = data;
    this.setState({info});
  }

  render(){
    return (
        <div className = "row registrationContainer">
          <a href="/" className = "home">
            <img src = "photos/home.png" alt = "job fair"></img>
          </a>
          <div className = "col s12 m12 l12 xl12 regHeader">
            <h3>Registracija</h3>
          </div>
          <div className = "col s12 m12 l12 xl12">
            <div className = "progBarContainer">
              <ProgressBar
                      percent={this.state.currentRegInput * 25}
                      fillBackground='rgba($color: lightgrey, $alpha: 0.6)'
                    >
                    {
                      this.state.steps.map((step)=>(
                      <Step transition="scale" key = {step}>
                      {({ accomplished }) => (
                        <div className = "step"
                        style={ {color: accomplished ? 'white' : 'darkgrey',
                        backgroundColor: accomplished ? '#FAA519' : 'white'} }>{step}</div>
                      )
                    }
                    </Step>))}
              </ProgressBar>
            </div>
          </div>
          <div className = "col s12 m12 l12 xl12 regInputWrapper">
            <div className = "regInputContainer">
              <h4>{registracija[this.state.currentRegInput].naslov}</h4>
              <h5>(Polja označena sa * su obavezna)</h5>
              {registracija[this.state.currentRegInput].labels.map((label, index) => {
                  return (
                      <InputC label = {label} type = "text" key = {index + this.state.currentRegInput * 4} inputClassName = "regInput"
                      labelClassName = "regLabel" onSubmit={this.onInputChange} index={index + this.state.currentRegInput * 4}
                      value={this.state.data[index + this.state.currentRegInput * 4]}/>
                  );
              })}
              {this.state.inputError? <h4 className="red-text">Morate uneti sva obavezna polja</h4> : null}
              { this.state.currentRegInput === 4 ? 
                <p>
                  <label>
                    <input type="checkbox" onChange={this._termsAndConditions}/>
                    <span>Slažem se sa <a href = "#" > uslovima korišćenja </a> </span>
                  </label>
                  {this.state.passwordError? 
                    (<div className = "col s12 m12 l12 xl12">
                        <span className="ydha red-text text-darken-1"> {this.state.passwordErrorMessage} </span>
                    </div>) 
                    : null
                  }
                </p> : null
              }
            </div>
          </div>
          <div className = "col s12 m12 l12 xl12 buttonsWrapper">
            <div className = "buttonsContainer">
              { this.state.currentRegInput != 0 ? <Button className = "backButton" text = "Nazad" onClick = {this.onClickBack} /> : null }
              <Button className = "nextButton" text = {this.state.currentRegInput == 4 ? "Kreiraj nalog" : "Dalje" }  onClick = { this.onClickNext }/>
            </div>
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
        submit: data => {
            dispatch(registerUser(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Registration);