import React from 'react';  
import './FacultyModal.css'
import Button from '../Button'
import InputC from '../InputC'

let facLeftLabels = ["Država", "Grad", "Univerzitet", "Fakultet", "Smer", "Status"];
let facRightLabels = ["Godina upisa", "Godine studija", "Broj položenih ispita", "Prosek", "ESPB"];

class FacultyModal extends React.Component {
    render(){
        return (
        <div>
            <div className = "col s12 m5 l5 xl5">
                {
                    facLeftLabels.map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "facInput" labelClassName = "facLabel"/>
                    ))
                }
            </div>
            <div className = "col offset-xl2 offset-l2 offset-m2 s12 m5 l5 xl5">
                {
                    facRightLabels.map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "facInput" labelClassName = "facLabel"/>
                    ))
                }
                <Button className = "modal-close facSaveBtn" text = "Dodaj"/>
            </div>
        </div>
    );
  }
}

export default FacultyModal;