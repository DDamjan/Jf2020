import React from 'react'
import './Login.css'
import Button from './Button'
import {connect} from 'react-redux';    
import PropTypes from 'prop-types';
import InputC from './InputC'
import {loginRequest} from '../common/actions/userActions';


class LoginComponent extends React.Component{

    constructor(props){
        super(props);
        this.onRegBtnClick = this.onRegBtnClick.bind(this);
        this.onLoginBtnClick = this.onLoginBtnClick.bind(this);
    }

    onRegBtnClick(){
        window.location.replace("/registration");
    }

    onLoginBtnClick(){
        window.location.replace("/cvForma");
        //this.props.submit({username: this.state.username , password: this.state.password});
    }

    onUserNameChange = username => {
        this.setState({username})
    }

    onChangePassword = password => {
        this.setState({password})
    }

    render(){
        return (
            <div className="row loginContainer">
                <div className="col s12">
                    <img src = "photos/job_fair_login.png" alt = "job fair" className = "jobFairLogo"></img>
                </div>
                <div className="col s12 inputContainer" >
                    <InputC type="email" label = "Email" labelClassName = "loginLabel" onSubmit={this.onUserNameChange} index={null} value={''}/>
                </div>
                <div className="col s12 inputContainer">
                    <InputC type="password" label = "Lozinka" labelClassName = "loginLabel" onSubmit={this.onChangePassword} index={null} value={''}/>
                </div>
                <div className="col s12 loginAndForgotPassContainer">
                    <div className = "col s12 m12 l6 xl6 loginBtnContainer">
                        
                        {this.props.proccessing ? ( <div className="preloader-wrapper small active">
                            <div className="spinner-layer spinner-white-only">
                                <div className="circle-clipper left">
                                <div className="circle"></div>
                                </div><div className="gap-patch">
                                <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                            </div>
                        </div>) : <Button text = "Uloguj se" onClick = {this.onLoginBtnClick}></Button>}
                       
                    </div>
                    <div className = "col s12 m12 l6 xl6 forgotPassLinkContainer">
                        <a href="/forgotPass" className = "forgotPassLink">Zaboravio si lozinku?</a>
                    </div>
                </div>
                {this.props.error? 
                    (<div className = "col s12 m12 l12 xl12">
                        <p className="ydha red-text text-darken-1"> Pogrešan email i/ili lozinka, pokušajte ponovo </p>
                    </div>) 
                    : null
                }
                <div className = "col s12 m12 l12 xl12">
                    <p className="ydha"> Nemaš nalog? </p>
                </div>
                <div className = "col s12 m12 l12 xl12 registerBtnContainer">
                    <Button text = "Registruj se!" onClick = {this.onRegBtnClick} ></Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        proccessing: state.proccessing,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit: credentials => {
            dispatch(loginRequest(credentials))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);