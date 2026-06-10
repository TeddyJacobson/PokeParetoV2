// Utility Packages
import { PokeDex } from "@atosjs/pokemon";
import { useState, useEffect } from "react"
import { LineGraph } from "./LineGraph";

// Styling Packages
import "./app.css"

// All types in pokemon
const types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water']


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
    function calculateOptimal(event) {
        // Pivot to form data (RIP action)
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

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

        // Getting the chosen types to optimize
        const checkTypeMap = new Map()
        for (let i = 0; i < types.length; i++) {
            checkTypeMap.set(types[i], formData.get(types[i]))
        }


        // Radix sort style, inserts all pokemon as graph cords into the 3D array
        allPokes.forEach(pokemon => {
            // Check mon is valid
            let isValid = true

            // Check types
            pokemon.type.forEach(type => {
                if (checkTypeMap.get(type) == null) {
                    isValid = false;
                }
            })

            // Check gens
            let id = pokemon.id
            if (id < 152) {
                if (formData.get('gen1') == null) {
                    isValid = false
                }
            }
            else if (id < 252) {
                if (formData.get('gen2') == null) {
                    isValid = false
                }
            }
            else if (id < 387) {
                if (formData.get('gen3') == null) {
                    isValid = false
                }
            }
            else if (id < 494) {
                if (formData.get('gen4') == null) {
                    isValid = false
                }
            }
            else if (id < 650) {
                if (formData.get('gen5') == null) {
                    isValid = false
                }
            }
            else if (id < 722) {
                if (formData.get('gen6') == null) {
                    isValid = false
                }
            }
            else if (id < 808) {
                if (formData.get('gen7') == null) {
                    isValid = false
                }
            }
            else if (id < 899) {
                if (formData.get('gen8') == null) {
                    isValid = false
                }
            }
            else {
                if (formData.get('gen9') == null) {
                    isValid = false
                }
            }

            if (isValid) {
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
            }

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
        <main className="background">

            <header>
                <h1>
                    Pokemon Pareto V2
                </h1>
            </header>

            <section>

                {/* Loading indicator */}
                {!allPokes && <h2>Now loading...</h2>}

                {/*A form that is available once all the mons are gotten*/}
                {allPokes && <form onSubmit={calculateOptimal} className="filters">
                    {/* First row of req info */}
                    <section className="filters__required">
                        <div>
                            <label htmlFor="stat1">Stat 1: </label>
                            <select id="stat1" name="stat1">
                                <option value={"HP"}>hp</option>
                                <option value={"Attack"}>atk</option>
                                <option value={"Defense"}>def</option>
                                <option value={"Special Attack"}>sp atk</option>
                                <option value={"Special Defense"}>sp def</option>
                                <option value={"Speed"}>speed</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="stat2">Stat 2: </label>
                            <select id="stat2" name="stat2">
                                <option value={"HP"}>hp</option>
                                <option value={"Attack"}>atk</option>
                                <option value={"Defense"}>def</option>
                                <option value={"Special Attack"}>sp atk</option>
                                <option value={"Special Defense"}>sp def</option>
                                <option value={"Speed"}>speed</option>
                            </select>
                        </div>

                        <button>Get Frontier</button>
                    </section>

                    <br></br>

                    {/* Additional checkbox filters */}
                    <section >
                        <label htmlFor="types" className="filters__check-box-intro">Permitted Types: </label>
                        <div id="types" className="filters__check-box">
                            {types.slice(0, 9).map(givenType => {
                                return (<div key={givenType}>
                                    <label htmlFor={givenType}>{givenType}:</label>
                                    <input type="checkbox" name={givenType} id={givenType} defaultChecked />
                                </div>)
                            })}
                        </div>
                        <div id="types" className="filters__check-box">
                            {types.slice(9).map(givenType => {
                                return (<div key={givenType}>
                                    <label htmlFor={givenType}>{givenType}:</label>
                                    <input type="checkbox" name={givenType} id={givenType} defaultChecked />
                                </div>)
                            })}
                        </div>

                        <br></br>

                        <label htmlFor="gens" className="filters__check-box-intro">Permitted Generations: </label>
                        <div id="types" className="filters__check-box">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(givenGen => {
                                return (<div key={givenGen}>
                                    <label htmlFor={`gen${givenGen}`}>{`${givenGen}:`}</label>
                                    <input type="checkbox" name={`gen${givenGen}`} id={`gen${givenGen}`} defaultChecked />
                                </div>)
                            })}
                        </div>


                    </section>



                </form>}

            </section>

            {/* Shows the graph once some results are gotten */}
            {paretoCurve && <LineGraph
                stat1={pCurveStat1}
                stat2={pCurveStat2}
                winners={paretoCurve}
            />}
        </main>
    )
}