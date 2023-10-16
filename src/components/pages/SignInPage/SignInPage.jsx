import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../assets/js/firebase/firebase';
import { useContext } from 'react';
import AuthContext from '../../../assets/js/auth-context';
import {useNavigate } from "react-router-dom";

export default function SignInPage() {
    const [mail, setMail] = useState('');
    const [pas, setPas] = useState('');
    const authCtx = useContext(AuthContext);
    const ls = window.localStorage;
    const navigateTo = useNavigate();
    function processSubmit(e){
        e.preventDefault();
        signInWithEmailAndPassword(auth, mail, pas)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            authCtx.setIsLoggedIn(true);
            authCtx.setUid(uid);
            const userLS = {
                isLoggedIn: true,
                uid: uid
            }
            ls.setItem('auth', JSON.stringify(userLS));
            ls.setItem("currentUser", JSON.stringify(auth.currentUser))
            navigateTo('/profile')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

    }

    return (
        <>
                <h1>Sign in</h1>
                <form onSubmit={processSubmit}>
                    <label>
                        E-mail:
                        <input type="text" name="username" autoComplete="username" aria-hidden="true" className="hidden-input" style= {{display: 'none'}}/>
                        <input type="mail" name="mail" autoComplete="username" required onChange={(e) => setMail(e.target.value)}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" autoComplete="current-password" required onChange={(e) => setPas(e.target.value)}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                
        </>

    )
}