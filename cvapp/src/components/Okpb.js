import React from 'react';  
import './Okpb.css'
import InputC from './InputC'
import {connect} from 'react-redux';
import Button from './Button';
import * as userActions from '../common/actions/userActions';

//okpb - osnovni podaci, kontakt, prebivaliste, boraviste
class Okpb extends React.Component {

  constructor(props){
    super(props)

 
    this.onInputChange = this.onInputChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);

    const inputData = Object.keys(this.props.storeData).map( (key) => {
      return this.props.storeData[key]
    })
    const inputKeys = Object.keys(this.props.storeData).map( key => {
      return key
    })

    this.state = {inputData, inputKeys, valueChanged: false}
    // this.setState({
    //   inputData
    // })
  }

  componentDidMount(){

  }

  onInputChange(data, index) {
    if (this.state.valueChanged === false) this.state.valueChanged = true;

    const info = this.state.inputData;
    info[index] = data;
    this.setState({inputData: info});
  }

  saveChanges(){
    //console.log(this.state);

    if (!this.state.valueChanged){
      return;
    }

    let forStore = {field: this.props.field, id: sessionStorage.getItem('id')};
    this.state.inputKeys.forEach((key, index) => {
      forStore[key] = this.state.inputData[index];
    })

    this.props.submit(forStore);

  }

  render(){
    return (
        <div className = {this.props.className +  " col s12"} >
          {
            this.props.data.map((el, index)=>(
              <InputC key = {el} label = {el} inputClassName = "okpbInput" labelClassName = "okpbLabel" 
              className = "okpbInputC" value={this.state.inputData[index]} onSubmit={this.onInputChange}
              index={index}/>
            ))
          }
          <div className = "col s12 m12 l12 xl12 okpbSaveBtn">
                <Button text = "Sačuvaj" onClick={ this.saveChanges} />
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
    submit: data => dispatch(userActions.infoUpdateRequest(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Okpb);
