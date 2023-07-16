import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "./firebase";
import { actionTypes } from "./reducer"
import { useStateValue } from "./StateProvider";

function Login() {
    const [{}, dispatch] = useStateValue();

    const auth = getAuth();
    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    };

  return (
    <div className="login">
        <div className="login_container">
            <img src="https://pngtree.com/freepng/avatar-icon-profile-icon-member-login-vector-isolated_5247852.html" alt=""/>
            <div className="login_text">
                <h1>Sign into the chatapp</h1>
            </div>
            <Button onClick={signIn}>
                Sign in with Google
            </Button>
        </div>
    </div>
  )
}

export default Login