import { useEffect, useState } from "react"

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
        },
        female: {
            cal: 655,
            weightMultiplier: 11.6,
            heightMultiplier: 3.5,
            ageMultiplier: 4.7,
        },
    }

    // inputs
    const [inputGender, setInputGender] = useState(genders.male)
    const [inputAgeValue, setInputAgeValue] = useState(50)
    const [inputHeightValue, setInputHeightValue] = useState(180)
    const [inputWeightValue, setInputWeightValue] = useState(80)
    const [inputFatValue, setInputFatValue] = useState(1.1)
    const [inputActivityValue, setInputActivityValue] = useState(1)

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
    const [caloriesBurned, setCaloriesBurned] = useState(0)

    // food intake
    const [foodInput, setFoodInput] = useState("")
    const [foodGramsInput, setFoodGramsInput] = useState(0)
    const [caloriesConsumed, setCaloriesConsumed] = useState(0)

    // nutrients %
    const [carbsPercentage, setCarbsPercentage] = useState(0)
    const [proteinsPercentage, setProteinsPercentage] = useState(0)
    const [fatsPercentage, setFatsPercentage] = useState(0)
    const [fiberPercentage, setFiberPercentage] = useState(0)

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

    function calculateCaloriesBurned(e) {
        e.preventDefault()
        setCaloriesBurned(
            Math.round(
                caloriesBurned +
                    (exerciseSelectInput *
                        exerciseTimeInput *
                        inputWeightValue) /
                        150
            )
        )
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

            console.log(result[0].food.nutrients)

            // calories
            const calories =
                (result[0].food.nutrients.ENERC_KCAL * foodGramsInput) / 100
            setCaloriesConsumed(Math.round(caloriesConsumed + calories))

            // carbohydrates
            const carbohydrates =
                (result[0].food.nutrients.CHOCDF * foodGramsInput) / 100
            setCarbsPercentage(
                Math.round(carbsPercentage + (carbohydrates * 100) / carbsGrams)
            )

            // proteins
            const proteins =
                (result[0].food.nutrients.PROCNT * foodGramsInput) / 100
            setProteinsPercentage(
                Math.round(proteinsPercentage + (proteins * 100) / proteinGrams)
            )

            // fats
            const fats = (result[0].food.nutrients.FAT * foodGramsInput) / 100
            setFatsPercentage(
                Math.round(fatsPercentage + (fats * 100) / fatGrams)
            )
            // fiber
            const fiber =
                (result[0].food.nutrients.FIBTG * foodGramsInput) / 100
            setFiberPercentage(
                Math.round(fiberPercentage + (fiber * 100) / fiberGrams)
            )
        })
        e.target.reset()
    }

    useEffect(() => {
        calculateBmi()
        calculateCalorieIntake()
        calculateCarbs()
        calculateNutrients()
    })

    return (
        <>
            <section className="main__calc calc">
                {/* только для залогиненых */}
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
                            setExerciseSelectInput={setExerciseSelectInput}
                            setExerciseTimeInput={setExerciseTimeInput}
                        />
                    </form>
                    {/* только для залогиненых */}
                </div>
                <div className="main__calc--wrapper">
                    <DailyResults
                        caloriesBurned={caloriesBurned}
                        caloriesConsumed={caloriesConsumed}
                        carbsPercentage={carbsPercentage}
                        proteinsPercentage={proteinsPercentage}
                        fatsPercentage={fatsPercentage}
                        fiberPercentage={fiberPercentage}
                    />
                </div>
                <div className="main__calc--wrapper">
                    <form action="#">
                        <CalcInput
                            genders={genders}
                            setInputGender={setInputGender}
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
