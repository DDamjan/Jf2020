import React from 'react';  
import './ExperienceModal.css'
import Card from '../CVForma/Card'

//em - experienceModal
class ExperienceModal extends React.Component {

  render(){
    return (
      <div className = "col s12 emContainer">
        <div className = "col s12 offset-m1 m10 emCardsContainer">
            <Card className = "expCard"/>
            <Card className = "expCard"/>
        </div>
      </div>
    );
  }
}

export default ExperienceModal;