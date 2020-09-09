import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'
import { auth, provider } from './firebase'
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            } )
            .catch(error => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://i.pinimg.com/originals/99/0b/7d/990b7d2c2904f8cd9bc884d3eed6d003.png" alt="" />

                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>

            <div className="copyright">
            <p>@ 2020 WhatsApp clone by <Router><Link className="link" to={{ pathname: "https://codewithkarani.tech/" }} target="_blank"> codewithkarani.tech </Link></Router>! No rights Reserved - This is a demo!</p>
            </div>

        </div>
    )
}

export default Login
