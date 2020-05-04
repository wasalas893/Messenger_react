import React from 'react';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/ProjectImages';

import './ChatBox.css';
import LoginString from '../Login/LoginStrings';




export default class ChatBox extends React.Component{
      constructor(props){
          super(props);
          this.state={
              isLoading:false,
              isShowStiker:false,
          }
          this.currentUserName=localStorage.getItem(LoginString.Name);
          this.currentUserId=localStorage.getItem(LoginString.ID);
          this.currentUserPhoto=localStorage.getItem(LoginString.PhotoURL);
          this.currentUserDocumentId=localStorage.getItem(LoginString.FirebaseDocumentId);
          this.stateChanged=localStorage.getItem(LoginString.UPLOAD_CHANGED)
          this.currentPeerUser=this.props.currentPeerUser
      }
      componentWillReceiveProps(newProps){
          
      }
    render(){
        return(
         <Card className="viewChatBoard">
             <div className="headerChatBoard">
                 <img
                 className="viewAvatarItem"
                 src={this.currentPeerUser.URL}
                 alt=""
                  />
                  <span className="textHeaderChatBoard ">
                      <p style={{fontSize:'20px'}}>{this.currentPeerUser.name}</p>
                  </span>
                  <div className="aboutme">
                      <span>
                          <p>{this.currentPeerUser.Description}</p>
                      </span>
                  </div>
             </div>
         </Card>
        )
    }
}