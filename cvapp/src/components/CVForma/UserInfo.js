import React from 'react';  
import './UserInfo.css'
import InputC from '../InputC'
import Button from '../Button'
import * as userActions from '../../common/actions/userActions';
import {connect} from 'react-redux';
import Spinner from '../Spinner';

var userInfo = ["Ime", "Ime roditelja", "Prezime", "Datum rođenja" ];
const userKeys = ['ime',  'imeRoditelja', 'prezime','datumRodjenja', 'profilnaSlika', 'cv'];

class UserInfo extends React.Component {

  constructor(props){
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.onChangeProfileImage = this.onChangeProfileImage.bind(this);
    this.onChangeCV = this.onChangeCV.bind(this);

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
    this.props.submit({ payload: {
                        ...this.state.storeData, 
                        userID: sessionStorage.getItem('id')
                        },
                        field: 'licniPodaci',
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
  
    this.onInputChange(files[0], 'profilnaSlika');
    this.props.changeProfileImage(files[0]);
  }

  onChangeCV(files){
    this.onInputChange(files[0], 'cv');
    this.props.changeCV(files[0]);
  }

  render(){
    return (
      
      <div>
        <div className = "uiContainer col s12">
          <div className = "col offset-xl1 offset-l1 offset-m1 offset-s1 s6 l6 m6 xl6">
            {
              userInfo.map((el, index)=>(

                <InputC key = {userKeys[index]} label = {el} inputClassName = "uiInput" labelClassName = "uiLabel"
                onSubmit={this.onInputChange} index={userKeys[index]} value={this.props.storeData[`${userKeys[index]}`]}
                type={index === 3? 'date' : 'text'} />
              ))
            }
          </div>
          <div className = "col s5 uiRightCol">
            <img className = "profileImg" 
                src = {(this.props.storeData['profilnaSlika'] !== null && this.props.storeData[`profilnaSlika`] !== 'null')?
                          this.props.slika : "photos/defaultProfileImg.png"} 
                alt = "job fair"></img>
            <div className = "col s12 l12 m12 xl12">
              <label className="uploadProfileImage">
                  <input name="filetoupload" type="file" onChange = {(e) => this.onChangeProfileImage(e.target.files)}/>
                  {(this.props.storeData['profilnaSlika'] !== null && this.props.storeData[`profilnaSlika`] !== 'null')? 'Promeni sliku' : 'Postavi sliku'}
              </label>
            </div>
          </div>
          
        </div>
        <div className = "col s7 saveBtnContainer">
          
          {
        
          this.props.proccessing? <Spinner class="floatRight"/> :   <Button text = "Sačuvaj" className = "saveBtn" onClick={this.saveChanges}/>
          }
        </div>
        <div className = "col s5 postCvBtnContainer">
        {(this.props.storeData[`cv`] !== null && this.props.storeData[`cv`] !== 'null')? <a href={this.props.cv} target="_blank" class="cv">{this.props.cvForDisplay}</a> : null}

        <div className = "pdfFileName">
          </div>
          <label className="uploadCv">

              <Button  text = {(this.props.storeData[`cv`] !== null && this.props.storeData[`cv`] !== 'null')? 'Promeni trenutni CV' : 'Postavi CV'}/>
              <input name="filetoupload" type="file" onChange = { (e) => this.onChangeCV(e.target.files)}/>
          </label>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    storeData: state.licniPodaci,
    proccessing: state.proccessing,
    authProccessing: state.authenticationProccessing,
    cvForDisplay: state.cvForDisplay,
    slika: state.licniPodaci.profilnaSlika,
    cv: state.licniPodaci.cv
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit:  data => {dispatch(userActions.infoUpdateRequest( data))},
    changeProfileImage: picture => {dispatch(userActions.changeProfilePicture(picture))},
    changeCV: file => {dispatch(userActions.changeCV(file))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfo);
