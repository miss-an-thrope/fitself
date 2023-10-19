function FoodInput({ setFoodGramsInput, setFoodInput }) {
    return (
        <div className="main__calc--results">
            <input
                type="text"
                placeholder="type in food"
                name="food"
                id="food"
                onChange={(e) => setFoodInput(e.target.value)}
            />
            <input
                type="number"
                placeholder="amount in grams"
                name="amount"
                id="amount"
                onChange={(e) => setFoodGramsInput(e.target.value)}
            />
            <button type="submit" className="btn btn-blue">
                🍴 eat
            </button>
        </div>
    )
}

export default FoodInput
