import React from 'react';
import './Profile.css';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/ProjectImages';
import LoginString from '../Login/LoginStrings';

export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            documentKey:localStorage.getItem(LoginString.FirebaseDocumentId),
            id:localStorage.getItem(LoginString.ID),
            name:localStorage.getItem(LoginString.Name),
            aboutMe:localStorage.getItem(LoginString.Description),
            photoUrl:localStorage.getItem(LoginString.PhotoURL),
        }
        this.newPhoto=null
        this.newPhotoUrl=""
    }
    //lifrciclyemethod
    componentDidMount(){
        if(!localStorage.getItem(LoginString.ID)){
            this.props.history.push("/")
        }
    }
    //nickename
    onChangeNickname=(event)=>{
      this.setState({
          name:event.target.value
      })
    }
    
    render(){
        return(
            <div className="profileroot">
            <div className="headerprofile">
                <span>PROFILE</span>
            </div>
            <img className="avatar" alt="" src={this.state.photoUrl} />
            <div className="viewWrapInputFile">
                <img
                   className="imgInputFile"
                   alt="icon gallery"
                   src={images.choosefile}
                   onClick={()=>{this.refInput.click()}}
                 />
                <input
                    ref={el=>{
                        this.refInput=el
                    }}
                    accept="image/*"
                    className="viewInputFile"
                    type="file"
                    onChange={this.onChangeAvatar}
                />
            </div>
            <span className="textLabel">Name</span>
           <input 
               className="textInput"
               value={this.state.name ? this.state.name:""}
               placeholder="Your nickname..."
               onChange={this.onChangeNickname}
           /> 
           <span className="textLabel">About Me</span>
           
           <input
                className="textInput"
                value={this.state.aboutMe ? this.state.aboutMe : ""}
                placeholder="Tell aboute Yourself..."
                onChange={this.onChangeAboutMe}
            />
            <div>
                <button className="btnUpdate" onClick={this.uploadAvatar}>
                    SAVE
                </button>
                <button className="btnback" onClick={()=>{this.props.history.push('/chat')}}>
                    SAVE
                </button>
            </div>
            {this.state.isLoading ?(
                <div>
                     <ReactLoading
                         type={'spin'}
                         color={'#203152'}
                         height={'3%'}
                         width={'3%'}
                     />
                </div>
            ):null}


            </div>
        )
    }
}