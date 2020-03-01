import React from 'react';  
import './Card.css'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

class Card extends React.Component {

    constructor(props){
        super(props)
        this.prepareForDelete = this.prepareForDelete.bind(this)
    }

    prepareForDelete(){
       
        const modal = {
            id:  this.props.id,
            field: this.props.field
        }

        this.props.prepareForDelete(modal)
    }

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
            <div className = "col s2 m2 l1" >
                <i className = "cardRemove modal-trigger material-icons" 
                src = "photos/cancelImg.png" 
                data-target = "modal3"
                alt = "job fair"
                onClick= { this.prepareForDelete}>cancel</i>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      prepareForDelete: modal => dispatch(userActions.prepareForDeletion(modal))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Card);
