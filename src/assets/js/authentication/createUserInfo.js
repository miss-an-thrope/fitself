export default function createUserInfo(){
    const date = new Date().getTime();
    const userInfo = {
        name: "not set",
        age: "not set",
        height: "height not set yet", 
        initialWeight: "not set",
        initialWaistSize: "not set",
        calendar: {}
    }
    userInfo.calendar[date] = {
        weight: "not set",
        waistSize: "not set",
    }
    return userInfo;
}