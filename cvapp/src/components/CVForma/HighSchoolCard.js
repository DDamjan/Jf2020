import React from 'react';  
import './FacultyAndHighSchoolCard.css'

class HighSchoolCard extends React.Component {

  render(){
      let btnClassName = "small material-icons fcEdit " + this.props.btnClassName;
      let className = "col s12 facAndHsCardContainer " + this.props.className;
    return (
        <div className = {className}>
            <div className = "col s4 m4 l5 facAndHsText">
                {this.props.leftText} 
            </div>
            <div className = "col s4 m4 l5 facAndHsText">
                {this.props.middleText} 
            </div>
            <div className = "col s2 m2 l1">
                <i className = {btnClassName} 
                data-target = {this.props.dataTarget} 
                onClick = {this.props.onBtnClick}>edit</i>
            </div>
            <div className = "col s2 m2 l1">
                <img data-target = "modal3" 
                className = "facAndHsRemoveExp modal-trigger" 
                src = "photos/cancelImg.png" 
                alt = "job fair"></img>
            </div>
        </div>
    );
  }
}

export default HighSchoolCard;