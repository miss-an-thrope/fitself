export default function createUserInfo() {
    const date = new Date().toISOString().slice(0, 10)
    const userInfo = {
        age: "not set",
        height: "height not set yet",
        gender: "not set",
        bodyFat: "not set",
        activity: "not set",
        initialWeight: "not set",
        initialWaistSize: "not set",
        weight: "not set",
        calendar: {},
    }
    userInfo.calendar[date] = {
        weight: 0,
        waistSize: "not set",
        carbs: 0,
        proteins: 0,
        fats: 0,
        fiber: 0,
        consumedCalories: 0,
        burnedCalories: 0,
    }
    return userInfo
}
