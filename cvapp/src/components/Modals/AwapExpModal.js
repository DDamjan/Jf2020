import React from 'react';  
import './AwapExpModal.css'
import Button from '../Button'
import InputC from '../InputC'
import { Label, Input } from 'reactstrap';
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

let awapLeftList = [["Datum početka", "Datum završetka"], ["Naziv", "Uloga"], ["Naziv", "Organizator"]];
let awapRightList = [["Kompanija", "Funkcija"], ["Datum početka", "Datum završetka"], ["Datum početka", "Datum završetka"]];
const dataKyes = [['datumPocetka', 'datumZavrsetka', 'kompanija', 'funkcija'],
                  ['naziv', 'uloga', 'datumPocetka', 'datumZavrsetka'],
                  ['naziv', 'organizator', 'datumPocetka', 'datumZavrsetka', 'sertifikat']]
const modalField = ['radnoIskustvo', 'radNaProjektu', 'strucnoUsavrsavanje']

const initialState = ['', '', '', '', '', ''] //6. element u ovom nizu je namenjen za opis

//awap - AddWorkAndProject
class AwapExpModal extends React.Component {


    constructor(props){
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.submitModal = this.submitModal.bind(this);

        this.state = {
            inputData: [...initialState]
        }
    }

    onInputChange(data, index) {
       
        const info = this.state.inputData;
        info[index] = data;
        this.setState({inputData: info});
    }

    submitModal(){
        const data = {}
        dataKyes[this.props.expId].map((el, index) => {
            data[el] = this.state.inputData[index]
        })
        data['opis'] = this.state.inputData[5];

        data['modalId'] = this.props.modalId;
        data['id'] = sessionStorage.getItem('id');
        data['field']= modalField[this.props.expId];

        this.props.submit(data)
        this.setState({inputData: [...initialState]})
    }

  render(){
    return (
        <div>
            <div className = "col s12 m12 l5 xl5">
                {
                    awapLeftList[this.props.expId].map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "awapInput" labelClassName = "awapLabel"
                        onSubmit={this.onInputChange} index={index} value={this.state.inputData[index]}/>
                    ))
                }
            </div>
            <div className = "col offset-xl2 offset-l2 s12 m12 l5 xl5">
                {
                    //+2 za offset zbog strana
                    awapRightList[this.props.expId].map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "awapInput" labelClassName = "awapLabel"
                        onSubmit={this.onInputChange} index={index +2} value={this.state.inputData[index +2]}/>
                    ))
                }
            </div>
            <div className = "col s12">
                <Label className = "descriptionLabel">Opis</Label>
                <Input type="textarea" name="text" className = "descriptionArea"
                onChange={(e) => this.onInputChange(e.target.value, 5)} value={this.state.inputData[5]}/>
            </div>
           
            <div className="col s12 certAndAddBtnContaienr">
                {
                    this.props.expId === 2 ? 
                    <div className = "col s12 m12 l6 xl6">
                    <p>
                        <label>
                        <input type="checkbox" />
                        <span> Sertifikat </span>
                        </label>
                    </p> 
                    </div> : null
                }
                
                <div className = "col s12 m12 l6 xl6 awapRightAddBtnContainer">
                    <Button className = "modal-close awapRightAddBtn" text = "Dodaj"
                    onClick={this.submitModal}/>
                </div>
            </div> 
        </div>
    );
  }
}


const mapStateToProps = state => {
    return {
        modalId: state.modalId
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      submit: data => dispatch(userActions.submitFromModal(data))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AwapExpModal);
