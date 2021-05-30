import React, { useEffect, useState } from 'react'
import{ Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function SigninScreen(props) {

 
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search 
        ? props.location.search.split('=')[1]
        :'/';
    
    const  userSignin  = useSelector((state) => state.userSignin);
    const {userInfo,loading,error} = userSignin;
   
    const  dispatch = useDispatch();
    const submitHandler = (e)=>{
        e.preventDefault(); //e.preventDefault() ถูกใช้เพื่อไม่ให้ browser reload หรือ refresh
        dispatch(signin(email,password));
        //TODO:sigin action
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history,redirect,userInfo])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <lable htmlFor="email">Email address</lable>
                    <input  type="email" id="email" 
                        placeholder="Enter email" 
                        required 
                        onChange={e => setEmail(e.target.value)} 
                    ></input>
                </div>
                <div>
                    <lable htmlFor="password">Email address</lable>
                    <input  type="password" id="password" 
                        placeholder="Enter password" 
                        required 
                        onChange={e => setPassword(e.target.value)} 
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <label/>
                    New customer? {''}
                    <Link to={`/register?redirect=${redirect}`}>
                     Create your account
                    </Link>
            </form>
        </div>
    )
}
