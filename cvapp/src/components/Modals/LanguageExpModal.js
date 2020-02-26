import React from 'react';  
import InputC from '../InputC'
import Button from '../Button'
import './LanguageExpModal.css'
import Dropdown from  '../DropDown'

//lem - LanguageExpModal

let lemLeftList = ["Jezik", "Nivo govora", "Nivo razumevanja"];
let lemRightList = ["Sertifikat", "Nivo čitanja", "Nivo pisanja"];

let levels = ["Početni", "Srednji", "Viši", "Napredni"];

class LanguageExpModal extends React.Component {

  render(){
    return (
        <div>
            <div className = "col s12 m5 l5 xl5">
                {
                    lemLeftList.map((el, index)=>{
                        if(index === 0){
                            return (<InputC key = {index} label = {el} inputClassName = "lemInput"/>);
                        } else {
                            return (<Dropdown id = {index} key = {index} items = {levels} label = {el}/>);
                        }
                        
                    })
                }
            </div>
            <div className = "col offset-xl2 offset-l2 offset-m2 s12 m5 l5 xl5">
                {
                    lemRightList.map((el, index)=>{
                        if(index === 0){
                            return (<InputC key = {index} label = {el} inputClassName = "lemInput"/>);
                        } else {
                            //10 je samo radnom broj koji sam dodao jer svaki od dropdown-ova mora da ime jedinstven id
                            return (<Dropdown id = {index + 10} key = {index + 10} items = {levels} label = {el}/>);
                        }
                        
                    })
                }
            </div>
        </div>
    );
  }
}

export default LanguageExpModal;