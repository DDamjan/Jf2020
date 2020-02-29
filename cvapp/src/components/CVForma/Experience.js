import React from 'react';  
import './Experience.css'
import Button from '../Button'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

let expList = ["Radno iskustvo", "Rad na projektu", "Stručno usavršavanje", "Rad na računaru",
 "Poznavanje jezika", "Ostale veštine"];
const experienceKeys = ['radnoIskustvo', 'radNaProjektu', 'strucnoUsavrsavanje' , 'radNaRacunaru',  'poznavanjeJezika', 'ostaleVestine'];

class Experience extends React.Component {

constructor(props){
    super(props);

    this.openModal = this.openModal.bind(this);
    this.state = {
        listOfFaculties: []
    };
    this.props.setModal(this.props.modal);
}

    openModal(index, key){
        this.props.openExperienceModal(key);
        this.props.setExpModal(index)
    }


  render(){
    return (
        <div>
            <div className = "col s12">
                {
                    expList.map((el, index) => (
                        <div className = "col offset-s2 s8 expBtnContiner" key = {index}>
                            <Button text = {el} className = "expBtn modal-trigger" 
                            onClick = {() => this.openModal(index, experienceKeys[index])}
                            dataTarget = "modal1"/>
                        </div>
                    ))
                }
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
        openExperienceModal: modal => dispatch(userActions.openExperienceModal(modal))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Experience);

