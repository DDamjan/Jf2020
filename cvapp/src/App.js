import React from 'react';
import './App.css';
import LeftImage from './components/LeftImage'
import Login from './components/Login'
import ForgotPass from "./components/ForgotPass"
import Registration from "./components/Registration"
import CVForma from "./components/CVForma/CVForma"
import { BrowserRouter, Route } from 'react-router-dom'
import M from "materialize-css";
import HighSchoolModal from './components/Modals/HighSchoolModal'
import FacultyModal from './components/Modals/FacultyModal'

import {Provider } from "react-redux";
import store from '../src/common/store/store';


class App extends React.Component {

  constructor(props){
    super(props);
    this.setBestLogo = this.setBestLogo.bind(this);
    this.setBlur = this.setBlur.bind(this);
    this.setModal = this.setModal.bind(this);
    this.state = {
      isBestLogoShown: true,
      isBlured: false,
      isModalBlured: false,
      modal: 0
    }
  }

  componentDidMount() {
    const modal1options = {
      onOpenStart: () => {
        this.setState({
          isBlured: true
        });
      },
      onCloseStart: () => {
        this.setState({
          isBlured: false
        });
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    const modal2options = {
      onOpenStart: () => {
        this.setState({
          isModalBlured: true
        });
      },
      onCloseStart: () => {
        this.setState({
          isModalBlured: false
        });
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal1, modal1options);
    M.Modal.init(this.Modal2, modal2options);
  }

  setBestLogo(isShown){
    this.setState({
      isBestLogoShown: isShown
    });
  }

  setBlur(value){
    this.setState({
      isBlured: value
    });
  }

  setModal(modal){
    this.setState({
      modal: modal
    });
  }
  
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="row appContainer" >
            <div style = { {filter : this.state.isBlured ? "blur(6px)" : "blur(0px)"}} className="col s12 m6 l6 levo">
              <Route exact path = '/' render={() => <LeftImage className = "leftImage"  src={"loginImg.jpg"}/>}/>
              <Route exact path = '/forgotPass' render={() => <LeftImage className = "leftImage" src={"forgotPassImg.jpg"}/>}/>
              <Route exact path = '/registration' render={() => <LeftImage className = "leftImage" src={"regImg.jpg"}/>}/>
              <Route exact path = '/cvForma' render={() => <LeftImage className = "leftImage" src={"cvFormaImg.jpg"}/>}/>
            </div>
            <div style = { {filter : this.state.isBlured ? "blur(6px)" : "blur(0px)"}} className="col s12 m6 l6 desno">
              <Route exact path = '/' component =  {Login} />
              <Route path = '/forgotPass' component = {ForgotPass}/>
              <Route path = '/registration' render={() => <Registration  setBestLogo={this.setBestLogo}/>}/>
              <Route path = '/cvForma' render={() => <CVForma  setBestLogo={this.setBestLogo} setModal = {this.setModal}/>}/>
              {this.state.isBestLogoShown ? 
              <img src = "photos/bestLogo.png" alt = "job fair" className = "bestLogo"></img> : null}
            </div>
            <div
              ref={Modal => {
                this.Modal1 = Modal;
              }}
              id="modal1"
              className="modal z-depth-5"
              style = { {filter : this.state.isModalBlured ? "blur(6px)" : "blur(0px)"}} >
              <div className="modal-content">
                <a href="#" className = "modal-close">
                  <img className = "cancelBtn" src = "photos/cancelImg.png" alt = "job fair"></img>
                </a>
                <div className = "col s12 m12 l12 xl12 modalHeaderContainer">
                    <h4> 
                      {this.state.modal === 0 ? "Dodaj srednje obrazovanje" : null}
                      {this.state.modal === 1 ? "Dodaj visoko obrazovanje"  : null}
                    </h4>
                </div>
                {this.state.modal === 0 ? <HighSchoolModal /> : null}
                {this.state.modal === 1 ? <FacultyModal /> : null}
              </div>
            </div>
            <div 
            ref={Modal => {
              this.Modal2 = Modal;
            }}
            id="modal2" className="modal">
                <div className="modal-content">
                    <h4>Modal 2  header</h4>
                    <p>Another text...</p>
                </div>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
