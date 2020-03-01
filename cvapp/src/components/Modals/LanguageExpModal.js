import React from 'react';  
import InputC from '../InputC'
import Button from '../Button'
import './LanguageExpModal.css'
import Dropdown from  '../DropDown'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

//lem - LanguageExpModal

let lemLeftList = ["Jezik", "Nivo govora", "Nivo razumevanja"];
let lemRightList = ["Sertifikat", "Nivo čitanja", "Nivo pisanja"];
const dataKeys = ['jezik', 'nivoGovora', 'nivoRazumevanja', 'sertifikat', 'nivoCitanja', 'nivoPisanja']

let levels = ["Početni", "Srednji", "Viši", "Napredni"];

const initialState= {
    jezik: '',
    nivoGovora: '',
    nivoRazumevanja: '',
    sertifikat: '',
    nivoCitanja: '',
    nivoPisanja: ''
}

class LanguageExpModal extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            inputData: {...initialState}
        }
    }

    componentDidMount(){

    }

    onInputChange(data, index) {
       
        const info = this.state.inputData;
        info[index] = data;
        this.setState({inputData: info});
    }

    modalSubmit(){

        const data = {...this.state.inputData};
        data['field'] = 'poznavanjeJezika';
        data['id'] = sessionStorage.getItem("id");
        data['modalId'] = this.props.modalId;

        this.props.submit(data);
        this.setState({
            inputData: {...initialState}
        })
    }

  render(){
    return (
        <div>
            <div className = "col s12 m5 l5 xl5">
                {
                    lemLeftList.map((el, index)=>{
                        if(index === 0){
                            return (<InputC key = {index} label = {el} inputClassName = "lemInput"
                                    onSubmit={this.onInputChange.bind(this)} index={dataKeys[index]}
                                    value={this.state.inputData[`${dataKeys[index]}`]}/>);
                        } else {
                            return (<Dropdown id = {index} key = {index} items = {levels} label = {el}
                                    onChange={ this.onInputChange.bind(this)} index={dataKeys[index]}/>);
                        }
                        
                    })
                }
            </div>
            <div className = "col offset-xl2 offset-l2 offset-m2 s12 m5 l5 xl5">
                {
                    lemRightList.map((el, index)=>{
                        if(index === 0){
                            return (<InputC key = {index} label = {el} inputClassName = "lemInput"
                                    onSubmit={this.onInputChange.bind(this)} index={dataKeys[index+3]}
                                    value={this.state.inputData[`${dataKeys[index+3]}`]}/>);
                        } else {
                            //10 je samo radnom broj koji sam dodao jer svaki od dropdown-ova mora da ime jedinstven id
                            return (<Dropdown id = {index + 10} key = {index + 10} items = {levels} label = {el}
                                onChange={ this.onInputChange.bind(this)} index={dataKeys[index +3]}/>);
                        }
                        
                    })
                }
            </div>
            <div className = "col s12 addBtnContainer">
                <Button className = "modal-close addExpModalBtn" text = "Dodaj"
                    onClick={this.modalSubmit.bind(this)}/>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        modalId: state.modalId,
        languageEntities: state.iskustvo.poznavanjeJezika
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {    
        submit: data => dispatch(userActions.submitFromModal(data))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(LanguageExpModal);
