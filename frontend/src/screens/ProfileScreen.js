import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    //updateProfile
    const [name, setName] = useState(''); //update 1
    const [email, setEmail] = useState(''); //update 1
    const [password, setPassword] = useState(''); //update 1
    const [confirmPassword, setConfrimPassword] = useState(''); //update 1




    //////////////////////////////////////////////////////
    const userSignin = useSelector(state =>state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails); //==call store.js
    const { loading, error, user } = userDetails;
    
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile); //update 5
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile; //update 5

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) { ///update 2
            dispatch({type : USER_UPDATE_PROFILE_RESET}) //*update 5*/
            dispatch(detailsUser(userInfo._id))
        }else{
            setName(user.name); ///update 2
            setEmail(user.email); ///update 2
        }


        
    },[dispatch,userInfo._id,user])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword ) { //update 4
            alert('Password and Confirm Password Are Not Matched') //update 4
        }else{
            dispatch(updateUserProfile({ userId:user._id, name, email, password})) //update 4
        }
    }

    return (
        <div >
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                    { loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                        {loadingUpdate && <LoadingBox></LoadingBox>}    {/*update 5*/}
                        {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)} {/*update 5*/}
                            
                            {successUpdate && (
                                <MessageBox variant="success">
                                     Profile Update Successfully
                                </MessageBox>
                            )} {/*update 5*/}
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id = "name"
                                    type = "text"
                                    placeholder = "Enter name"
                                    value = {name}
                                    onChange = {(e) => setName(e.target.value)} //update 3
                                ></input>
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    id = "email"
                                    type = "email"
                                    placeholder = "Enter email"
                                    value = {email}
                                    onChange = {(e) => setEmail(e.target.value)} //update 3
                                ></input>
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    id = "password"
                                    type = "password"
                                    placeholder = "Enter password"
                                    onChange = {(e) => setPassword(e.target.value)} //update 3
                                ></input>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    id = "confirmPassword"
                                    type = "password"
                                    placeholder = "Enter Confirm Password"
                                    onChange = {(e) => setConfrimPassword(e.target.value)} //update 3
                                ></input>
                            </div>

                            <div>
                                <label/>
                                <button className="primary" type="submit">Update</button>
                            </div>

                        </>
                    )}
            </form>
        </div>
    );
}
