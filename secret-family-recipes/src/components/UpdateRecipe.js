import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GetRecipesContext } from "../App";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// get with id to put 
// set component state to selected recipe (see lines 34 - 41)
// test render in with a Link in another file...
const initialRecipeInfo = {
    name: "",
    source: "",
    category: "Breakfast",
    ingredientAmount: "",
    ingredientName: "",
    instructionStepNum: "",
    instruction: "",
    ingredients: [],
    instructions: []
};

const EditRecipe = () => {
    const [recipeInfo, setRecipeInfo] = useState(initialRecipeInfo);
    const [ingredientAmount, setIngredientAmount] = useState("");
    const [ingredientName, setIngredientName] = useState("");
    const [instructionStepNum, setInstructionStepNum] = useState("");
    const [instruction, setInstruction] = useState("");

    const { push } = useHistory();

    const { id } = useParams();

    const { getRecipes } = useContext(GetRecipesContext);
     // const getRecipes = useContext(GetRecipesContext).getRecipes;

    // set component state to selected recipe
    useEffect( () => {
      console.log(id);
      axiosWithAuth()
        .get(`/api/recipes/${id}`)
        .then( (res) => {
          console.log("get from update", res.data);
          // Check on appropriate response to set to state!
          setRecipeInfo(res.data)
        })
        .catch( (err) => console.log(err));
    }, [id]);

/////////////INGREDIENT-STATE SETTERS//////////////////

    const handleIngredientNameInput = (e) => {
        setIngredientName(e.target.value);
    };

    const handleIngredientAmountInput = (e) => {
        setIngredientAmount(e.target.value);
    };

////////////INSTRUCTION-STATE SETTERS//////////////////

     const handleInstructionStepNumInput = (e) => {
        setInstructionStepNum(e.target.value);
    };

    const handleInstructionInstructionInput = (e) => {
        setInstruction(e.target.value);
    };

////////////NAME- AND CATEGORY-STATE SETTER//////////////

    const handleChanges = (e) => {
        setRecipeInfo({
            ...recipeInfo,
            [e.target.name]: e.target.value
        });
    };

    // set to "Add New Ingredient" button onClick
    const handleIngredientInput = (e) => {
        console.log("handleIngredientInput called");
        e.preventDefault();
        setRecipeInfo({
            ...recipeInfo,
            ingredients: [
                ...recipeInfo.ingredients, 
                {name: ingredientName, amount: ingredientAmount}
            ]
        });
        setIngredientName("");
        setIngredientAmount("");
    };
    
    // set to "Add New Instruction" button onClick
    const handleInstructionInput = (e) => {
        console.log("handleInstructionInput called");
        e.preventDefault();
        setRecipeInfo({
            ...recipeInfo,
            instructions: [
                ...recipeInfo.instructions, 
                {stepNum: instructionStepNum, name: instruction}
            ]
        });
        setInstructionStepNum("");
        setInstruction("");
    };

    // to post the final added recipe
    // (with ingredients and instructions arrays)
    const handleSubmit = (e) => {
        console.log("from handleSubmit", recipeInfo.ingredients);
        const newRecipe = {
            name: recipeInfo.name, 
            source: recipeInfo.source,
            category: recipeInfo.category, 
            ingredients: recipeInfo.ingredients,
            instructions: recipeInfo.instructions
        }
        // console.log("newRecipe", newRecipe);
        e.preventDefault();
        axiosWithAuth()  
            .put(`/api/recipes/${id}`, newRecipe)
            .then( (res) => {
                console.log(res.data)
                getRecipes();
                push("/protected");
            })
            .catch( (err) => console.log(err));
    };

    return (
        <div>
            <form className="add-edit-recipe-forms" onSubmit={handleSubmit}>
                <h1>Update A Recipe Here:</h1>

                <div className="add-edit-form-wrappers">
                    <h2>Recipe Name:</h2>
                    <input 
                        type="text"
                        name="name"
                        onChange={handleChanges}
                        placeholder="Name"
                        value={recipeInfo.name}
                    />
                </div>

                <div className="add-edit-form-wrappers">
                    <h2>Recipe source:</h2>
                    <input 
                        type="text"
                        name="source"
                        onChange={handleChanges}
                        placeholder="Source"
                        value={recipeInfo.source}
                    />
                </div>

                <div className="add-edit-form-wrappers">
                    <h2>Recipe Category:</h2>
                    <select
                        className="dropdown"
                        name="category"
                        onChange={handleChanges}
                        value={recipeInfo.category}
                    >
                        <option value="category: breakfast">Breakfast</option>
                        <option value="category: lunch">Lunch</option>
                        <option value="category: dinner">Dinner</option>
                        <option value="category: dessert">Dessert</option>
                    </select>
                </div>

                {/*
                  {recipeInfo.ingredients.map((ingredient) => {
                    return(<div>{ingredient.name} {ingredient.amount}</div>)
                    };
                  */}

                <div className="add-edit-form-wrappers">
                <h2>Ingredient Amount:</h2>

                    <input
                        type="text"
                        name="ingredientAmount"
                        onChange={handleIngredientAmountInput}
                        placeholder="ingredient amount"
                        value={ingredientAmount}
                    />

                <h2>Ingredient Name:</h2>

                    <input
                        type="text"
                        name="ingredientName"
                        onChange={handleIngredientNameInput}
                        placeholder="ingredient name"
                        value={ingredientName}
                    />

                </div>
                {/* intended to set <ingredients: []> to state */}
                <button className="form-button" onClick={handleIngredientInput}>Add New Ingredient</button>

                <div className="add-edit-form-wrappers">
                    <h2>Step Number:</h2>

                    <input
                        type="text"
                        name="instructionStepNum"
                        onChange={handleInstructionStepNumInput}
                        placeholder="step number"
                        value={instructionStepNum}
                    />

                    <h2>Step Procedure:</h2>

                    <input
                        type="text"
                        name="instruction"
                        onChange={handleInstructionInstructionInput}
                        placeholder="instruction"
                        value={instruction}
                    />

                </div>
                {/* intended to set <instructions: []> to state */}
                <button className="form-button" onClick={handleInstructionInput}>Add New Instruction</button>
                <br />
                <button className="add-new-recipe-button">Submit Recipe Edit</button>
            </form>
        </div>
    );
};

export default EditRecipe;