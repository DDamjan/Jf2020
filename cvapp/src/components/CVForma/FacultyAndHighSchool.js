import React from 'react';  
import './FacultyAndHighSchool.css'
import Button from '../Button'

class FacultyAndHighSchool extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        listOfFaculties: []
    };
  }

  render(){
    return (
      <div>
        <div className = "col s12 m12 l12 xl12">
        </div>
        <div className = "col s12 m12 l12 xl12 facAddBtnContainer">
          <Button onClick = { ()  => {this.props.setModal(this.props.modal)} } className = "modal-trigger" text = "+" dataTarget = "modal1"/>
        </div>
      </div>
    );
  }
}

export default FacultyAndHighSchool;