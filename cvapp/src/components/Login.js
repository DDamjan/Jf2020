import React from 'react'
import './Login.css'
import Button from './Button'
import {connect} from 'react-redux';    
import InputC from './InputC'
import {loginRequest} from '../common/actions/userActions';
import Spinner from './Spinner';

class LoginComponent extends React.Component{

    constructor(props){
        super(props);
        this.onRegBtnClick = this.onRegBtnClick.bind(this);
        this.onLoginBtnClick = this.onLoginBtnClick.bind(this);
        this.keyPressHandle = this.keyPressHandle.bind(this);
        this.state = {
            email: '',
            password: '',
            show: false,
        }
    }

    componentDidMount(){
        setTimeout( () => {
            this.setState({show: true})
        }, 500)
        if (sessionStorage.getItem('id') !== null){
            window.location.replace('/cvForma')
        }
    }

    onRegBtnClick(){
        window.location.replace("/registration");
    }

    onLoginBtnClick(){
        this.props.submit({email: this.state.email , password: this.state.password});
    }

    onUserNameChange = email => {
        this.setState({email})
    }

    onChangePassword = password => {
        this.setState({password})
    }

    keyPressHandle(event){
        if (event.key === 'Enter'){
          this.onLoginBtnClick();
        }
      }

    render(){
        return (
            this.state.show?
            <div className="row loginContainer" onKeyPress={this.keyPressHandle}>
                <div className="col s12">
                    <img src = "photos/job_fair_login.png" alt = "job fair" className = "jobFairLogo fullWidth"></img>
                </div>
                <div className="col s12 inputContainer" >
                    <InputC type="email" label = "Email" labelClassName = "loginLabel" onSubmit={this.onUserNameChange} index={null} value={''}/>
                </div>
                <div className="col s12 inputContainer">
                    <InputC type="password" label = "Lozinka" labelClassName = "loginLabel" onSubmit={this.onChangePassword} index={null} value={''}/>
                </div>
                <div className="col s12 loginAndForgotPassContainer">
                    <div className = "col s12 m12 l6 xl6 loginBtnContainer">
                        
                        {this.props.proccessing ? <Spinner class="floatLeft"></Spinner> : <Button text = "Ulogujte se" onClick = {this.onLoginBtnClick}></Button>}
                       
                    </div>
                    <div className = "col s12 m12 l6 xl6 forgotPassLinkContainer">
                        <a href="/forgotPass" className = "forgotPassLink">Zaboravili ste lozinku?</a>
                    </div>
                </div>
                {this.props.error? 
                    (<div className = "col s12 m12 l12 xl12">
                        <p className="ydha red-text text-darken-1"> {this.props.errorMessage} </p>
                    </div>) 
                    : null
                }
                <div className = "col s12 m12 l12 xl12">
                    <p className="ydha"> Nemate nalog? </p>
                </div>
                <div className = "col s12 m12 l12 xl12 registerBtnContainer">
                    <Button text = "Registrujte se!" onClick = {this.onRegBtnClick} ></Button>
                </div>
            </div>
            : null
            
        );
    }
}

const mapStateToProps = state => {
    return {
        proccessing: state.proccessing,
        error: state.error,
        errorMessage: state.errorMessage
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