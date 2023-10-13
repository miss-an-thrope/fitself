import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import app from '/src/assets/js/firebase/firebase';
export default function RegistrationPage() {
    const auth = getAuth(app);
    function processSubmit(e){
        e.preventDefault();
        console.dir(e.target.children)
    }
    return (
        <>
                "REGISTRATION"
                <form onSubmit={processSubmit}>
                        <label>
                            Mail
                            <input type="mail" name="mail" />
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password" />
                        </label>
                        <input type="submit" value="Submit" />
                </form>
        </>

    )
}