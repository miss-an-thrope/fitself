import './updateDataStyle.scss'
export default function UpdateDataPage(){
    function processSubmit(){

    };

    return(
        <form onSubmit={processSubmit}>
            <label>
                Your name
                <input type="text" name="name" id="name" />
            </label>
            <label>
                Your age
                <input type="number" name="age" id="age" />
            </label>
            <label>
                Your height
                <input type="number" name="height" id="height" /> cm
            </label>
            <label>
                Your weight
                <input type="number" name="weight" id="weight" /> kg
            </label>
            <label>
                Your waist size
                <input type="number" name="waist" id="waist" /> cm
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}