import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Services/firebase';

import LoginString from '../Login/LoginStrings';
import './Login.css';
import { Card } from 'react-bootstrap';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            error:null,
            email: "",
            password:""
        }
    }
    render(){
        const paper={
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
            paddingLeft:'10px' ,
            paddingRight:'10px' ,
        }
        const rightcomponent={
            boxShadow:"0 80px 80px #808888",
            backgroundColor: 'smokegrey',
        }
        const root={
            height: '100vh',
            backgroundColor:"liner-gradient(90deg,#e3ffe7 0%,#d9e7ff 100%)",
            marginBottom: '50px',
        }
        const Signinsee={
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color:'White',
            marginBottom: '20px',
            backgroundColor:'#1ebea5',
            width: '100%',
            boxShadow:"0 5px 5px #808888",
            height: '10rem',
            paddingTop: '48px',
            opacity: '0.5',
            borderBottom:'5px solid green' ,

        }
        const form={
            width: '100%',
            marginTop: '50px',
        }
        const avatar={
            backgroundColor: 'green',
        }
        return(
            <Grid container component="main" style={root}>
             <CssBaseline/>
             <Grid item xs={1} sm={4} md={7} className="image">
                 <div className="image1"></div>
             </Grid>
             <Grid item xs={12} sm={8} md={5} style={rightcomponent} elevation={6} square>
               <Card style={Signinsee}>
                   <div>
                       <Avatar style={avatar}>
                       <LockOutlinedIcon width="50px" height="50px"/>

                       </Avatar>
                   </div>
                   <div>
                       <Typography component="h1" variant="h5">
                       Sign in 
                       To
                       </Typography>
                   </div>
                   <div>
                       <Link to="/">
                           <button class="btn">
                               <i class="fa fa-home"></i>
                               WebChat
                           </button>
                       </Link>
                   </div>
               </Card>
               <div style={paper}>
               <form style={form} noValidate onSubmit={this.handleSubmit}>
               <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address-example:abc@gmail.com"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handlechange}
                        value={this.state.email}
                    />

                    
                0.<TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        onChange={this.handlechange}
                        value={this.state.password}
                    />

               </form>

               </div>

             </Grid>

            </Grid>

        )
    }
}