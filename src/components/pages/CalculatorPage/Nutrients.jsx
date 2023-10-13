function Nutrients() {
    return (
        <div className="nutrients">
            <div className="nutrients__chart"></div>
            <ul className="nutrients__list">
                <li className="nutrients__list-item">
                    Proteins{" "}
                    <span className="nutrients__list-item--grams">5g</span>
                </li>
                <li className="nutrients__list-item">
                    Fats <span className="nutrients__list-item--grams">5g</span>
                </li>
                <li className="nutrients__list-item">
                    Carbohydrates{" "}
                    <span className="nutrients__list-item--grams">5g</span>
                </li>
                <li className="nutrients__list-item">
                    Fiber{" "}
                    <span className="nutrients__list-item--grams">5g</span>
                </li>
            </ul>
        </div>
    )
}

export default Nutrients
