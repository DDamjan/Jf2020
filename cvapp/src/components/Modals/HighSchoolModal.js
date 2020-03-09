import React from 'react';  
import './HighSchoolModal.css'
import Button from '../Button'
import InputC from '../InputC'
import {connect} from 'react-redux';
import * as userActions from '../../common/actions/userActions';

let hsLabels = ["Naziv", "Tip", "Država", "Grad", "Smer", "Godina završetka"];
const keys = ['naziv', 'tip', 'drzava', 'grad', 'smer', 'godinaZavrsetka'];

const initialState = {
    naziv: '', tip: '', drzava: '', grad: '', smer: '', godinaZavrsetka: ''
}

class HighSchoolModal extends React.Component {

    constructor(props){
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            inputData: {...initialState}
        }
    }

    componentDidMount(){
        if (this.props.modalId !== null) {
            this.setState({
                inputData: {...this.props.srednjeObrazovanje.find( el => el.id === this.props.modalId)}
            })
        }
    }

    componentDidUpdate(prevProps) {

        if(this.props.modalId !== prevProps.modalId && this.props.modalId !== null) {
            this.setState({
                inputData: {...this.props.srednjeObrazovanje.find( el => el.id === this.props.modalId)}
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
        const data = {field: "srednjeObrazovanje", payload : {...this.state.inputData, fieldID: this.props.modalId, userID: sessionStorage.getItem('id')}};
        this.props.submit(data);
        this.setState({inputData: {...initialState}})
        this.forceUpdate();
    }

    keyPressHandle(event){
        if(event.key === 'Enter'){
            this.submit();
        }
    }

    render(){
        return (
        <div>
            <div className = "col s12 offset-m2 offset-l2 offset-xl2 m8 l8 xl8 hsInputContainer">
                {
                    hsLabels.map((el, index)=>(
                        <InputC key = {index} label = {el} inputClassName = "facInput" labelClassName = "facLabel"
                        onSubmit={this.onInputChange} index={keys[index]} 
                        value={this.state.inputData[`${keys[index]}`]}
                        type={index === 5? 'number' : 'text'} />
                    ))
                }
            </div>
            <div className = "col s12 hsSaveBtnContainer">
                <Button className = "modal-close hsSaveBtn" 
                text = {this.props.modalId !== null? 'Sacuvaj' : 'Dodaj'} onClick={this.submit}/>
            </div>
        </div>
    );
  }
}


const mapStateToProps = state => {
    return {
      srednjeObrazovanje: state.srednjeObrazovanje,
      modalId: state.modalId
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        submit: data => dispatch(userActions.submitFromModal(data))
      
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(HighSchoolModal);
