import { PokeDex } from "@atosjs/pokemon";
import { useState, useEffect } from "react"
import { LineGraph } from "./LineGraph";

export default function App() {
    // A list of every pokemon
    const [allPokes, setAllPokes] = useState(null)

    // State to track calculated curve stats and mons
    const [paretoCurve, setParetoCurve] = useState(null)
    const [pCurveStat1, setPCurveStat1] = useState("")
    const [pCurveStat2, setPCurveStat2] = useState("")

    // Accessing all the pokemon we want
    const pokedex = new PokeDex()
    useEffect(() => {

        async function getMons() {
            // NOTE: CURRENT LIST IS HARD CODED FOR UP TO GEN 9 DLC!
            let pokeList = await pokedex.fetch({ id: [...Array(1026).keys()].splice(1) })
            setAllPokes(pokeList)
        }

        getMons();

    }, [])

    // Calculating Pareto Optimality
    function calculateOptimal(formData) {
        // Creating a 255 x 255 2D array
        let fillOutArr = Array.from({ length: 256 }, () => Array.from({ length: 256 }, () => []))
        // This is so stupid looking. 
        // Array.from treating an obj with a length property as actually being that long is so dumb

        // Getting the chosen stats to optimize
        const stat1 = formData.get("stat1")
        const stat2 = formData.get("stat2")
        const statToVal = new Map();
        statToVal.set("HP", 0)
        statToVal.set("Attack", 1)
        statToVal.set("Defense", 2)
        statToVal.set("Special Attack", 3)
        statToVal.set("Special Defense", 4)
        statToVal.set("Speed", 5)

        // Radix sort style, inserts all pokemon as graph cords into the 3D array
        allPokes.forEach(pokemon => {

            // Compiles each base stats into a simple list
            let selectArray = Object.values(pokemon.base_stats)

            // Getting base stats off form data
            let base1 = selectArray[statToVal.get(stat1)]
            let base2 = selectArray[statToVal.get(stat2)]

            // Inserts a pokemon into the 3d array
            fillOutArr[base1][base2].push({
                name: pokemon.name,
                x: base1,
                y: base2
            })
        })

        // Every pokemon on the pareto optimal curve
        let winnersOnTheCurve = []

        // Traversing from the best down
        for (let i = 255; i > 0; i--) {
            for (let j = 255; j > 0; j--) {
                if (fillOutArr[i][j].length != 0) {
                    let len = winnersOnTheCurve.length
                    // Adding every pokemon who proves themselves optimal
                    if (len == 0 || j > winnersOnTheCurve[len - 1].y) {
                        fillOutArr[i][j].forEach(pokemon => winnersOnTheCurve.push(pokemon))
                    }
                    break;
                }
            }
        }

        // Giving our found pareto optimal mons to the be graphed
        setParetoCurve(winnersOnTheCurve)
        setPCurveStat1(stat1)
        setPCurveStat2(stat2)
    }


    return (
        <>
            <h1>
                Pokemon Pareto V2
            </h1>

            {/*A form that is available once all the mons are gotten*/}
            {allPokes && <form action={calculateOptimal}>
                <label htmlFor="stat1">Stat 1</label>
                <select id="stat1" name="stat1">
                    <option value={"HP"}>hp</option>
                    <option value={"Attack"}>atk</option>
                    <option value={"Defense"}>def</option>
                    <option value={"Special Attack"}>sp atk</option>
                    <option value={"Special Defense"}>sp def</option>
                    <option value={"Speed"}>speed</option>
                </select>
                <label htmlFor="stat2">Stat 2</label>
                <select id="stat2" name="stat2">
                    <option value={"HP"}>hp</option>
                    <option value={"Attack"}>atk</option>
                    <option value={"Defense"}>def</option>
                    <option value={"Special Attack"}>sp atk</option>
                    <option value={"Special Defense"}>sp def</option>
                    <option value={"Speed"}>speed</option>
                </select>
                <button>Get Curve</button>
            </form>}

            {/* Shows the graph once some results are gotten */}
            {paretoCurve && <LineGraph
                stat1 = {pCurveStat1}
                stat2 = {pCurveStat2}
                winners = {paretoCurve}
            />}
        </>
    )
}