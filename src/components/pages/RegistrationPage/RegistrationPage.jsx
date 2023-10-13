import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import app from '/src/assets/js/firebase/firebase';
import { useState } from 'react';
const auth = getAuth(app);



export default function RegistrationPage() {
    const [mail, setMail] = useState('');
    const [pas, setPas] = useState('');
    const changePas = () => {setPas()}
    function processSubmit(e){
        e.preventDefault();
        console.log(`Processing form. Mail: ${mail}, Pas: ${pas}`)
        console.log(mail)
        createUserWithEmailAndPassword(auth, mail, pas)
        .then((userCredential) => {
            console.log(userCredential)
            const user = userCredential.user;
            user.metadata = ["some metadata"]
            console.log(user.metadata)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
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
                "REGISTRATION"
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