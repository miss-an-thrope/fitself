function ExerciseInput({ setExerciseSelectInput, setExerciseTimeInput }) {
    return (
        <div className="main__calc--results">
            <select
                onChange={(e) => setExerciseSelectInput(e.target.value)}
                name="exercise"
                id="exercise"
            >
                <option value="0">Choose exercise</option>
                <option value="4.4">Aerobics</option>
                <option value="7.8">Basketball</option>
                <option value="9.9">Boxing</option>
                <option value="7.8">Calisthenics</option>
                <option value="9.8">Cycling</option>
                <option value="2.9">Diving</option>
                <option value="8.8">Football</option>
                <option value="3.9">Gymnastics</option>
                <option value="9.7">Martial arts</option>
                <option value="11.3">Running</option>
                <option value="10.8">Swimming</option>
                <option value="5.6">Table tennis</option>
                <option value="2.4">Walking</option>
                <option value="5.9">Weight lifting</option>
            </select>
            <input
                type="number"
                placeholder="time in minutes"
                name="amount"
                id="amount"
                onChange={(e) => setExerciseTimeInput(e.target.value)}
            />
            <button type="submit" className="btn btn-red">
                🔥 burn
            </button>
        </div>
    )
}

export default ExerciseInput
