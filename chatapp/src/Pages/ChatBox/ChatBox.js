import React from 'react';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/ProjectImages';
import moment from 'react-moment';
import './ChatBox.css';
import LoginString from '../Login/LoginStrings';
import 'bootstrap/dist/css/bootstrap.css';




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
          this.groupChatId=null;
          this.listMessage=[];
          this.currentPeerUserMessages=[];
          this.removeListener=null;
          this.currentPhotoFile=null;

        //   firebase.firestore().collection('users').doc(this.currentPeerUser.documentkey).get()
        //   .then((docRef)=>{
        //       this.currentPeerUserMessages=docRef.data().messages
        //   })
      }
      componentDidUpdate(){
          this.scrollToBottom()
      }
      componentWillReceiveProps(newProps){
          if(newProps.currentPeerUser){
              this.currentPeerUser=newProps.currentPeerUser
              this.getListHistory()
          }
      }
      componentDidMount(){
           this.getListHistory()
      }
      getListHistory=()=>{
          this.listMessage.length=0
          this.setState({isLoading:true})

        //   if(
        //       this.hashString(this.currentUserId) <=
        //       this.hashString(this.currentPeerUser.id)
        //   ){
        //       this.groupChatId=`${this.currentUserId}-${this.currentPeerUser.id}`
        //   }else{
        //       this.groupChatId=`${this.currentPeerUser.id}-${this.currentUserId}`
        //   }
          
          //Get history listen new data added
        //   this.removeListener=firebase.firestore()
        //   .collection('Messages')
        //   .doc(this.groupChatId)
        //   .collection(this.groupChatId)
        //   .onSnapshot(Snapshot=>{
        //       Snapshot.docChanges().forEach(change=>{
        //           if(change.type===LoginString.DOC){
        //               this.listMessage.push(change.doc.data())
        //           }
        //       })
        //       this.setState({isLoading:false})
        //   }),
        //   err=>{
        //       this.props.showToast(0,err.toString())
        //   }

      }
      onSendMessage=(content, type)=>{
          let notificationMessages=[]
          if(this.state.isShowStiker && type === 2){
              this.setState({isShowStiker:false})
          }
          if(content.trim() ===''){
              return
          }
          const timestamp=moment()
          .valueOf()
          toString()

          const itemMessage={
              idFrom:this.currentUserId,
              idTo:this.currentPeerUser.id,
              timestamp:timestamp,
              content:content.trim(),
              type:type


          }
          firebase.firestore()
          .collection('Messages')
          .doc(this.groupChatId)
          .collection(this.groupChatId)
          .doc(timestamp)
          .set(itemMessage)
          .then(()=>{
              this.setState({inputValue:''})
          })
          this.currentPeerUserMessages.map((item)=>{
              if(item.notificationId !=this.currentUserId){
                 notificationMessages.push(
                     {
                         notificationId:item.notificationId,
                         number:item.number
                     }
                 )
              }
          })
          firebase.firestore()
          .collection('users')
          .doc(this.currentPeerUser.documentkey)
          .update({
             messages:notificationMessages   
          })
          .then((data)=>{})
          .catch(err=>{
              this.props.showToast(0,err.toString())
          })

      }
      scrollToBottom=()=>{
          if(this.messagesEnd){
              this.messagesEnd.scrollIntoView({})
          }
      }
      onKeyboardPress=event=>{
          if(event.key==='Enter'){
              this.onSendMessage(this.state.inputValue,0)
          }
      }
     openListSticker=()=>{
         this.setState({isShowStiker:!this.isShowStiker})
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
               {this.renderListMessage()}
               <div
                   style={{float:'left',clear:'both'}}
                   ref={el=>{
                       this.messagesEnd=el
                   }}
               />

             </div>
             {this.state.isShowStiker ? this.renderStickers():null}
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
             {this.state.isLoading ? (
                 <div className="viewLoading">
                     <ReactLoading
                         type={'spin'}
                         color={'#203152'}
                         height={'3%'}
                         width={'3%'}
                     />
                 </div>
             ):null}
         </Card>
        )
    }
    renderListMessage=()=>{
        if(this.listMessage.length>0){
            let viewListMessage=[]
            this.listMessage.forEach((item,index)=>{
                if(item.idFrom===this.currentUserId){
                    if(item.type===0){
                     viewListMessage.push(
                         <div className="viewItemRight" key={item.timestamp}>
                             <span className="textContentItem">{item.content}</span>
                         </div>
                     )        
                    }else if(item.type===1){
                        viewListMessage.push(
                            <div className="viewItemLeft2" key={item.timestamp}>
                                <img
                                  className="imgItemRight"
                                  src={item.content}
                                  alt="Please update your image"
                                 />
                            </div>
                        )
                    }else{
                        viewListMessage.push(
                            <div className="viewItemLeft3" key={item.timestamp}>
                                <img
                                    className="imgItemRight"
                                    src={this.getGifImage(item.content)}
                                    alt="content message"
                                />
                            </div>
                        )
                    }
                }else{
                   if(item.type===0){
                       viewListMessage.push(
                           <div className="viewWrapItemLeft" key={item.timestamp}>
                               <div className="viewWrapItemLeft3">
                               {this.isLastMessageLeft(index)?(
                                   <img
                                       src={this.currentPeerUser.URL}
                                       alt="avatar"
                                       className="peerAvatarLeft"
                                   />
                               ):(
                                   <div className="viewPaddingLeft"/>
                               )}
                               <div className="viewItemLeft">
                                   <span className="textContentItem">{item.content}</span>
                               </div>
                               

                               </div>
                               {this.isLastMessageLeft(index)?(
                                   <span className="textTimeLeft">
                                       <div className="time">
                                           {moment(Number(item.timestamp)).formate('11')}
                                       </div>
                                   </span>
                               ):null}
                           </div>
                       )
                   }else if(item.type===1){
                       
                   }
                }
            })
        }
    }
    renderStickers=()=>{
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
    hashString=str=>{
        let hash=0
        for(let i=0;i<str.length;i++){
            hash+=Math.pow(str.charCodeAt(i)*31,str.length - i)
            hash=hash & hash
        }
        return hash
    }
    isLastMessageLeft(index){
        if(
            (index +1 <this.listMessage.length &&
                this.listMessage[index +1].idFrom===this.currentUserId) ||
                index===this.listMessage.length -1
        ){
            return true
        }else{
            return false
        }
    }
    isLastMessageRight(index){
        if(
            (index +1 <this.listMessage.length &&
                this.listMessage[index +1].idFrom !==this.currentUserId) ||
                index===this.listMessage.length -1
        ){
            return true
        }else{
            return false
        }
    }

}