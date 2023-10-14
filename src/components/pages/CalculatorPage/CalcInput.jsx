import { useEffect, useRef, useState } from "react"

function CalcInput({
    inputType,
    inputLabel,
    inputValue,
    genders,
    setInputGender,
    calculateCalorieIntake,
    setInputValue,
    limit,
    calculateBmi,
}) {
    const [fatPercentage, setFatPercentage] = useState("5%")

    function handleGenderInputBoolean(e, chosenGender) {
        e.preventDefault()
        setInputGender(chosenGender)
        Array.from(e.target.parentElement.children).forEach((button) => {
            button.classList.remove("btn-active")
        })
        e.target.classList.add("btn-active")

        calculateCalorieIntake()
    }
    function handleRangeInput(e) {
        setInputValue(Number(e.target.value))
        calculateCalorieIntake()
        calculateBmi()
    }
    function handleRadioInput(e) {
        setInputValue(Number(e.target.getAttribute("data-value")))

        Array.from(e.target.parentElement.parentElement.children).forEach(
            (img) => {
                img.children[0].style.opacity = 0.6
            }
        )
        e.target.previousElementSibling.style.opacity = 1
        calculateCalorieIntake()
    }

    useEffect(() => {
        switch (inputValue) {
            case 1.1:
                setFatPercentage("5%")
                break
            case 1.05:
                setFatPercentage("15%")
                break
            case 1:
                setFatPercentage("20%")
                break
            case 0.95:
                setFatPercentage("30%")
                break
            case 0.9:
                setFatPercentage("40+%")
                break
        }
    }, [inputValue, fatPercentage])
    return (
        <>
            {(() => {
                switch (inputType) {
                    case "boolean":
                        return (
                            <>
                                <div className="calc__input">
                                    <button
                                        onClick={(e) =>
                                            handleGenderInputBoolean(
                                                e,
                                                genders.male
                                            )
                                        }
                                        className="btn btn-active"
                                    >
                                        Male
                                    </button>
                                    <button
                                        onClick={(e) =>
                                            handleGenderInputBoolean(
                                                e,
                                                genders.female
                                            )
                                        }
                                        className="btn"
                                    >
                                        Female
                                    </button>
                                </div>
                            </>
                        )
                    case "range":
                        return (
                            <>
                                <div className="calc__input">
                                    <label
                                        className="calc__input--label"
                                        htmlFor="age"
                                    >
                                        {inputLabel}
                                    </label>
                                    <input
                                        className="calc__input--range"
                                        type="range"
                                        min={1}
                                        max={limit}
                                        name="age"
                                        id="age"
                                        defaultValue={inputValue}
                                        onChange={(e) => handleRangeInput(e)}
                                    />
                                    <span className="calc__input--value">
                                        {inputValue}
                                    </span>
                                </div>
                            </>
                        )
                    case "radio":
                        return (
                            <>
                                <div className="calc__input">
                                    <label className="calc__input--label">
                                        {inputLabel}
                                    </label>
                                    <fieldset>
                                        <div className="calc__input--radio">
                                            <img src="../../../src/assets/img/fat/1.svg" />
                                            <input
                                                type="radio"
                                                name="fat"
                                                data-value="1.1"
                                                onChange={(e) =>
                                                    handleRadioInput(e)
                                                }
                                            />
                                        </div>
                                        <div className="calc__input--radio">
                                            <img src="../../../src/assets/img/fat/2.svg" />
                                            <input
                                                type="radio"
                                                name="fat"
                                                data-value="1.05"
                                                onChange={(e) =>
                                                    handleRadioInput(e)
                                                }
                                            />
                                        </div>
                                        <div className="calc__input--radio">
                                            <img src="../../../src/assets/img/fat/3.svg" />
                                            <input
                                                type="radio"
                                                name="fat"
                                                data-value="1"
                                                onChange={(e) =>
                                                    handleRadioInput(e)
                                                }
                                            />
                                        </div>
                                        <div className="calc__input--radio">
                                            <img src="../../../src/assets/img/fat/4.svg" />
                                            <input
                                                type="radio"
                                                name="fat"
                                                data-value="0.95"
                                                onChange={(e) =>
                                                    handleRadioInput(e)
                                                }
                                            />
                                        </div>
                                        <div className="calc__input--radio">
                                            <img src="../../../src/assets/img/fat/5.svg" />
                                            <input
                                                type="radio"
                                                name="fat"
                                                data-value="0.9"
                                                onChange={(e) =>
                                                    handleRadioInput(e)
                                                }
                                            />
                                        </div>
                                    </fieldset>
                                    <span className="calc__input--value">
                                        {fatPercentage}
                                    </span>
                                </div>
                            </>
                        )
                    case "select":
                        return (
                            <>
                                <div className="calc__input">
                                    <label className="calc__input--label">
                                        {inputLabel}
                                    </label>
                                    <select
                                        onChange={(e) => handleRangeInput(e)}
                                        name="activity"
                                        id="activity"
                                    >
                                        <option value="0.8">Low</option>
                                        <option value="1">Medium</option>
                                        <option value="1.2">High</option>
                                        <option value="1.4">Very high</option>
                                    </select>
                                </div>
                            </>
                        )
                }
            })()}
        </>
    )
}

export default CalcInput
