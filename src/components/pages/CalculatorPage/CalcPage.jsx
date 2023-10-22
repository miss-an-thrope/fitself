import { useContext, useEffect, useRef, useState } from "react"
import useSaveData from "../../../assets/js/hooks/useSaveData"

// firebase
import { set, ref, get, child } from "firebase/database"
import { db } from "../../../assets/js/firebase/firebase"
import AuthContext from "../../../assets/js/authentication/auth-context"

// styles
import "../../../assets/scss/components/pages/CalculatorPage/_calc.scss"

// components
import CalcInput from "./CalcInput"
import BMI from "./BMI"
import Nutrients from "./Nutrients"
import FoodInput from "./FoodInput"
import ExerciseInput from "./ExerciseInput"
import DailyResults from "./DailyResults"

// api
import fetchFood from "../../../utils/api"

export default function CalcPage() {
    const currentDate = new Date().toISOString().slice(0, 10)
    // inputs config
    const inputType = {
        boolean: "boolean",
        range: "range",
        radio: "radio",
        select: "select",
    }

    const inputLabels = {
        age: "Age(years)",
        height: "Height(sm)",
        weight: "Weight(kg)",
        fat: "BodyFat(%)",
        activity: "Activity",
    }

    const inputRangeLimits = {
        age: 100,
        height: 250,
        weight: 200,
    }

    const genders = {
        male: {
            cal: 660,
            weightMultiplier: 13.7,
            heightMultiplier: 5,
            ageMultiplier: 6.8,
            gender: "male",
        },
        female: {
            cal: 655,
            weightMultiplier: 11.6,
            heightMultiplier: 3.5,
            ageMultiplier: 4.7,
            gender: "female",
        },
    }

    // firebase vars
    const ctx = useContext(AuthContext)
    const dbRef = ref(db)
    const dataFromDB = useRef(null)

    const ls = window.localStorage

    // inputs
    const [inputGender, setInputGender] = useSaveData(
        "gender",
        dataFromDB.current?.gender ??
            JSON.parse(ls.getItem("gender")) ??
            genders.male
    )

    const [inputAgeValue, setInputAgeValue] = useSaveData(
        "age",
        dataFromDB.current?.age ?? JSON.parse(ls.getItem("age")) ?? 30
    )

    const [inputHeightValue, setInputHeightValue] = useSaveData(
        "height",
        dataFromDB.current?.height ?? JSON.parse(ls.getItem("height")) ?? 180
    )

    const [inputWeightValue, setInputWeightValue] = useSaveData(
        "weight",
        dataFromDB.current?.calendar[currentDate]?.weight ??
            JSON.parse(ls.getItem("weight")) ??
            80
    )

    const [inputFatValue, setInputFatValue] = useSaveData(
        "bodyFat",
        dataFromDB.current?.bodyFat ?? JSON.parse(ls.getItem("bodyFat")) ?? 1
    )

    const [inputActivityValue, setInputActivityValue] = useSaveData(
        "activity",
        dataFromDB.current?.activity ?? JSON.parse(ls.getItem("activity")) ?? 1
    )

    // bmi
    const [bmi, setBmi] = useState(0)
    const [bmiIndicatorIndex, setBmiIndicatorIndex] = useState(0)

    // calories
    const [calorieIntake, setCalorieIntake] = useState(0)

    // nutrients
    const [carbs, setCarbs] = useState(50)
    const [protein, setProtein] = useState(30)
    const [fat, setFat] = useState(13)
    const [fiber, setFiber] = useState(7)
    // in grams
    const [carbsGrams, setCarbsGrams] = useState(0)
    const [proteinGrams, setProteinGrams] = useState(0)
    const [fatGrams, setFatGrams] = useState(0)
    const [fiberGrams, setFiberGrams] = useState(0)

    const caloriesInNutrient = {
        proteins: 4,
        fats: 9,
        carbs: 4,
        fiber: 2,
    }

    // exercise
    const [exerciseSelectInput, setExerciseSelectInput] = useState(0)
    const [exerciseTimeInput, setExerciseTimeInput] = useState(0)

    // food intake
    const [foodInput, setFoodInput] = useState("")
    const [foodGramsInput, setFoodGramsInput] = useState(0)

    const [calendar, setCalendar] = useSaveData("calendar", {
        [currentDate]: {
            weight: 0,
            waistSize: "not set",
            carbs: 0,
            proteins: 0,
            fats: 0,
            fiber: 0,
            consumedCalories: 0,
            burnedCalories: 0,
        },
    })

    function calculateCalorieIntake() {
        setCalorieIntake(
            Math.round(
                (inputGender.cal +
                    inputGender.weightMultiplier * inputWeightValue +
                    inputGender.heightMultiplier * inputHeightValue -
                    inputGender.ageMultiplier * inputAgeValue) *
                    inputActivityValue *
                    inputFatValue
            )
        )
    }

    function calculateBmi() {
        setBmi(
            Number(
                Math.round(
                    ((inputWeightValue /
                        (((inputHeightValue / 100) * inputHeightValue) / 100)) *
                        10) /
                        inputFatValue
                ) / 10
            )
        )
        if (bmi < 18.5) {
            setBmiIndicatorIndex(0)
        } else if (bmi > 18.5 && bmi < 24.9) {
            setBmiIndicatorIndex(1)
        } else if (bmi > 25 && bmi < 29.9) {
            setBmiIndicatorIndex(2)
        } else if (bmi > 30 && bmi < 34.9) {
            setBmiIndicatorIndex(3)
        } else if (bmi > 35 && bmi < 39.9) {
            setBmiIndicatorIndex(4)
        } else if (bmi > 40) {
            setBmiIndicatorIndex(5)
        }
    }

    function calculateCarbs() {
        setCarbs(100 - protein - fat - fiber)
    }

    function calculateNutrients() {
        setProteinGrams(
            Math.round(
                (protein * calorieIntake) / 100 / caloriesInNutrient.proteins
            )
        )
        setFatGrams(
            Math.round((fat * calorieIntake) / 100 / caloriesInNutrient.fats)
        )
        setCarbsGrams(
            Math.round((carbs * calorieIntake) / 100 / caloriesInNutrient.carbs)
        )
        setFiberGrams(
            Math.round((fiber * calorieIntake) / 100 / caloriesInNutrient.fiber)
        )
    }

    const [caloriesBurnedResultState, setCaloriesBurnedResultState] =
        useState(0)

    const [carbohydratesPresenrageState, setcarbohydratesPresenrageState] =
        useState(0)
    const [proteinsPresenrageState, setproteinsPresenrageState] = useState(0)
    const [fatsPresenrageState, setfatsPresenrageState] = useState(0)
    const [fiberPresenrageState, setfiberPresenrageState] = useState(0)
    const [caloriesConsumedResultState, setcaloriesConsumedResultState] =
        useState(0)

    function calculateCaloriesBurned(e) {
        e.preventDefault()
        const caloriesBurnedResult = Math.round(
            calendar[currentDate].burnedCalories +
                (exerciseSelectInput * exerciseTimeInput * inputWeightValue) /
                    150
        )
        setCaloriesBurnedResultState(caloriesBurnedResult)

        setCalendar({
            ...calendar,
            [currentDate]: {
                weight: 0,
                waistSize: "not set",
                carbs: carbohydratesPresenrageState,
                proteins: proteinsPresenrageState,
                fats: fatsPresenrageState,
                fiber: fiberPresenrageState,
                consumedCalories: caloriesConsumedResultState,
                burnedCalories: caloriesBurnedResult,
            },
        })
        e.target.reset()
    }

    function calculateFood(e) {
        e.preventDefault()
        fetchFood(foodInput).then(function (result) {
            if (result.length === 0) {
                // todo: show request error
                e.target.reset()
                return
            }

            // calories
            const calories =
                (result[0].food.nutrients.ENERC_KCAL * foodGramsInput) / 100
            const caloriesConsumedResult = Math.round(
                calendar[currentDate].consumedCalories + calories
            )
            setcaloriesConsumedResultState(caloriesConsumedResult)

            // carbohydrates
            const carbohydrates =
                (result[0].food.nutrients.CHOCDF * foodGramsInput) / 100
            const carbohydratesPresenrage = Math.round(
                calendar[currentDate].carbs + (carbohydrates * 100) / carbsGrams
            )
            setcarbohydratesPresenrageState(carbohydratesPresenrage)

            // proteins
            const proteins =
                (result[0].food.nutrients.PROCNT * foodGramsInput) / 100
            const proteinsPresenrage = Math.round(
                calendar[currentDate].proteins + (proteins * 100) / proteinGrams
            )
            setproteinsPresenrageState(proteinsPresenrage)

            // fats
            const fats = (result[0].food.nutrients.FAT * foodGramsInput) / 100
            const fatsPresenrage = Math.round(
                calendar[currentDate].fats + (fats * 100) / fatGrams
            )
            setfatsPresenrageState(fatsPresenrage)

            // fiber
            const fiber =
                (result[0].food.nutrients.FIBTG * foodGramsInput) / 100
            const fiberPresenrage = Math.round(
                calendar[currentDate].fiber + (fiber * 100) / fiberGrams
            )
            setfiberPresenrageState(fiber)

            setCalendar({
                ...calendar,
                [currentDate]: {
                    weight: 0,
                    waistSize: "not set",
                    carbs: carbohydratesPresenrage,
                    proteins: proteinsPresenrage,
                    fats: fatsPresenrage,
                    fiber: fiberPresenrage,
                    consumedCalories: caloriesConsumedResult,
                    burnedCalories: caloriesBurnedResultState,
                },
            })
        })
        e.target.reset()
    }

    useEffect(() => {
        calculateBmi()
        calculateCalorieIntake()
        calculateCarbs()
        calculateNutrients()

        if (!JSON.parse(ls.getItem("calendar"))[currentDate]) {
            setCalendar({
                ...JSON.parse(ls.getItem("calendar")),
                [currentDate]: {
                    weight: 0,
                    waistSize: "not set",
                    carbs: 0,
                    proteins: 0,
                    fats: 0,
                    fiber: 0,
                    consumedCalories: 0,
                    burnedCalories: 0,
                },
            })
        }

        // firebase
        if (ctx.isLoggedIn) {
            get(child(dbRef, `users/${ctx.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    dataFromDB.current = snapshot.val()
                }
            })
        }
    })

    return (
        <>
            <section className="main__calc calc">
                {ctx.isLoggedIn && (
                    <>
                        <div className="main__calc--wrapper">
                            <form onSubmit={(e) => calculateFood(e)}>
                                <FoodInput
                                    setFoodGramsInput={setFoodGramsInput}
                                    setFoodInput={setFoodInput}
                                />
                            </form>
                            <hr />
                            <form onSubmit={(e) => calculateCaloriesBurned(e)}>
                                <ExerciseInput
                                    setExerciseSelectInput={
                                        setExerciseSelectInput
                                    }
                                    setExerciseTimeInput={setExerciseTimeInput}
                                />
                            </form>
                        </div>

                        <div className="main__calc--wrapper">
                            <DailyResults
                                caloriesBurned={
                                    calendar[currentDate].burnedCalories
                                }
                                caloriesConsumed={
                                    calendar[currentDate].consumedCalories
                                }
                                carbsPercentage={calendar[currentDate].carbs}
                                proteinsPercentage={
                                    calendar[currentDate].proteins
                                }
                                fatsPercentage={calendar[currentDate].fats}
                                fiberPercentage={calendar[currentDate].fiber}
                            />
                        </div>
                    </>
                )}
                <div className="main__calc--wrapper">
                    <form action="#">
                        <CalcInput
                            genders={genders}
                            setInputGender={setInputGender}
                            inputGender={inputGender}
                            inputType={inputType.boolean}
                            calculateCalorieIntake={calculateCalorieIntake}
                        />
                        <CalcInput
                            inputType={inputType.range}
                            inputLabel={inputLabels.age}
                            inputValue={inputAgeValue}
                            setInputValue={setInputAgeValue}
                            calculateCalorieIntake={calculateCalorieIntake}
                            calculateBmi={calculateBmi}
                            limit={inputRangeLimits.age}
                            setFiber={setFiber}
                        />
                        <CalcInput
                            inputType={inputType.range}
                            inputLabel={inputLabels.height}
                            inputValue={inputHeightValue}
                            setInputValue={setInputHeightValue}
                            calculateCalorieIntake={calculateCalorieIntake}
                            calculateBmi={calculateBmi}
                            limit={inputRangeLimits.height}
                        />
                        <CalcInput
                            inputType={inputType.range}
                            inputLabel={inputLabels.weight}
                            inputValue={inputWeightValue}
                            setInputValue={setInputWeightValue}
                            calculateCalorieIntake={calculateCalorieIntake}
                            calculateBmi={calculateBmi}
                            limit={inputRangeLimits.weight}
                            setFat={setFat}
                        />
                        <CalcInput
                            inputType={inputType.radio}
                            inputLabel={inputLabels.fat}
                            inputValue={inputFatValue}
                            setInputValue={setInputFatValue}
                            calculateCalorieIntake={calculateCalorieIntake}
                        />
                        <CalcInput
                            inputType={inputType.select}
                            inputLabel={inputLabels.activity}
                            inputValue={inputActivityValue}
                            setInputValue={setInputActivityValue}
                            calculateCalorieIntake={calculateCalorieIntake}
                            calculateBmi={calculateBmi}
                            setProtein={setProtein}
                        />
                    </form>
                </div>
                <div className="main__calc--wrapper">
                    <h2>
                        your redommended calorie intake:{" "}
                        <span className="bold">{calorieIntake}</span>
                    </h2>
                    <hr />
                    <BMI bmi={bmi} bmiIndicatorIndex={bmiIndicatorIndex} />
                    <hr />
                    <Nutrients
                        protein={protein}
                        carbs={carbs}
                        fat={fat}
                        fiber={fiber}
                        proteinGrams={proteinGrams}
                        carbsGrams={carbsGrams}
                        fatGrams={fatGrams}
                        fiberGrams={fiberGrams}
                    />
                </div>
            </section>
        </>
    )
}
