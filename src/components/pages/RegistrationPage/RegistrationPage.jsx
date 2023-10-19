import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { ref, set} from "firebase/database";
import { useState, useContext } from 'react';
import { auth, db } from '../../../assets/js/firebase/firebase';
import { useNavigate } from 'react-router';
import AuthContext from '../../../assets/js/authentication/auth-context';
import createUserInfo from '../../../assets/js/authentication/createUserInfo';
export default function RegistrationPage() {
    const [mail, setMail] = useState('');
    const [pas, setPas] = useState('');
    const [error, setError] = useState('');
    const navigateTo = useNavigate();
    const authCtx = useContext(AuthContext);
    const ls = window.localStorage;
    const userInfo = createUserInfo();

    function processSubmit(e){
        e.preventDefault();
        createUserWithEmailAndPassword(auth, mail, pas)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid
            authCtx.setIsLoggedIn(true);
            authCtx.setUid(uid);
            const userLS = {
                isLoggedIn: true,
                uid: uid
            }
            ls.setItem("auth", JSON.stringify(userLS))
            ls.setItem("currentUser", JSON.stringify(user));
            set(ref(db, 'users/' + uid), userInfo).then(() => {
                console.log("set done!")
                
            })
            navigateTo('/profile')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(error.message)
        });
    }
    return (
        <>
                REGISTRATION
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
                {error && <p className="errMsg">{error}</p>}
        </>

    )
}