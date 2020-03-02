import React from 'react';  
import './Registration.css'
import InputC from "./InputC"
import Button from "./Button"
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { registerUser, setModalMessage } from '../common/actions/userActions';
import {connect} from 'react-redux';
import M from "materialize-css";
import Spinner from './Spinner';

var registracija = [
    {
      naslov: "Osnovni podaci",
      labels: ["Ime*","Ime roditelja","Prezime*",{ type: "date", label: "Datum rođenja*"}]
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
      labels: ["Email*",{type: "password", label: "Lozinka*"},{type: "password", label: "Ponovi lozinku*"}]
    },
  ];

class Registration extends React.Component {

  constructor(props){
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickStep = this.onClickStep.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this._termsAndConditions = this._termsAndConditions.bind(this);
    this.keyPressHandle = this.keyPressHandle.bind(this);
    let data = [];
    for(let i = 0; i < 19; i++){
      data[i] = "";
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

  formValidation(array) {
    if (this.state.currentRegInput === 0 ) {
      if (this.state.data[0]  === '' || this.state.data[2] === '' || this.state.data[3] === '' ){
        this.setState({inputError: true})
        return false;
      }
    }

    if ((this.state.currentRegInput === 1 || array.includes(1)) && this.state.data[4] === ''){
      this.setState({inputError: true})
      return false;
    }

    if (this.state.currentRegInput === 2 || array.includes(2)) {
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

    //TODO: funkcija koja se poziva kad treba registerModal da se otvori, 
    //to samo treba da se ubaci na odgovarajuce mesto u ovoj funkciji
    
    
    if (this.formValidation([])) {
      if (this.state.currentRegInput === 4) {
        if (this.state.data[17] !== this.state.data[18]){
          this.setState({passwordError: true, passwordErrorMessage: 'Uneli ste dve različite šifre, pokušajte ponovo' })
          return
        }
        if (this.state.data[17].length < 8) {
          this.setState({passwordError: true, passwordErrorMessage: "Šifra mora sadrzati barem 8 karaktera"});
          return
        }
        let regex = /\d/g;  // Ovo je neka regularna ekspresija
        if (!regex.test(this.state.data[17])) {
          this.setState({passwordError: true, passwordErrorMessage: 'Šifra mora posedovati barem jednu brojku'});
          return;
        }

        let emailRegex = /\S+@\S+\.\S+/g;

        if (!emailRegex.test(this.state.data[16])){
          // Koristim "passwordError" jer je prostije samo njega da ubacim
          this.setState({passwordError: true, passwordErrorMessage: 'Uneli ste neispravnu email adresu'})
          return;
        }


        this.setState({
          passwordError: false
        })

        this.props.submit(this.state.data);
        this.props.setModalMessage(`Hvala vam na registraciji, da biste se ulogovali morate prvo aktivirati svoj nalog preko unetog email-a`);
        this.props.setRegModal();
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

  keyPressHandle(event){
    if (event.key == 'Enter'){
      this.onClickNext(event);
    }
  }

  onClickStep(step){
    let between = [];

    if (this.state.currentRegInput < step) {
      let pomStep = step;
      while (this.state.currentRegInput !== pomStep) {
        between.push(pomStep - 1);
        pomStep--;
      }
    }

    if(this.formValidation(between) || this.state.currentRegInput > step){
      this.setState({
        currentRegInput: step,
        inputError: false
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
        <div className = "row registrationContainer" onKeyPress={this.keyPressHandle}>
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
                        onClick = {() => this.onClickStep(step - 1)}
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
                      <InputC label = {label.type === undefined ? label : label.label} 
                        type = {label.type === undefined? "text" : label.type}  
                        key = {index + this.state.currentRegInput * 4} 
                        inputClassName = "regInput"
                        labelClassName = "regLabel" 
                        onSubmit={this.onInputChange} index={index + this.state.currentRegInput * 4}
                        value={this.state.data[index + this.state.currentRegInput * 4]}/>
                  );
              })}
              {this.state.inputError? <h4 className="red-text">Morate uneti sva obavezna polja</h4> : null}
              { this.state.currentRegInput === 4 ? 
                <p>
                  <label>
                    <input type="checkbox" onChange={this._termsAndConditions}/>
                    <span>Slažem se sa <a href = "http://jobfairnis.rs/new/obavestenje-o-obradi-podataka-o-licnosti/" target="_blank" > uslovima korišćenja </a> </span>
                  </label>
                  {this.state.passwordError? 
                    (<div className = "col s12 m12 l12 xl12">
                        <span className="ydha red-text text-darken-1"> {this.state.passwordErrorMessage} </span>
                    </div>) 
                    : null
                  }
                  {
                    this.props.errorMessage !== null?
                    (<div className = "col s12 m12 l12 xl12">
                    <span className="ydha red-text text-darken-1"> {this.props.errorMessage} </span>
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
              {this.props.proccessing? <Spinner class="floatRight"/>:  
              <Button className = "nextButton" text = {this.state.currentRegInput == 4 ? "Kreiraj nalog" : "Dalje" }  onClick = { this.onClickNext }/>
              }
            </div>
          </div>
        </div>
    );
  }
}


const mapStateToProps = state => {
    return {
      errorMessage: state.errorMessage,
      proccessing: state.proccessing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit: data => {
            dispatch(registerUser(data))
        },
        setModalMessage: message => dispatch(setModalMessage(message))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Registration);