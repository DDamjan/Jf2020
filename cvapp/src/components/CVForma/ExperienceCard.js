import React from 'react';  
import './ExperienceCard.css'

class ExperienceCard extends React.Component {

  render(){
    return (
        <div className = "col s12 expCardContainer">
            <div className = "col s3">

              {
                this.props.data.naziv? this.props.data.naziv : null
              }
                
              {
                this.props.data.kompanija? this.props.data.kompanija : null
              }
              {
                this.props.data.jezik? this.props.data.jezik : null
              }
            </div>
            <div className = "col s8">
              {
                this.props.data.organizator? `Organizator: ${this.props.data.organizator}` : null
              }
                
              {
                this.props.data.funkcija? this.props.data.funkcija : null
              }
              {
                this.props.data.nivo? `Nivo: ${this.props.data.nivo}` : null
              }
              {
                this.props.data.uloga? this.props.data.uloga : null
              }
            </div>
            <img className = "ecRemoveExp" src = "photos/cancelImg.png" alt = "job fair"></img>
        </div>
    );
  }
}

export default ExperienceCard;