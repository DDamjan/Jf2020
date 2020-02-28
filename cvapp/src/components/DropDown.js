import React from 'react';  
import './DropDown.css'
import Button from './Button'
import M from "materialize-css";
import { Label } from 'reactstrap';

class Dropdown extends React.Component {

    constructor(props){
        super(props);
        this.onDdItemClicked = this.onDdItemClicked.bind(this);
        this.state = {
          pickedValue: "Izaberite nivo"
        }
    }
    
    onDdItemClicked(txt){
        this.setState({
            pickedValue: txt
        });
        this.props.onChange(txt, this.props.index)
    }

    componentDidMount() {
        let dropdown = document.querySelectorAll('.dropdown-trigger');
        let options = {
            inDuration: 300, 
            outDuration: 300,
            coverTrigger: false,
            hover: false
        };
        M.Dropdown.init(dropdown, options);
    }

    render(){
        return (
            <div>
                <div>
                    <Label className = "lvlLabel" > {this.props.label} </Label>
                </div>
                <div>
                    <Button text = {this.state.pickedValue} dataTarget = {"dd" + this.props.id} className = "dropdown-trigger ddBtn"/>
                </div>
                <ul id={"dd" + this.props.id} className='dropdown-content dd'>
                    {
                        this.props.items.map((el, index ) => (
                            <div key = {index}>
                                <li onClick = {() => this.onDdItemClicked(el)}>{el}</li>
                                <li className="divider"></li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Dropdown;