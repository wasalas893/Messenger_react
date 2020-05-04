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
              inputValue:""
          }
          this.currentUserName=localStorage.getItem(LoginString.Name);
          this.currentUserId=localStorage.getItem(LoginString.ID);
          this.currentUserPhoto=localStorage.getItem(LoginString.PhotoURL);
          this.currentUserDocumentId=localStorage.getItem(LoginString.FirebaseDocumentId);
          this.stateChanged=localStorage.getItem(LoginString.UPLOAD_CHANGED)
          this.currentPeerUser=this.props.currentPeerUser
      }
      componentWillReceiveProps(newProps){
          if(newProps.currentPeerUser){
              this.currentPeerUser=newProps.currentPeerUser
              //this.getListHistory()
          }
      }
      componentDidMount(){
           //this.getListHistory()
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
             <div className="viewListContentChat">
               {/* {} */}
               <div
                   style={{float:'left',clear:'both'}}
                   ref={el=>{
                       this.messagesEnd=el
                   }}
               />

             </div>
             {this.state.isShowStiker ? this.renderSticker():null}
             <div className="viewBottom">
               <img
                   className="icOpenGallery"
                   src={images.input_file}
                   alt="input_file"
                   onClick={()=>{this.refInput.click()}}
               />
               <img
                   className="viewInputGallery"
                   accept="images/*"
                   type="file"
                   onChange={this.onChoosePhoto}
               />
               <img
                   className="icOpenSticker"
                   src={images.sticker}
                   alt="icon open sticker"
                   onClick={this.openListSticker}
               />

               <input
                   className="viewInput"
                   placeholder="Type a message"
                   value={this.state.inputValue}
                   onChange={event=>{
                       this.setState({inputValue:event.target.value})
                   }}
                   onKeyPress={this.onKeyPress}
               />
               <img
                   className="icSend"
                   src={images.send}
                   alt="icon send"
                   onClick={()=>{this.onSendMessage(this.state.inputValue,0)}}
               />

             </div>
         </Card>
        )
    }
    renderSticker=()=>{
        return(
            <div className="viewStickers">
            <img
            className="imgSticker"
            src={images.lego1}
            alt="sticker"
            onClick={()=>this.onSendMessage('lego1',2)}
             />
              <img
            className="imgSticker"
            src={images.lego2}
            alt="sticker"
            onClick={()=>this.onSendMessage('lego2',2)}
             />
              <img
            className="imgSticker"
            src={images.lego3}
            alt="sticker"
            onClick={()=>this.onSendMessage('lego3',2)}
             />
              <img
            className="imgSticker"
            src={images.lego4}
            alt="sticker"
            onClick={()=>this.onSendMessage('lego4',2)}
             />
              <img
            className="imgSticker"
            src={images.lego5}
            alt="sticker"
            onClick={()=>this.onSendMessage('lego5',2)}
             />
              <img
            className="imgSticker"
            src={images.lego6}
            alt="sticker"
            onClick={()=>this.onSendMessage('lego6',2)}
             />
              <img
            className="imgSticker"
            src={images.mimi1}
            alt="sticker"
            onClick={()=>this.onSendMessage('mimi1',2)}
             />
              <img
            className="imgSticker"
            src={images.mimi2}
            alt="sticker"
            onClick={()=>this.onSendMessage('mimi2',2)}
             />
              <img
            className="imgSticker"
            src={images.mimi3}
            alt="sticker"
            onClick={()=>this.onSendMessage('mimi3',2)}
             />
              <img
            className="imgSticker"
            src={images.mimi4}
            alt="sticker"
            onClick={()=>this.onSendMessage('mimi4',2)}
             />
              <img
            className="imgSticker"
            src={images.mimi5}
            alt="sticker"
            onClick={()=>this.onSendMessage('mimi5',2)}
             />
              <img
            className="imgSticker"
            src={images.mimi6}
            alt="sticker"
            onClick={()=>this.onSendMessage('mimi6',2)}
             />
              <img
            className="imgSticker"
            src={images.mimi7}
            alt="sticker"
            onClick={()=>this.onSendMessage('mimi7',2)}
             />
              <img
            className="imgSticker"
            src={images.mimi8}
            alt="sticker"
            onClick={()=>this.onSendMessage('mimi8',2)}
             />
              <img
            className="imgSticker"
            src={images.mimi9}
            alt="sticker"
            onClick={()=>this.onSendMessage('mimi9',2)}
             />

            </div>
        )
    }
}