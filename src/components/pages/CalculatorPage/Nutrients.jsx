import { useEffect, useRef } from "react"

function Nutrients({
    protein,
    carbs,
    fat,
    fiber,
    proteinGrams,
    carbsGrams,
    fatGrams,
    fiberGrams,
}) {
    const nutrientsChart = useRef(null)
    function updateChart() {
        nutrientsChart.current.style.setProperty("--protein", protein)
        nutrientsChart.current.style.setProperty("--fat", fat)
        nutrientsChart.current.style.setProperty("--carbs", carbs)
        nutrientsChart.current.style.setProperty("--fiber", fiber)
    }
    useEffect(updateChart)
    return (
        <div className="nutrients">
            <div ref={nutrientsChart} className="nutrients__chart">
                <div className="nutrients__chart--hole"></div>
            </div>
            <ul className="nutrients__list">
                <li className="nutrients__list-item">
                    Carbohydrates
                    <span className="nutrients__list-item--grams">
                        {carbsGrams}g
                    </span>
                </li>
                <li className="nutrients__list-item">
                    Proteins
                    <span className="nutrients__list-item--grams">
                        {proteinGrams}g
                    </span>
                </li>
                <li className="nutrients__list-item">
                    Fats
                    <span className="nutrients__list-item--grams">
                        {fatGrams}g
                    </span>
                </li>

                <li className="nutrients__list-item">
                    Fiber
                    <span className="nutrients__list-item--grams">
                        {fiberGrams}g
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Nutrients
