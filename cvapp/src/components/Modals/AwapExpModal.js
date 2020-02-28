import React from 'react';  
import './AwapExpModal.css'
import Button from '../Button'
import InputC from '../InputC'
import { Label, Input } from 'reactstrap';

let awapLeftList = [["Datum početka", "Datum završetka"], ["Naziv", "Uloga"], ["Naziv", "Organizator"]];
let awapRightList = [["Kompanija", "Funkcija"], ["Datum početka", "Datum završetka"], ["Datum početka", "Datum završetka"]];

//awap - AddWorkAndProject
class AwapExpModal extends React.Component {

  render(){
    return (
        <div>
            <div className = "col s12 m12 l5 xl5">
                {
                    awapLeftList[this.props.expId].map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "awapInput" labelClassName = "awapLabel"/>
                    ))
                }
            </div>
            <div className = "col offset-xl2 offset-l2 s12 m12 l5 xl5">
                {
                    awapRightList[this.props.expId].map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "awapInput" labelClassName = "awapLabel"/>
                    ))
                }
            </div>
            <div className = "col s12">
                <Label className = "descriptionLabel">Opis</Label>
                <Input type="textarea" name="text" className = "descriptionArea"/>
            </div>
            {this.props.expId === 2 ? 
            <div className="col s12 certAndAddBtnContaienr">
                <div className = "col s12 m12 l6 xl6">
                    <p>
                        <label>
                        <input type="checkbox" />
                        <span> Sertifikat </span>
                        </label>
                    </p> 
                </div>
                <div className = "col s12 m12 l6 xl6 awapRightAddBtnContainer">
                    <Button className = "modal-close awapRightAddBtn" text = "Dodaj"/>
                </div>
            </div> : <div className = "col s12 addBtnContainer">
                      <Button className = "modal-close addModal2Btn" text = "Dodaj"/>
                    </div>}
        </div>
    );
  }
}

export default AwapExpModal;