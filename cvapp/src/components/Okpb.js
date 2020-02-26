import React from 'react';  
import './Okpb.css'
import InputC from './InputC'
import {connect} from 'react-redux';

//okpb - osnovni podaci, kontakt, prebivaliste, boraviste
class Okpb extends React.Component {

  constructor(props){
    super(props)

 
    this.onInputChange = this.onInputChange.bind(this);


    const inputData = Object.keys(this.props.storeData).map( (key) => {
      return this.props.storeData[key]
    })

    this.state = {inputData}
    // this.setState({
    //   inputData
    // })
  }

  componentDidMount(){

  }

  onInputChange(data, index) {
    const info = this.state.inputData;
    info[index] = data;
    this.setState({info});
  }

  render(){
    return (
        <div className = {this.props.className +  " col s12"} >
          {
            this.props.data.map((el, index)=>(
              <InputC key = {el} label = {el} inputClassName = "okpbInput" labelClassName = "okpbLabel" 
              className = "okpbInputC" value={this.state.inputData[index]} onSubmit={this.onInputChange}/>
            ))
          }
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

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Okpb);
