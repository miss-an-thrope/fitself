import { createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../assets/js/firebase/firebase';
import { useNavigate } from 'react-router';


export default function RegistrationPage() {
    const [mail, setMail] = useState('');
    const [pas, setPas] = useState('');
    const navigateTo = useNavigate()
    function processSubmit(e){
        e.preventDefault();
        createUserWithEmailAndPassword(auth, mail, pas)
        .then((userCredential) => {
            navigateTo('/profile')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
      
        });
    }
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid)
        // ...
    } else {
        // User is signed out
        // ...
    }
    });
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
        </>

    )
}