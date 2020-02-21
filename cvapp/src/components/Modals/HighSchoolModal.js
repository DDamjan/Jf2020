import React from 'react';  
import './HighSchoolModal.css'
import Button from '../Button'
import InputC from '../InputC'

let hsLabels = ["Naziv", "Tip", "Država", "Grad", "Smer", "Godina završetka"];

class HighSchoolModal extends React.Component {
    render(){
        return (
        <div>
            <div className = "col s12 offset-m2 offset-l2 offset-xl2 m8 l8 xl8 hsInputContainer">
                {
                    hsLabels.map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "facInput" labelClassName = "facLabel"/>
                    ))
                }
            </div>
            <div className = "col s12 hsSaveBtnContainer">
                <Button className = "modal-close hsSaveBtn" text = "Dodaj"/>
            </div>
        </div>
    );
  }
}

export default HighSchoolModal;