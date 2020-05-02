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
    render(){
        return(
            <div className="profileroot">
            <div className="headerprofile">
                <span>PROFILE</span>
            </div>
            
            </div>
        )
    }
}