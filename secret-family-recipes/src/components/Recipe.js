import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { RecipeContext } from "../App";

// NOTES:
// 1. Recipe Title can go in Card.Header
// 2. Recipe Source can go in Card.Meta
// 3. Recipe Ingredients, Instructions, and Category can have there own Card.Description sections.
// 4. The two buttons "Approve" and "Decline" can be converted to "Update" and "Delete" so that we can pass down the update and delete functions to this card.
// 5. Props need to be passed in to the function parentheses to bring data in from Recipes.js.

const Recipe = (props) => {
  const { push } = useHistory();
  const { setRecipes } = useContext(RecipeContext);

  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          <Card.Header> Recipe Title: {props.recipe.name}</Card.Header>
          <Card.Meta>Recipe Source: {props.recipe.source}</Card.Meta>
          <Card.Description>
            Category: <strong>{props.recipe.category}</strong>
          </Card.Description>
          {props.recipe.ingredients.length > 0 ? (
            props.recipe.ingredients.map((ing) => {
              console.log(ing);
              return (
                <Card.Description>
                  Ingredient:{" "}
                  <strong>
                    {ing.name} {ing.amount}
                  </strong>
                </Card.Description>
              );
            })
          ) : (
            <Card.Description>There are no ingredients</Card.Description>
          )}
          {props.recipe.instructions.length > 0 ? (
            props.recipe.instructions.map((inst) => {
              console.log(inst);
              return (
                <Card.Description>
                  Instructions:{" "}
                  <strong>
                    {inst.stepNum} {inst.name}
                  </strong>
                </Card.Description>
              );
            })
          ) : (
            <Card.Description>There are no ingredients</Card.Description>
          )}
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              onClick={() => push(`/UpdateRecipe/${props.recipe.id}`)}
            >
              Edit
            </Button>
            <Button
              basic
              color="red"
              onClick={() => {
                axiosWithAuth()
                  .delete(`/api/recipes/${props.recipe.id}`)
                  .then((res) => {
                    axiosWithAuth()
                      .get("/api/recipes")
                      .then((res) => {
                        setRecipes(res.data.recipes);
                      })
                      .catch(console.log);
                  })
                  .catch(console.log);
              }}
            >
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};
export default Recipe;
