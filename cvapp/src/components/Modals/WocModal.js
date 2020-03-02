import React from 'react';  
import './WocModal.css'
import InputC from '../InputC'
import Button from '../Button'
import M from "materialize-css";
import Dropdown from  '../DropDown'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

//Woc - work on computer

let wocDdItems = ["Početni", "Srednji", "Viši", "Napredni"];

const initialState= {naziv: '', nivo: 'Izaberite nivo', sertifikat: ''}
class WocModal extends React.Component {

    constructor(props){
        super(props);
        this.onWocLvlClicked = this.onWocLvlClicked.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.modalSubmit = this.modalSubmit.bind(this);
        this.state = {
          wocLvl: "Izaberite nivo",
          inputData: {...initialState}
        }
    }
    
    onWocLvlClicked(txt){
        this.setState({
            wocLvl: txt
        });
    }

    onInputChange(data, index) {
 
        const info =  this.state.inputData;
        info[index] = data;
        this.setState({inputData: info});
    }

    modalSubmit(){
        const data = {
            ...this.state.inputData,
            fieldID: this.props.modalId,
            id: this.props.modalId,
            userID: sessionStorage.getItem("id")
        }

        const forServer = {
            field: this.props.experienceModal,
            payload: data
        }

        this.props.submit(forServer);
        this.setState({inputData: {...initialState}})
    }

    componentDidUpdate(prevProps) {

        if(this.props.modalId !== prevProps.modalId && this.props.modalId !== null) {
            this.setState({
                inputData: {...this.props.wocEntities.find( el => el.id === this.props.modalId)}
            })

            return
        }

        if(this.props.modalId !== prevProps.modalId && this.props.modalId === null) {
            this.setState({
                inputData: {...initialState}
            })

            return 
        }
    } 

    componentDidMount() {
        let dropdown = document.querySelectorAll('.dropdown-trigger');
        let options = {
            inDuration: 300, 
            outDuration: 300,
            coverTrigger: false,
            hover: false
        };
        M.Dropdown.init(dropdown, options);

        if (this.props.modalId !== null) {
            this.setState({
                inputData: {...this.props.wocEntities.find( el => el.id === this.props.modalId)}
            })


        }
    }

    render(){
        return (
            <div className = "col s12">
                <div className = "col offset-l3 l6 m12 s12">
                    <InputC label = "Naziv" inputClassName = "wocInput" onSubmit={this.onInputChange} index={'naziv'}
                        value={this.state.inputData.naziv}/>
                </div>
                <div className = "col offset-l3 l6 m12 s12">
                    <Dropdown items = {wocDdItems} label = "Nivo" onChange={this.onInputChange} value={this.state.inputData.nivo} index={'nivo'}/>
                </div>
                <div className = "col offset-l3 l6 m12 s12">
                    <InputC label = "Sertifikat" inputClassName = "wocInput" onSubmit={this.onInputChange} index={'sertifikat'}
                        value={this.state.inputData.sertifikat}/>
                </div>
                <div className = "col s12 addBtnContainer">
                      <Button className = "modal-close addExpModalBtn" text = "Dodaj" onClick={this.modalSubmit}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        experienceModal: state.experienceModalSelected,
        modalId: state.modalId,
        wocEntities: state.iskustvo.radNaRacunaru
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {    
        submit: data => dispatch(userActions.submitFromModal(data))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(WocModal);
