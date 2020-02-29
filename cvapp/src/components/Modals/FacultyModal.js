import React from 'react';  
import './FacultyModal.css'
import Button from '../Button'
import InputC from '../InputC'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

let facLeftLabels = ["Država", "Grad", "Univerzitet", "Fakultet", "Smer", "Status"];
let facRightLabels = ["Godina upisa", "Godine studija", "Broj položenih ispita", "Prosek", "ESPB"];
const keys = ['drzava', 'grad', 'univerzitet', 'fakultet', 'smer', 'status', 
              'godinaUpisa', 'godineStudija', 'brojPolozenihIspita', 'prosek', 'espb'];

const initialState = {
    drzava: "",
    grad:"",
    univerzitet: "",
    fakultet: "",
    smer: "",
    status: "",
    godinaUpisa: 0,
    godineStudija: 0,
    brojPolozenihIspita: 0,
    prosek: 0,
    espb: 0,
}

class FacultyModal extends React.Component {

    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            inputData: {...initialState}
        }
    }

    componentDidMount() {
        if (this.props.modalId !== null) {
            this.setState({
                inputData: {...this.props.visokoObrazovanje.find( el => el.id === this.props.modalId)}
            })
        }
    }
    componentDidUpdate(prevProps) {

        //console.log(this.props.modalId , prevProps.modalId)
        if(this.props.modalId !== prevProps.modalId && this.props.modalId !== null) {
            this.setState({
                inputData: {...this.props.visokoObrazovanje.find( el => el.id === this.props.modalId)}
            })

            return
        }

        if(this.props.modalId !== prevProps.modalId && this.props.modalId === null) {
            this.setState({
                inputData: {...initialState}
            })

            return 
        }
    } 

    onInputChange(data, index) {
       
        const info = this.state.inputData;
        info[index] = data;
        this.setState({inputData: info});
    }

    submit(){
        //Zasebna konstanta zbog testiranja samo
        const data = { field: "visokoObrazovanje",
            payload: {
                ...this.state.inputData, 
                fieldID: this.props.modalId,  
                userID: sessionStorage.getItem("id")
            }
            
        };
        this.props.submit(data);
        this.setState({inputData: {...initialState}})
        this.forceUpdate();
    }

    render(){
        return (
        <div>
            <div className = "col s12 m5 l5 xl5">
                {
                    facLeftLabels.map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "facInput" labelClassName = "facLabel"
                        onSubmit={this.onInputChange} index={keys[index]}
                        value={this.state.inputData[`${keys[index]}`]}/>
                    ))
                }
            </div>
            <div className = "col offset-xl2 offset-l2 offset-m2 s12 m5 l5 xl5">
                {
                    facRightLabels.map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "facInput" labelClassName = "facLabel"
                        onSubmit={this.onInputChange} index={keys[index + 6]} /* +6 zbog leve strane */
                        value={this.state.inputData[`${keys[index + 6]}`]} type= 'number'/>
                    ))
                }
                <Button className = "modal-close facSaveBtn" 
                text = {this.props.modalId !== null? 'Sacuvaj' : 'Dodaj'} onClick={this.submit}/>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      visokoObrazovanje: state.visokoObrazovanje,
      modalId: state.modalId
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        submit: data => dispatch(userActions.submitFromModal(data))
      
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(FacultyModal);

