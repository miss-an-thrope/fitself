import { useEffect, useState } from "react";
import { db } from "../../../assets/js/firebase/firebase";
import { updateProfile } from "firebase/auth";
import {ref, onValue, get, child } from "firebase/database";
import { NavLink } from "react-router-dom";
export default function ProfilePage(){
    const ls = window.localStorage;
    const currentUser = JSON.parse(ls.getItem("currentUser"));
    const uid = currentUser.uid;
    
    const [name, setName] = useState(currentUser.providerData[0].displayName);
    const [email, setEmail] = useState(currentUser.email);
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [waistSize, setWaistSize] = useState("")
    
    useEffect(() => {
        const dbRef = ref(db);
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const userInfo = snapshot.val();
            setName(userInfo.name)
            setAge(userInfo.age);
            setHeight(userInfo.height);
            setWeight(userInfo.initialWeight);
            setWaistSize(userInfo.initialWaistSize)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
        
    }, [])
    return(
        <>
            <h1>Hello, {name ? name : email}</h1>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Your info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{name ? name : "not set"}</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{age ? age : "not set"}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>{height ? height : "not set"}</td>
                    </tr>
                    <tr>
                        <td>Your start weight</td>
                        <td>{weight ? weight : "not set"}</td>
                    </tr>
                    <tr>
                        <td>Your start waist size</td>
                        <td>{waistSize ? waistSize : "not set"}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"><NavLink to="/updateUsersData">Update data</NavLink></td>
                    </tr> 
                </tbody>
            </table>

        </>
            
            
    )
}