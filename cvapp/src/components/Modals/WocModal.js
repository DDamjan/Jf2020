import React from 'react';  
import './WocModal.css'
import InputC from '../InputC'
import Button from '../Button'
import M from "materialize-css";
import Dropdown from  '../DropDown'

//Woc - work on computer

let wocDdItems = ["Početni", "Srednji", "Viši", "Napredni"];

class WocModal extends React.Component {

    constructor(props){
        super(props);
        this.onWocLvlClicked = this.onWocLvlClicked.bind(this);
        this.state = {
          wocLvl: "Izaberite nivo"
        }
    }
    
    onWocLvlClicked(txt){
        this.setState({
            wocLvl: txt
        });
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
    }

    render(){
        return (
            <div className = "col s12">
                <div className = "col offset-l3 l6 m12 s12">
                    <InputC label = "Naziv" inputClassName = "wocInput" />
                </div>
                <div className = "col offset-l3 l6 m12 s12">
                    <Dropdown items = {wocDdItems} label = "Nivo"/>
                </div>
                <div className = "col offset-l3 l6 m12 s12">
                    <InputC label = "Sertifikat" inputClassName = "wocInput"/>
                </div>
            </div>
        );
    }
}

export default WocModal;