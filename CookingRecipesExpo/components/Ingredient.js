import React from 'react';
import {TextInput, Button, View, TouchableOpacity, Image, Text, Picker} from 'react-native';
import styles from '../styles/createRecipeStyles';


const Ingredient = (props) => {

    let {recipe, setRecipe} = props;

    let [ingredient, setIngredient] = React.useState({name : '', quantity : '', unit : '' });
    const [toEdits, setToEdits] = React.useState([]);
    // const ingList = [];
    const [unit, setUnit] = React.useState('g');


    const handleChange = async (key,value) => {
        console.log('handleChange triggered in <Ingredient>')
        await setIngredient({...ingredient, [key] : value});
        // console.log('updating ingredient handleChange in <Ingredient/>', ingredient);
    }

    const handlePicker = async (u) => {
        console.log('handlepicker triggered', unit);
        await setUnits(u)
    }



    const handleBlur = async (event) => {
        console.log('handleBlur triggered in <Ingredient/>');
        const ingArr = Object.values(ingredient);
        const fullIng = ingArr.filter(i => !!i);
        if (fullIng.length === 3) {
         await setToEdits([...toEdits, ingredient]);
        //  ingList.push(ingredient);
         console.log('ingList in <Ingredient/>', toEdits);
         console.log('recipe.ingredients in <Ingredient/>', recipe.ingredients);
         console.log('ingredient in <Ingredient/>', ingredient);
         const recipeIng = [...recipe.ingredients];

         for (let i=0; i<toEdits.length; i++) {
            for (let j=0; j<recipeIng.length; j++) {
              if (toEdits[i].name === recipeIng[j].name) {
                recipeIng.splice(j,1);
              }
            }
          }

        console.log('recipeIng after splicing', recipeIng);

          
           await setRecipe({...recipe, ingredients: [...recipeIng, ingredient]})
        }
    }


    return  (
        <View>
            <View style = {{ flexDirection: 'row', width: 350, marginBottom: 20}}>
                <TextInput
                    style={{ height: 40, width: "16%", borderWidth: 0.8, borderColor: '#363838', borderRadius: 4, textAlign: 'center', marginLeft: 14 }}
                    placeholder="Amount"
                    keyboardType={'numeric'}
                    onChangeText ={event => handleChange('quantity', event)}
                    onBlur={handleBlur}
                    value={ingredient.quantity}
                />
                
                <TextInput
                    style={{ height: 40, width: "16%", borderWidth: 0.8, borderColor: '#363838', borderRadius: 4, textAlign: 'center', marginLeft: "3%"  }}
                    placeholder="Unit"
                    onChangeText ={event => handleChange('unit', event)}
                    onBlur={handleBlur}
                    value={ingredient.unit}
                />



                <TextInput
                    style={{ height: 40, width: "42%", borderWidth: 0.8, borderColor: '#363838', borderRadius: 4, textAlign: 'center', marginLeft: "3%", marginRight: 14  }}
                    placeholder="Ingredient Name"
                    // onChangeText ={event => addIng({...ingredient, name: event})}
                    onChangeText ={event => handleChange('name', event)}
                    onBlur={handleBlur}
                    value={ingredient.name}
                />

            </View>

            <View style = {{alignItems: 'center'}}> 

            </View>
        </View>
    
    )
}

export default Ingredient;