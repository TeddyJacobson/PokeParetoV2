This is a simple web app used to calculate Pareto optimality for Pokémon given 2 base stats.

This app was inspired by a Java version (Pokemon Pareto V1) I made before going to college. That version is a mess of logic, I did not use version control for it, and made a ton arbitrary decisions on it's own custom dataset (very complex). Thus, I figured I'd make V2, now via JS/React.

Note: many nuances of the dex are not accounted for:
- Pokemon stats and types are only their latest versions as of Gen 9
- Only Pokemon up to Gen 9 DLC are included
- Megas are excluded, vital abilities are ignored, different forms (such as Rotom forms) are gone, etc
- Meltan and Melmetal are considered Gen 8, Hisui Pokemon are considered Gen 9
- I am sure there is a lot more I am missing. In this case, I blame the dataset...

Important packages to shout out:
- ChartJS - used for the graphs
- @atosjs/pokemon - used for the Pokedex

To use: after downloading the repo, cd into the poke-pareto-v2 folder. From there, you can: npm run dev.

Final note: I created this app over two days just for fun. Thus, I did not put in a lot of time into the styling. Apologies in advance for any issues caused by my not-so-responsive design.
