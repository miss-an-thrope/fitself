import { useContext, useEffect, useState } from "react"
import { set, ref } from "firebase/database"
import { db } from "../firebase/firebase"
import AuthContext from "../authentication/auth-context"

function useSaveData(key, initialValue) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
    })

    const ctx = useContext(AuthContext)

    useEffect(() => {
        if (ctx.isLoggedIn) {
            set(ref(db, "users/" + ctx.uid + `/${key}`), value).then(() => {
                console.log(`${key} updated`)
            })
        }

        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value, ctx.uid, ctx.isLoggedIn])

    return [value, setValue]
}

export default useSaveData
