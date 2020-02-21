import React from 'react';  
import './UserInfo.css'
import InputC from '../InputC'
import Button from '../Button'

var userInfo = ["Ime", "Ime roditelja", "Prezime", "Datum rođenja" ];

class UserInfo extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div className = "uiContainer col s12">
          <div className = "col offset-xl1 offset-l1 offset-m1 offset-s1 s6 l6 m6 xl6">
            {
              userInfo.map((el, index)=>(
                <InputC key = {index} label = {el} inputClassName = "uiInput" labelClassName = "uiLabel"/>
              ))
            }
          </div>
          <div className = "col s5 uiRightCol">
            <img className = "profileImg" src = "photos/defaultProfileImg.png" alt = "job fair"></img>
            <div className = "col s12 l12 m12 xl12">
              <a href="#" className = "changeImageLink">Promeni sliku</a>
            </div>
          </div>
          <p className = "pdfFileName">Petar_Petrovic.pdf</p>
        </div>
        <div className = "col s7 saveBtnContainer">
          <Button text = "Sačuvaj" className = "saveBtn"/>
        </div>
        <div className = "col s5 postCvBtnContainer">
          <Button text = "Postavi CV"/>
        </div>
      </div>
    );
  }
}

export default UserInfo;