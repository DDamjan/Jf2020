import React from 'react';  
import './Experience.css'
import Button from '../Button'

let expList = ["Radno iskustvo", "Rad na projektu", "Stručno usavršavanje", "Rad na računaru",
 "Poznavanje jezika", "Ostale veštine"];

class Experience extends React.Component {

constructor(props){
    super(props);
    this.state = {
        listOfFaculties: []
    };
    this.props.setModal(this.props.modal);
}
  render(){
    return (
        <div>
            <div className = "col s12">
                {
                    expList.map((el, index) => (
                        <div className = "col offset-s2 s8 expBtnContiner" key = {index}>
                            <Button text = {el} className = "expBtn modal-trigger" 
                            onClick = { ()  => {this.props.setExpModal(index)}}
                            dataTarget = "modal1"/>
                        </div>
                    ))
                }
            </div>
        </div>
        
    );
  }
}

export default Experience;