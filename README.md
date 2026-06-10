This is a simple web app used to calculate Pareto optimality for Pokémon given 2 base stats.

This app was inspired by a Java version (Pokemon Pareto V1) I made before going to college. That version is a mess of logic, yet I did hand-craft a complex dataset for it. Because I did not use version control for it and made so many arbitrary decisions, I figured I'd make V2, now via React.

Note: many nuances of the dex are not accounted for:
- Pokemon stats and types are only their latest versions as of Gen 9
- Only Pokemon up to Gen 9 DLC are included
- Megas are excluded, vital abilities are ignored, different forms (such as Rotom forms) are gone, etc
- Meltan and Melmetal are considered Gen 8, Hisui Pokemon are considered Gen 9
- And I am sure there is a lot more I am missing. In this case, I blame the dataset.

Important packages to shout out:
- ChartJS - used for the graphs
- @atosjs/pokemon - used for the pokedex

To use: after downloading the repo, cd into the poke-pareto-v2 folder. From there, you can run: npm run dev.

Final note: I created this app over two days just for fun. Thus, I did not put in a lot of time on styling. Apologies in advance for any issues with my not-so-responsive design.
