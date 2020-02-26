import React from 'react';  
import './FacultyAndHighSchool.css'
import Button from '../Button'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

class Faculty extends React.Component {

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
        <div className = "col s12 m12 l12 xl12">
            { //TODO napraviti da ovo zapravo izgleda kako treba
            this.props.srednjeObrazovanje.map(el => {
              return (<div key={el.id}> <h3>{el.fakultet}</h3>
                <h4>{el.smer}</h4>
                <Button text="Edit" onClick = { () => this.openModal(el.id)} className = "modal-trigger" dataTarget = "modal1"/></div>
              )
            })}
        </div>
        <div className = "col s12 m12 l12 xl12 facAddBtnContainer">
          <Button onClick = { () => this.openModal(null)} className = "modal-trigger" text = "+" dataTarget = "modal1"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    srednjeObrazovanje: state.visokoObrazovanje
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: id => dispatch(userActions.openModal(id))
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Faculty);
