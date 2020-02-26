import React from 'react';  
import './InputC.css'
import { Input, Label } from 'reactstrap';

class InputC extends React.Component {

  constructor(props){
    super(props);
    this.state = {value: this.props.value};

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(){
    // this.setState({
    //   value: this.props.value
    // })
  }

  componentDidUpdate(prevProps){

    if(this.props.value !== prevProps.value ){
      this.setState({
        value: this.props.value
      })
    }
  }

  componentDidMount(){
    //console.log(this.props)
    // this.setState({
    //   value: this.props.value
    // })
    //console.log(this.state)
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
    this.props.onSubmit(e.target.value, this.props.index)
  }

  render(){
    let labelClassName = "label " + this.props.labelClassName;
    let inputClassName = "input " + this.props.inputClassName;
    return (
     
        <div  className = { this.props.className }>
            <Label className = {labelClassName}>{this.props.label}</Label>
            <Input
                  onChange={this.handleChange}
                  value={this.state.value}
                  type={this.props.type}
                  className = {inputClassName}
              />
        </div>

    );
  }
}

export default InputC;