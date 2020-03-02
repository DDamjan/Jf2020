import React from 'react';  
import './ExperienceModal.css'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';
import ExperienceCard from '../CVForma/ExperienceCard'

//em - experienceModal
class ExperienceModal extends React.Component {

  constructor(props){
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal(id){
    this.props.openModal(id);
  }

  render(){
    
    return (
      <div className = "col s12 emContainer">
        <div className = "col s12 offset-m1 m10 emCardsContainer">
          {
            this.props.selectedModal !== null? 
            this.props.experience[`${this.props.selectedModal}`].map( el => {
              return <ExperienceCard data={el} key={el.id} onBtnClick={this.openModal} className = "expCard"
              openModal = {this.props.ope} />
            }) : null
          }  
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    experience: state.iskustvo,
    selectedModal: state.experienceModalSelected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: id => dispatch(userActions.openModal(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ExperienceModal);
