import React from 'react';  
import './OtherSkillsModal.css'
import { Input, Label } from 'reactstrap';
import Button from '../Button'

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
            <div className = "col s12 addBtnContainer">
                      <Button className = "modal-close addModal2Btn" text = "Dodaj"/>
                    </div>
        </div>
    );
  }
}

export default OtherSkillsModal;