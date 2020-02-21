import React from 'react';  
import './LeftImage.css'

class LeftImage extends React.Component {
  render(){
    var src = "photos/" + this.props.src;
    return (
        <img className = {this.props.className} src = {src} alt = "job fair" ></img>
    );
  }
}

export default LeftImage;