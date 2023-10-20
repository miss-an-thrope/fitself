import './updateDataStyle.scss'
import { set, ref, get, child} from 'firebase/database';
import { db } from '../../../assets/js/firebase/firebase';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../assets/js/authentication/auth-context';
import { useNavigate } from 'react-router';

function UpdateDataPage(){
    const ctx = useContext(AuthContext);
    const navigateTo = useNavigate();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [height,setHeight] = useState(""); 
    const [waist,setWaist] = useState("");
    const [weight, setWeight] = useState("");

    function processSubmit(e){
        e.preventDefault();
        const name = e.target.name.value;    
        const age = e.target.age.value;    
        const height = e.target.height.value;    
        const weight = e.target.weight.value;    
        const waist = e.target.waist.value;
        set(ref(db, 'users/' + ctx.uid + "/name"), name)
          .then(() => {console.log("Name updated")})
        set(ref(db, 'users/' + ctx.uid + "/age"), age)
          .then(() => {console.log("Age updated")})
        set(ref(db, 'users/' + ctx.uid + "/height"), height)
          .then(() => {console.log("height updated")})
        set(ref(db, 'users/' + ctx.uid + "/initialWeight"), weight)
          .then(() => {console.log("weight updated")})
        set(ref(db, 'users/' + ctx.uid + "/initialWaistSize"), waist)
          .then(() => {console.log("waist updated")})
          navigateTo("/profile")

    }
    function setFormValues(){
        const dbRef = ref(db);
        get(child(dbRef, `users/${ctx.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
                const dataFromDB = snapshot.val();
                console.log(ctx)
                setName(dataFromDB.name ? dataFromDB.name : "not set")
                setAge(dataFromDB.age ? dataFromDB.age : "not set")
                setWeight(dataFromDB.initialWeight ? dataFromDB.initialWeight : "not set")
                setHeight(dataFromDB.height ? dataFromDB.height : "not set")
                setWaist(dataFromDB.initialWaistSize ? dataFromDB.initialWaistSize : "not set")
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
       
    }
    useEffect(() => {setFormValues()}, [])
    
    return(
        <>
            <h1>Your initial data</h1>
            <form id="updateUserDataForm" onSubmit={processSubmit}>
                <label>
                    Your name
                    <input type="text" name="name" id="name"  value = {name} onChange={(e)=> {setName(e.target.value)}}/>
                </label>
                <label>
                    Your age
                    <input type="number" name="age" id="age" value = {age} onChange={(e)=> {setAge(e.target.value)}}/>
                </label>
                <label>
                    Your height
                    <input type="number" name="height" id="height" value={height} onChange={(e)=> {setHeight(e.target.value)}}/> cm
                </label>
                <label>
                    Your weight
                    <input type="number" name="weight" id="weight" value={weight} onChange={(e)=> {setWeight(e.target.value)}}/> kg
                </label>
                <label>
                    Your waist size
                    <input type="number" name="waist" id="waist" value={waist} onChange={(e)=> {setWaist(e.target.value)}}/> cm
                </label>
                <input type="submit" value="Submit" />
            </form>
            
        </>
    )
}

export default UpdateDataPage;