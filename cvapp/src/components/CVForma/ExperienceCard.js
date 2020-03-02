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

          id: this.props.data.id,
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
                (this.props.data.sertifikat && !this.props.data.organizator)? `Nivo: ${this.props.data.sertifikat}` : null
              }
              {
                this.props.data.uloga? this.props.data.uloga : null
              }
            </div>
            <div className = "col s2 m2 l1">
                <i className = {"small material-icons cardEdit modal-trigger " + this.props.btnClassName} 
                data-target = "expModal"
                onClick = {() => this.props.openModal(this.props.data.id)}>edit</i>
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
    prepareForDelete: modal => dispatch(userActions.prepareForDeletion(modal)),
    openModal: id => dispatch(userActions.openModal(id))

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ExperienceCard);
