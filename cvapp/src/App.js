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
import ExperienceModal from './components/Modals/ExperienceModal'
import Button from './components/Button';
import AwapExpModal from './components/Modals/AwapExpModal'
import WocModal from './components/Modals/WocModal'
import LanguageExpModal  from './components/Modals/LanguageExpModal'
import OtherSkillsModal from './components/Modals/OtherSkillsModal'
import { Provider } from "react-redux";
import store from '../src/common/store/store';
import {connect} from 'react-redux';
import * as userActions from './common/actions/userActions';
import AccountVerification from './components/AccountVerification';
import ChangePassword from './components/ChangePassword';

let expList = ["Radno iskustvo", "Rad na projektu", "Stručno usavršavanje", "Rad na računaru",
 "Poznavanje jezika", "Ostale veštine"];
//lc - lowercase
 let lcexpList = ["radno iskustvo", "rad na projektu", "stručno usavršavanje", "rad na računaru",
 "poznavanje jezika", "ostale veštine"];



class App extends React.Component {

  constructor(props){
    super(props);
    this.setBestLogo = this.setBestLogo.bind(this);
    this.setBlur = this.setBlur.bind(this);
    this.setModal = this.setModal.bind(this);
    this.setExpModal = this.setExpModal.bind(this);
    this.setRegModal = this.setRegModal.bind(this);
    this.state = {
      isBestLogoShown: true,
      isBlured: false,
      isModalBlured: false,
      modal: 0,
      expModal: 0
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
    const expModaloptions = {
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
    M.Modal.init(this.expModal, expModaloptions);
    M.Modal.init(this.Modal3, modal1options);
    M.Modal.init(this.regModal, modal1options);
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

  setExpModal(expModal){
    this.setState({
      expModal: expModal
    });
  }

  setRegModal(){
    var regModal = M.Modal.getInstance(this.regModal);
    regModal.open();
  }
  
  render(){
    return (
        <BrowserRouter>
          <div className="row appContainer" >
            <div style = { {filter : this.state.isBlured ? "blur(6px)" : "blur(0px)"}} className="col s12 m6 l6 levo">
            <Route exact path = '/' render={() => <LeftImage className = "leftImage fullHeight"  src={"loginImg.jpg"}/>}/>
            <Route exact path = '/forgotPass' render={() => <LeftImage className = "leftImage fullHeight" src={"forgotPassImg.jpg"}/>}/>
            <Route exact path = '/changePassword/:token' render={() => <LeftImage className = "leftImage fullHeight" src={"forgotPassImg.jpg"}/>}/>
            <Route exact path = '/registration' render={() => <LeftImage className = "leftImage fullHeight" src={"regImg.jpg"}/>}/>
            <Route exact path = '/cvForma' render={() => <LeftImage className = "leftImage fullHeight" src={"cvFormaImg.jpg"}/>}/>
            <Route  path = '/verification/:token' ></Route>
            </div>
            <div style = { {filter : this.state.isBlured ? "blur(6px)" : "blur(0px)"}} className="col s12 m6 l6 desno">
              <Route exact path = '/' component =  {Login} />
              <Route path = '/forgotPass' render= { () => <ForgotPass setRegModal = {this.setRegModal} />}/>
              <Route path = '/registration' render={() => <Registration  setBestLogo={this.setBestLogo} setRegModal = {this.setRegModal}/>}/>
              <Route path = '/cvForma' render={() => <CVForma  setBestLogo={this.setBestLogo} setModal = {this.setModal}
              setExpModal = {this.setExpModal}/>}/>
              <Route path = '/changePassword/:token'component = {ChangePassword} />
              <Route path = '/verification/:token' render={ (props) => <AccountVerification  {...props}/>} ></Route>
              <div className = "col s12">
                {this.state.isBestLogoShown ? 
              <img src = "/photos/bestLogo.png" alt = "job fair" className = "bestLogo"></img> : null}
              </div>
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
                { this.state.modal === 2 && this.state.expModal !== 5 ? <Button text="+" className = "emAddBtn" 
                className = "modal-trigger" onClick={ () => {this.props.openModal(null)}} dataTarget = "expModal"/> : null }
                <div className = "col s12 m12 l12 xl12 modalHeaderContainer">
                    <h4> 
                      {this.state.modal === 0 ? "Dodaj srednje obrazovanje" : null}
                      {this.state.modal === 1 ? "Dodaj visoko obrazovanje"  : null}
                      {this.state.modal === 2 ? expList[this.state.expModal]  : null}
                    </h4>
                </div>
                {this.state.modal === 0 ? <HighSchoolModal /> : null}
                {this.state.modal === 1 ? <FacultyModal /> : null}
                {this.state.modal === 2 && expList[this.state.expModal] !== "Ostale veštine" ? <ExperienceModal 
                  openModal = {this.props.openModal}
                  expModal = {expList[this.state.expModal]}
                  /> : null}
                {/* {expList[this.state.expModal] === "Ostale veštine" ?  */}
                  {/* <OtherSkillsModal /> : null} */}
              </div>
            </div>
            <div 
            ref={Modal => {
              this.expModal = Modal;
            }}
            id="expModal" className="modal col offset-s1 s10 offset-m3 m6">
                <div className="modal-content">
                  <a href="#" className = "modal-close">
                    <img className = "cancelBtn" src = "photos/cancelImg.png" alt = "job fair"></img>
                  </a>
                    <div className = "col s12 m12 l12 xl12 modalHeaderContainer">
                      <h4> Dodaj {lcexpList[this.state.expModal]}</h4>
                    </div>
                    {this.state.expModal === 0 ? <AwapExpModal   addBtnClassName = "expAddBtn" expId = {0}/> : null}
                    {this.state.expModal === 1 ? <AwapExpModal addBtnClassName = "expAddBtn" expId = {1}/> : null}
                    {this.state.expModal === 2 ? <AwapExpModal  expId = {2}/> : null}
                    {this.state.expModal === 3 ? <WocModal addBtnClassName = "expAddBtn" expId = {3}/> : null}
                    {this.state.expModal === 4 ? <LanguageExpModal addBtnClassName = "expAddBtn" expId = {4}/> : null}
                    {/* {this.state.expModal === 5 ? <OtherSkillsModal addBtnClassName = "expAddBtn" expId = {5}/> : null} */}
                </div>
            </div>
            <div
              ref={Modal => {
                this.Modal3 = Modal;
              }}
              id="modal3"
              className="modal z-depth-5 col offset-s1 s10 offset-m3 m6 offset-l4 l4"
              style = { {filter : this.state.isModalBlured ? "blur(6px)" : "blur(0px)"}} >
              <div className="modal-content modal3Container">
                <a href="#" className = "modal-close">
                  <img className = "cancelBtn" src = "photos/cancelImg.png" alt = "job fair"></img>
                </a>
                <div className = "col s12 modalHeaderContainer">
                    <h4> Da li ste sigurni? </h4>
                </div>
                <div className = "col offset-s2 s8 yesNoContainer">
                  <Button className = "yesBtn modal-close" text = "Da" onClick={() => this.props.sendForDeletion(this.props.modalForDeletion)}/>
                  <Button className = "noBtn modal-close" text = "Ne"/>
                </div>
              </div>
            </div>
            <div
              ref={Modal => {
                this.regModal = Modal;
              }}
              id="regModal"
              className="modal z-depth-5 col offset-s1 s10 offset-m3 m6 offset-l4 l4">
              <div className="modal-content">
                      <h4>Obavestenje</h4>
                      <p>
                      {
                  this.props.modalMessage
                }
                      </p>
               
                <Button className = "modal-close" text="U redu" onClick={() => window.location.replace('/')}/>
              </div>
            </div>
          </div>

        </BrowserRouter>
    
    );
  }
}


const mapStateToProps = state => {
  return {
    modalForDeletion: state.modalForDeletion,
    modalMessage: state.modalMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: id => dispatch(userActions.openModal(id)),
    sendForDeletion: modal => dispatch(userActions.sendForDeletion(modal))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);


