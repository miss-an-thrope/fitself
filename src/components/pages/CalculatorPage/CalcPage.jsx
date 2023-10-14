// styles
import { useEffect, useState } from "react"
import "../../../assets/scss/components/pages/CalculatorPage/_calc.scss"
import CalcInput from "./CalcInput"
import BMI from "./BMI"
import Nutrients from "./Nutrients"

export default function CalcPage() {
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
            weightMultiplier: 9.6,
            heightMultiplier: 1.8,
            ageMultiplier: 4.7,
        },
    }

    const [inputGender, setInputGender] = useState(genders.male)
    const [inputAgeValue, setInputAgeValue] = useState(50)
    const [inputHeightValue, setInputHeightValue] = useState(180)
    const [inputWeightValue, setInputWeightValue] = useState(80)
    const [inputFatValue, setInputFatValue] = useState(1.1)
    const [inputActivityValue, setInputActivityValue] = useState(1)

    const [bmi, setBmi] = useState(0)

    const [bmiIndicatorIndex, setBmiIndicatorIndex] = useState(0)

    const [calorieIntake, setCalorieIntake] = useState(0)

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
                    (inputWeightValue /
                        (((inputHeightValue / 100) * inputHeightValue) / 100)) *
                        10
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
        } else {
            setBmiIndicatorIndex(5)
        }
    }

    useEffect(() => {
        calculateBmi()
        calculateCalorieIntake()
    })

    return (
        <>
            <section className="main__calc calc">
                <div className="main__calc--wrapper">
                    <h2>Body weight calculator</h2>
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
                        />
                    </form>
                </div>
                <div className="main__calc--wrapper">
                    <h2>Results</h2>
                    <BMI bmi={bmi} bmiIndicatorIndex={bmiIndicatorIndex} />
                    <h2>your redommended calorie intake: {calorieIntake}</h2>
                    <Nutrients />
                </div>
            </section>
        </>
    )
}
