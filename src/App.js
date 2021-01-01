import { Route, BrowserRouter } from "react-router-dom";
import Recipes from "./components/Recipes";
import RecipeInfo from "./components/RecipeInfo";
import RecipeSearch from "./components/RecipeSearch"

function App() {
  return (
    <div>
      <BrowserRouter>    
        <Route path="/" exact component={Recipes} />
        <Route path="/recipeInfo/:id" component={RecipeInfo} />
        <Route path="/recipeSearch/:query" component={RecipeSearch} />
      </BrowserRouter>
    </div>
  );
}

export default App;
