import React from 'react';  
import './ExperienceModal.css'
import ExperienceCard from '../CVForma/ExperienceCard'

//em - experienceModal
class ExperienceModal extends React.Component {

  render(){
    return (
      <div className = "col s12 emContainer">
        <div className = "col s12 offset-m2 m8 emCardsContainer">
            <ExperienceCard />
        </div>
      </div>
    );
  }
}

export default ExperienceModal;