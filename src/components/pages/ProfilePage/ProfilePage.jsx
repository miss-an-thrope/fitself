import { useEffect, useState } from "react";
import { auth } from "../../../assets/js/firebase/firebase";
import { updateProfile } from "firebase/auth";
export default function ProfilePage(){
    const ls = window.localStorage;
    const currentUser = JSON.parse(ls.getItem("currentUser"));
    const name = currentUser.displayName;
    const email = currentUser.email
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
                        <td>{}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>Age</td>
                    </tr>
                    
                </tbody>
            </table>

        </>
            
            
    )
}