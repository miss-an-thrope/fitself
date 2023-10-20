import { useEffect, useState } from "react"

function CalcInput({
    inputType,
    inputLabel,
    inputValue,
    genders,
    setInputGender,
    inputGender,
    calculateCalorieIntake,
    setInputValue,
    limit,
    calculateBmi,
    setFiber,
    setProtein,
    setFat,
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

        if (Number(e.target.getAttribute("max")) === 100) {
            setFiber(1 + Number(e.target.value) * 0.07)
        } else if (Number(e.target.getAttribute("max")) === 200) {
            setFat(13 - Number(e.target.value) * 0.02)
        } else if (e.target.nodeName === "SELECT") {
            setProtein(28 + Number(e.target.value) * 3)
        }

        // todo: if weight

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
                                        className={`${
                                            inputGender.gender ==
                                            genders.male.gender
                                                ? "btn btn-active"
                                                : "btn"
                                        }`}
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
                                        className={`${
                                            inputGender.gender ==
                                            genders.female.gender
                                                ? "btn btn-active"
                                                : "btn"
                                        }`}
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
                                    <label className="calc__input--label">
                                        {inputLabel}
                                    </label>
                                    <input
                                        className="calc__input--range"
                                        type="range"
                                        min={1}
                                        max={limit}
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
                                                src="https://firebasestorage.googleapis.com/v0/b/fitself-93859.appspot.com/o/1.svg?alt=media&token=dc49ca34-579a-4fea-b867-83ba45afa3d8&_gl=1*v9n5mf*_ga*MjE0MzkzNTc3NS4xNjk3MDU2ODYx*_ga_CW55HF8NVT*MTY5NzgxNzY0OC40Ni4xLjE2OTc4MTgxNTcuNjAuMC4w"
                                                style={
                                                    inputValue == "1.1"
                                                        ? { opacity: 1 }
                                                        : { opacity: 0.6 }
                                                }
                                            />
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
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/fitself-93859.appspot.com/o/2.svg?alt=media&token=2aed60fc-0114-494b-8f65-36c9a32ec1ed&_gl=1*1c50pda*_ga*MjE0MzkzNTc3NS4xNjk3MDU2ODYx*_ga_CW55HF8NVT*MTY5NzgxNzY0OC40Ni4xLjE2OTc4MTgxODAuMzcuMC4w"
                                                style={
                                                    inputValue == "1.05"
                                                        ? { opacity: 1 }
                                                        : { opacity: 0.6 }
                                                }
                                            />
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
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/fitself-93859.appspot.com/o/3.svg?alt=media&token=dd4635cb-b9a8-4cfd-bff3-edf0572de0c6&_gl=1*1tisgx5*_ga*MjE0MzkzNTc3NS4xNjk3MDU2ODYx*_ga_CW55HF8NVT*MTY5NzgxNzY0OC40Ni4xLjE2OTc4MTgxOTUuMjIuMC4w"
                                                style={
                                                    inputValue == "1"
                                                        ? { opacity: 1 }
                                                        : { opacity: 0.6 }
                                                }
                                            />
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
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/fitself-93859.appspot.com/o/4.svg?alt=media&token=906b47d1-9896-4d0a-ad7d-416c71c5df78&_gl=1*w3rp2e*_ga*MjE0MzkzNTc3NS4xNjk3MDU2ODYx*_ga_CW55HF8NVT*MTY5NzgxNzY0OC40Ni4xLjE2OTc4MTgyMDYuMTEuMC4w"
                                                style={
                                                    inputValue == "0.95"
                                                        ? { opacity: 1 }
                                                        : { opacity: 0.6 }
                                                }
                                            />
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
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/fitself-93859.appspot.com/o/5.svg?alt=media&token=45ec39a8-45c1-40c1-9639-f208a7b6cb48&_gl=1*jhjt3w*_ga*MjE0MzkzNTc3NS4xNjk3MDU2ODYx*_ga_CW55HF8NVT*MTY5NzgxNzY0OC40Ni4xLjE2OTc4MTgyMTguNjAuMC4w"
                                                style={
                                                    inputValue == "0.9"
                                                        ? { opacity: 1 }
                                                        : { opacity: 0.6 }
                                                }
                                            />
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
                                        value={inputValue}
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
