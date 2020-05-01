import React from 'react';
import LoginString from '../Login/LoginStrings';



export default class Chat extends React.Component{
    constructor(props){
        super(props)
        this.currentUserName=localStorage.getItem(LoginString.Name);
    }
    render(){
        return(
            <div>
                {this.currentUserName}
            </div>
        )
    }
}