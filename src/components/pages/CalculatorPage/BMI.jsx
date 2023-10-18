function BMI({ bmi, bmiIndicatorIndex }) {
    return (
        <div>
            <h2>your BMI : {bmi}</h2>

            <ul className="bmi__list">
                <li>
                    <span
                        className={
                            bmiIndicatorIndex === 0
                                ? "bmi__indicator bmi__indicator--active"
                                : "bmi__indicator"
                        }
                    ></span>
                    <span className="bmi__indicator--label">Underweight</span>
                </li>
                <li>
                    <span
                        className={
                            bmiIndicatorIndex === 1
                                ? "bmi__indicator bmi__indicator--active"
                                : "bmi__indicator"
                        }
                    ></span>
                    <span className="bmi__indicator--label">Normal weight</span>
                </li>
                <li>
                    <span
                        className={
                            bmiIndicatorIndex === 2
                                ? "bmi__indicator bmi__indicator--active"
                                : "bmi__indicator"
                        }
                    ></span>
                    <span className="bmi__indicator--label">Overweight</span>
                </li>
                <li>
                    <span
                        className={
                            bmiIndicatorIndex === 3
                                ? "bmi__indicator bmi__indicator--active"
                                : "bmi__indicator"
                        }
                    ></span>
                    <span className="bmi__indicator--label">
                        Obesity, Grade 1
                    </span>
                </li>
                <li>
                    <span
                        className={
                            bmiIndicatorIndex === 4
                                ? "bmi__indicator bmi__indicator--active"
                                : "bmi__indicator"
                        }
                    ></span>
                    <span className="bmi__indicator--label">
                        Obesity, Grade 2
                    </span>
                </li>
                <li>
                    <span
                        className={
                            bmiIndicatorIndex === 5
                                ? "bmi__indicator bmi__indicator--active"
                                : "bmi__indicator"
                        }
                    ></span>
                    <span className="bmi__indicator--label">
                        Morbid Obesity
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default BMI
