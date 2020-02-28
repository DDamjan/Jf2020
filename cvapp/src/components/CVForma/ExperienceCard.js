import React from 'react';  
import './Card.css'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

class ExperienceCard extends React.Component {

  constructor(props){
    super(props)
    this.prepareForDelete = this.prepareForDelete.bind(this)
}

prepareForDelete(){
   
    const modal = {
        id: sessionStorage.getItem("id"),
        modalId: this.props.data.id,
        field: this.props.selectedModal
    }

    this.props.prepareForDelete(modal)
}

  render(){
    return (
        <div className = {"col s12 cardContainer " + this.props.className}>
            <div className = "col s4 m4 l5 cardText">

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
            <div className = "col s5 col s4 m4 l5 cardText">
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
            <div className = "col s2 m2 l1">
                <i className = {"small material-icons cardEdit modal-trigger " + this.props.btnClassName} 
                data-target = "modal1"
                onClick = {this.props.onBtnClick}>edit</i>
            </div>
            <div className = "col s2 m2 l1">
                <img className = "cardRemove modal-trigger " 
                src = "photos/cancelImg.png" 
                data-target = "modal3"
                alt = "job fair"
                onClick= { this.prepareForDelete}></img>
            </div>
        </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    selectedModal: state.experienceModalSelected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    prepareForDelete: modal => dispatch(userActions.prepareForDeletion(modal))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ExperienceCard);
