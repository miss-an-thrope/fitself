import "../../../assets/scss/components/pages/SignInPage/_login.scss"

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../../assets/js/firebase/firebase"
import { useContext } from "react"
import AuthContext from "../../../assets/js/authentication/auth-context"
import { useNavigate } from "react-router-dom"

export default function SignInPage() {
    const [mail, setMail] = useState("")
    const [pas, setPas] = useState("")
    const [error, setError] = useState("")
    const authCtx = useContext(AuthContext)
    const ls = window.localStorage
    const navigateTo = useNavigate()
    function processSubmit(e) {
        e.preventDefault()
        signInWithEmailAndPassword(auth, mail, pas)
            .then((userCredential) => {
                const user = userCredential.user
                const uid = user.uid
                authCtx.setIsLoggedIn(true)
                authCtx.setUid(uid)
                const userLS = {
                    isLoggedIn: true,
                    uid: uid,
                }
                ls.setItem("auth", JSON.stringify(userLS))
                ls.setItem("currentUser", JSON.stringify(auth.currentUser))
                navigateTo("/profile")
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                setError(error.message)
                // ..
            })
    }

    return (
        <>
            <h2 className="recipes__header">Sign in</h2>
            <form className="auth-form" onSubmit={processSubmit}>
                <label>
                    E-mail:
                    <input
                        type="text"
                        name="username"
                        autoComplete="username"
                        aria-hidden="true"
                        className="hidden-input"
                        style={{ display: "none" }}
                    />
                    <input
                        type="mail"
                        name="mail"
                        autoComplete="username"
                        required
                        onChange={(e) => {
                            setMail(e.target.value)
                            setError("")
                        }}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        required
                        onChange={(e) => {
                            setPas(e.target.value)
                            setError("")
                        }}
                    />
                </label>
                <input
                    type="submit"
                    className="btn btn-active"
                    value="Submit"
                />
            </form>
            {error && <p className="errMsg">{error}</p>}
        </>
    )
}
