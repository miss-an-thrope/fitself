function DailyResults({
    caloriesBurned,
    caloriesConsumed,
    carbsPercentage,
    proteinsPercentage,
    fatsPercentage,
    fiberPercentage,
}) {
    return (
        <div>
            <div className="main__calc--results">
                <h2>
                    calories consumed:
                    <span className="bold"> {caloriesConsumed}</span>
                </h2>
                <h2>
                    calories burned:
                    <span className="bold"> {caloriesBurned}</span>
                </h2>
            </div>
            <hr />
            <div className="main__calc--results">
                <h2 className="nutrient-red">
                    carbohydrates:
                    <span className="bold"> {carbsPercentage}</span>%
                </h2>
                <h2 className="nutrient-blue">
                    proteins:{" "}
                    <span className="bold"> {proteinsPercentage}</span>%
                </h2>
                <h2 className="nutrient-yellow">
                    fats: <span className="bold">{fatsPercentage}</span>%
                </h2>
                <h2 className="nutrient-green">
                    fiber: <span className="bold">{fiberPercentage}</span>%
                </h2>
            </div>
        </div>
    )
}

export default DailyResults
