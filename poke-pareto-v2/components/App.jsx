import { PokeDex } from "@atosjs/pokemon";
import { useState, useEffect } from "react"

export default function App() {
    // A list of every pokemon
    const [allPokes, setAllPokes] = useState(null)

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


    return (
        <>
            <h1>
                Pokemon Pareto V2
            </h1>
            {allPokes && <>
                <h2>This is a test</h2>
            </>}
        </>
    )
}