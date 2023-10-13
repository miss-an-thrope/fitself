import { useState } from "react"

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
        switch (inputValue) {
            case 1.1:
                setFatPercentage("5%")
                break
            case 1.15:
                setFatPercentage("15%")
                break
            case 1.2:
                setFatPercentage("20%")
                break
            case 1.25:
                setFatPercentage("30%")
                break
            case 1.3:
                setFatPercentage("40+%")
                break
        }

        Array.from(e.target.parentElement.parentElement.children).forEach(
            (img) => {
                img.children[0].style.opacity = 0.6
            }
        )
        e.target.style.opacity = 1
        calculateCalorieIntake()
    }
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
                                            <img
                                                onClick={(e) =>
                                                    handleRadioInput(e)
                                                }
                                                data-value="1.1"
                                                src="../../../src/assets/img/fat/1.svg"
                                            />
                                        </div>
                                        <div className="calc__input--radio">
                                            <img
                                                onClick={(e) =>
                                                    handleRadioInput(e)
                                                }
                                                data-value="1.15"
                                                src="../../../src/assets/img/fat/2.svg"
                                            />
                                        </div>
                                        <div className="calc__input--radio">
                                            <img
                                                onClick={(e) =>
                                                    handleRadioInput(e)
                                                }
                                                data-value="1.2"
                                                src="../../../src/assets/img/fat/3.svg"
                                            />
                                        </div>
                                        <div className="calc__input--radio">
                                            <img
                                                onClick={(e) =>
                                                    handleRadioInput(e)
                                                }
                                                data-value="1.25"
                                                src="../../../src/assets/img/fat/4.svg"
                                            />
                                        </div>
                                        <div className="calc__input--radio">
                                            <img
                                                onClick={(e) =>
                                                    handleRadioInput(e)
                                                }
                                                data-value="1.3"
                                                src="../../../src/assets/img/fat/5.svg"
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
                                        <option value="1.2">Low</option>
                                        <option value="1.4">Medium</option>
                                        <option value="1.6">High</option>
                                        <option value="1.8">Very high</option>
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
