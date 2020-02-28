import React from 'react';  
import './Card.css'

class Card extends React.Component {

  render(){
    return (
        <div className = {"col s12 cardContainer " + this.props.className}>
            <div className = "col s4 m4 l5 cardText">
                {this.props.leftText} 
            </div>
            <div className = "col s5 col s4 m4 l5 cardText">
                {this.props.middleText} 
            </div>
            <div className = "col s2 m2 l1">
                <i className = {"small material-icons cardEdit modal-trigger " + this.props.btnClassName} 
                data-target = "modal1"
                onClick = {this.props.onBtnClick}>edit</i>
            </div>
            <div className = "col s2 m2 l1">
                <img className = "cardRemove modal-trigger " 
                src = "photos/cancelImg.png" 
                data-target = "modal3"
                alt = "job fair"></img>
            </div>
        </div>
    );
  }
}

export default Card;