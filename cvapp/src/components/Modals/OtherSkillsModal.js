import React from 'react';  
import './OtherSkillsModal.css'
import { Input, Label } from 'reactstrap';
import Button from '../Button'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

//osm - other skills modal
let osmLeftList = ["Vozačke dozvole (kategorije)", "Osobine"];
let osmRightList = ["Veštine", "Interesovanja"];

class OtherSkillsModal extends React.Component {

  render(){
    return (
        <div>
            <div className = "col s12 skillsCont">
                <div className = "col s12 m12 l5 xl5">
                    {
                        osmLeftList.map((el, index)=>(
                            <div key = {index}>
                                <Label for="exampleText" className = "osmLabel">{el}</Label>
                                <Input type="textarea" name="text" className = "osmArea"/>
                            </div>
                        ))
                    }
                </div>
                <div className = "col offset-xl2 offset-l2 s12 m12 l5 xl5 osmRight">
                    {
                        osmRightList.map((el, index)=>(
                            <div key = {index}>
                                <Label for="exampleText" className = "osmLabel">{el}</Label>
                                <Input type="textarea" name="text" className = "osmArea"/>
                            </div>
                        ))
                    }
                </div>

            </div>
            <div className = "col s12 saveBtnContainer">
                <Button className = "modal-close addModal2Btn" text = "Sačuvaj"/>
            </div>
        </div>
    );
  }
}


const mapStateToProps = state => {
    return {
        experienceModal: state.experienceModalSelected,
        modalId: state.modalId,
        wocEntities: state.iskustvo.radNaRacunaru
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {    
        submit: data => dispatch(userActions.submitFromModal(data))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(OtherSkillsModal);