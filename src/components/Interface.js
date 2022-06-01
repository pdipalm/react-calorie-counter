import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Stack';
import AddBoxIcon from '@mui/icons-material/AddBox';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


export function Interface() {

    const [mealItems, updateMealItems] = useState(JSON.parse(localStorage.getItem('meal-list')) || []);
    const [calSum, setCalSum] = useState(JSON.parse(localStorage.getItem('cal-sum')) || 0);

    /*React.useEffect(() => {
        const mealDataOnLoad = localStorage.getItem('meal-list');
        const calSumOnLoad = localStorage.getItem('cal-sum');
        if (mealDataOnLoad != null) {
            updateMealItems(JSON.parse(mealDataOnLoad));
            setCalSum(JSON.parse(calSumOnLoad));
        }
    }, []);*/

    React.useEffect(() => {
        localStorage.setItem('meal-list', JSON.stringify(mealItems));
        localStorage.setItem('cal-sum', calSum)
    }, [mealItems, calSum]);
    
    
    const AddButton = styled(Button) (() => ({
        color: 'white',
        left: 20,
        width: 130,
        backgroundColor: '#1565C0',
        '&:hover': {
            backgroundColor: '#1565C0',
        },
    }));
    
    function handleAddMeal(name, cal_count) {
        console.log("addmeal handler called");
    
        let newItems = mealItems;
    
        newItems.push({
            foodName: name,
            calories: cal_count
        });

        updateMealItems([...newItems]);

        setCalSum(parseInt(calSum) + parseInt(newItems[newItems.length-1].calories));

        console.log(mealItems);
    }
    
    const MealItem = ({index, foodName, calories}) => {
        return(
            <ListItem key={index}>
                <strong>{foodName}:</strong>
                <em>{calories} Calories</em>
            </ListItem>
        )
    }
    
    const MealList = () => {
        return(
            <List>
                {mealItems.map((item, i) => (
                    <MealItem
                        key= {i}
                        foodName= {item.foodName}
                        calories= {item.calories}
                    ></MealItem>
                ))}
            </List>
        )
    }
    

    /*states for changing labels above textfields*/
    const [mfocused, setmFocused] = useState(false);
    const [cfocused, setcFocused] = useState(false);

    var [mealText, setMealText] = useState();
    var [calText, setCalText] = useState();
    /*textfield width*/
    /*const TfWidth = 400;*/

    return (
        <Box className="interfaceContainer">
            <Stack className="outerStack">
                <Paper>
                    <br />
                    <Stack justifyContent="left">
                        <Container style={{fontSize: "24px", paddingLeft: "22px", margin:"0px", textAlign: "left"}}>Add Meal / Food Item</Container>
                        <br />
                        <Stack direction="row" /*alignItems="left"*/ justifyContent="space-evenly">
                            <Stack>
                                <Container style={{ fontSize: "14px", color: mfocused ? 'blue' : ''}}>
                                    <Box>meal</Box>
                                    <TextField id="interfaceTF" placeholder="Add item" variant="standard" /*shrink="true"*/ style={{ width: '200%' }}
                                        onFocus={() => setmFocused(true)}
                                        onBlur={() => setmFocused(false)}
                                        onChange={(mealText) => setMealText(mealText.target.value)}
                                    />
                                </Container>
                            </Stack>
                            
                            <Stack>
                                <Container style={{ fontSize: "14px", color: cfocused ? 'blue' : '' }}>
                                    <Box>calories</Box>
                                    <TextField id="interfaceTF" placeholder="Add calories" variant="standard" /*shrink="true"*/ style={{ width: '200%' }} type="number"
                                        onFocus={() => setcFocused(true)}
                                        onBlur={() => setcFocused(false)}
                                        onChange={(calText) => setCalText(calText.target.value)}
                                    />
                                </Container>
                            </Stack>
                        </Stack>
                        <br />
                        <AddButton startIcon={<AddBoxIcon />} onClick={() => {
                            handleAddMeal(mealText, calText);
                        }}>
                            ADD MEAL
                        </AddButton>
                    </Stack>
                    <br />
                    <br />
                </Paper>
            </Stack>
            <br />
            <br />
            <Container style={{
                textAlign: "center",
                fontSize: "2.92rem"
            }}>
                <h3>Total Calories: {calSum}</h3>
            </Container>
            <MealList />
        </Box>    
    )
}



/*function MealList() {
    return(
        <List>
            <ListItem><MealItem foodName="j" calories="12" /></ListItem>
            <ListItem><MealItem foodName="p" calories="15" /></ListItem>
        </List>
    )
}*/
export default Interface