import React from 'react';  
import './FacultyAndHighSchool.css'
import Button from '../Button'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';
import Card from './Card'

class HighSchool extends React.Component {

  constructor(props){
    super(props);
    this.openModal = this.openModal.bind(this);
    this.state = {
        listOfFaculties: []
    };
  }

  openModal(id){
    this.props.openModal(id);
    this.props.setModal(this.props.modal);

  }

  render(){
    return (
      <div>
        <div className = "col s12 m12 offset-l1 l10">
            { 
            this.props.srednjeObrazovanje.map(el => {
              return ( 
              <Card 
                className = "fc"
                leftText = {el.naziv} 
                middleText = {el.smer}
                onBtnClick = {() => this.openModal(el.id)}/>
              )
            })}
        </div>
        <div className = "col s12 facAddBtnContainer">
          <Button onClick = { () => this.openModal(null)} className = "modal-trigger" text = "+" dataTarget = "modal1"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    srednjeObrazovanje: state.srednjeObrazovanje
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: id => dispatch(userActions.openModal(id))
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HighSchool);
