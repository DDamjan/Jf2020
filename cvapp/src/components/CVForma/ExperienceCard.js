import React from 'react';  
import './ExperienceCard.css'

class ExperienceCard extends React.Component {

  render(){
    return (
        <div className = "col s12 expCardContainer">
            <div className = "col s3">
                <p> mikro </p>
            </div>
            <div className = "col s8">
                <p> klozetarka </p>
            </div>
            <img className = "ecRemoveExp" src = "photos/cancelImg.png" alt = "job fair"></img>
        </div>
    );
  }
}

export default ExperienceCard;