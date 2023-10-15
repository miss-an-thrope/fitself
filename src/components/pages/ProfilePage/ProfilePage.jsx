import { auth } from "../../../assets/js/firebase/firebase";
import { updateProfile } from "firebase/auth";
export default function ProfilePage(){
    let currentUser;
    let userName = "Guest";
    let email = "";
    if(auth.currentUser){
        currentUser = auth.currentUser;
        userName = currentUser.displayName;
        email = currentUser.email;
        let providerData = currentUser.providerData;
        // providerData.push({
        //     weight: 76,
        //     height: 176,
        // })
        // console.log(currentUser)
        // updateProfile(currentUser, {
        //     displayName: "Jane Q. User",
        //     providerData : providerData,
        //   }).then(() => {
        //     console.log("Profile updated!")
        //     //...
        //   }).catch((error) => {
        //     // An error occurred
        //     // ...
        //   });
    }

    return(
        <>
            <h1>Hello, {userName ? userName : email}</h1>
            <table>
                <thead>
                    <tr>
                    <th colSpan="2">Your info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{userName ? userName : "Not entered"}</td>
                        <td>Height</td>
                        <td>Weight</td>
                        <td>Body fat</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>Age</td>
                        <td>Height</td>
                        <td>Weight</td>
                        <td>Body fat</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>Age</td>
                        <td>Height</td>
                        <td>Weight</td>
                        <td>Body fat</td>
                    </tr>
                    
                </tbody>
            </table>

        </>
            
            
    )
}