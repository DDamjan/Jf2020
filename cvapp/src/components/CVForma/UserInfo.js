import React from 'react';  
import './UserInfo.css'
import InputC from '../InputC'
import Button from '../Button'
import * as userActions from '../../common/actions/userActions';
import {connect} from 'react-redux';

var userInfo = ["Ime", "Ime roditelja", "Prezime", "Datum rođenja" ];
const userKeys = ['ime',  'imeRoditelja', 'prezime','datumRodjenja'];

class UserInfo extends React.Component {

  constructor(props){
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.onChangeProfileImage = this.onChangeProfileImage.bind(this);

    // const inputData = Object.keys(this.props.storeData).map( (key) => {
    //   return this.props.storeData[key]
    // })

    //this.state = {storeData: this.props.storeData}

  }

  saveChanges(){

    if (this.state === null){
      //Malo objasnjenje za ovo ovde ako nekad zatreba
      //Zbog nacina kako radi 'onInputChange' trenutni info se uzima iz propsa ako je state null
      //A u sustini sistem trenutno radi tako da je state null ako se nista nije ukucavalo
      //Samim tim ako zapravo se desi neka promena cinjenica da state nije null je sam indikator da je doslo do promene
      //I onda se izvrsava ostatka ovde, odnosno disptachuje akcija
      return
    }
    this.props.submit({...this.state.storeData, 
                        field: 'licniPodaci',
                        id: sessionStorage.getItem('id')
                      });
  }

  onInputChange(data, index) {
 
    const info = this.state === null? {...this.props.storeData} : this.state.storeData;
    info[index] = data;
    this.setState({storeData: info});
  }

  componentDidMount(){
    //this.props.isUserLoggedIn()
  }

  onChangeProfileImage(files){
    console.log(files)
  }

  render(){
    return (
      <div>
        <div className = "uiContainer col s12">
          <div className = "col offset-xl1 offset-l1 offset-m1 offset-s1 s6 l6 m6 xl6">
            {
              userInfo.map((el, index)=>(

                <InputC key = {userKeys[index]} label = {el} inputClassName = "uiInput" labelClassName = "uiLabel"
                onSubmit={this.onInputChange} index={userKeys[index]} value={this.props.storeData[`${userKeys[index]}`]} />
              ))
            }
          </div>
          <div className = "col s5 uiRightCol">
            <img className = "profileImg" src = "photos/defaultProfileImg.png" alt = "job fair"></img>
            <div className = "col s12 l12 m12 xl12">
              <label className="uploadProfileImage">
                  <input type="file" onChange = {this.onChangeProfileImage}/>
                  Postavi sliku
              </label>
            </div>
          </div>
          <p className = "pdfFileName">Petar_Petrovic.pdf</p>
        </div>
        <div className = "col s7 saveBtnContainer">
          <Button text = "Sačuvaj" className = "saveBtn" onClick={this.saveChanges}/>
        </div>
        <div className = "col s5 postCvBtnContainer">
          <label className="uploadCv">
              <Button text = "Postavi CV"/>
              <input type="file" onChange = { (e) => this.onChangeProfileImage(e.target.files)}/>
          </label>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    storeData: state.licniPodaci
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit:  data => {dispatch(userActions.infoUpdateRequest( data))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfo);
