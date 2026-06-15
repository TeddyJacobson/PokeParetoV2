<h1>Introduction</h1>

This is a simple web app used to calculate Pareto optimality for Pokémon given 2 base stats.

This app was inspired by a Java version (Pokemon Pareto V1) I made before going to college. That version is a mess of logic, I did not use version control for it, and made a ton arbitrary decisions on it's own custom dataset (very complex). Thus, I figured I'd make V2, now via JS/React.

To practice my knowledge of JS/React and HTML, I used generative AI tools as little as possible. I only used it a couple of times when I encountered some aspect of JS or ChartJS that I could not believe (because it was so silly) the syntax of. The main instance of this can be seen in the creation of my algorithms 3d array.

Important packages to shout out:
- ChartJS - used for the graphs
- @atosjs/pokemon - used for the Pokedex

Final note: I created this app over two days just for fun. Thus, I did not put in a lot of time into the styling. Apologies in advance for any issues caused by my not-so-responsive design.


<h1>Limitations</h1>

Many nuances of the dex are not accounted for:
- Pokemon stats and types are only their latest versions as of Gen 9
- Only Pokemon up to Gen 9 DLC are included
- Megas are excluded, vital abilities are ignored, different forms (such as Rotom forms) are gone, etc
- Meltan and Melmetal are considered Gen 8, Hisui Pokemon are considered Gen 9
- I am sure there is a lot more I am missing. In this case, I blame the dataset...


<h1>To Use</h1>

1. Download the repo
2. Cd into the poke-pareto-v2 folder
3. In terminal, run: npm run dev
1. Open the local web hosted page and have fun
