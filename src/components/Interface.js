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
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


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

        if(name == null || cal_count == null){  //checking for user errors
            console.log("null");
            return;
        }
    
        let newItems = mealItems;
    
        newItems.push({     
            foodName: name,
            calories: cal_count
        });

        // updateMealItems([...newItems]);     //update state with new mealItem

        setCalSum(parseInt(calSum) + parseInt(newItems[newItems.length-1].calories));  // add new calories to old sum and update state

        mealInput.current.value = "";       //reset textfields
        calInput.current.value = "";

        setCalText(null);                   //reset onChange handler states
        setMealText(null);

        console.log(mealItems);      

        
    }
    
    const MealItem = ({id, foodName, calories}) => {
        return(
            <Box>
                <Divider />
                <ListItem key={id}>
                    <strong>{foodName}:{'\u00A0'}</strong>
                    <em>{calories} Calories</em>
                    <IconButton style={{left: '98%', position: 'absolute'}} onClick={() => { handleEdit(id, calories, foodName) }}><EditIcon /></IconButton>
                </ListItem>
                <Divider />
            </Box>
        )
    }
    
    const MealList = () => {
        return(
            <List>
                {mealItems.map((item, i) => (
                    <MealItem
                        key= {i}
                        id = {i}
                        foodName= {item.foodName}
                        calories= {item.calories}
                    ></MealItem>
                ))}
            </List>
        )
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(-1);
    const [editingCalCount, setEditingCalCount] = useState(-1);
    const [editingName, setEditingName] = useState(null);

    function handleEdit(id, calories, foodName){
        console.log('editing',{id});
        setEditingId(id);
        setEditingCalCount(calories);
        setEditingName(foodName);
        if(isEditing){
            setIsEditing(false);
            return;
        }
        setIsEditing(true);
    }
    const ButtonHandler = () => {   
        if(isEditing){
            return(
                <Stack direction='row' alignItems='flex-start' spacing={2}>
                    <div />
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'orange',
                            float: 'right',
                        }}
                        onClick = {() => {updateMeal()}}
                    >UPDATE MEAL</Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'red',
                            float: 'right',
                        }}
                       onClick = {() =>  {deleteMeal()}}
                    >DELETE MEAL</Button>
                </Stack>
            )
        }
       
        return(
            <AddButton startIcon={<AddBoxIcon />} onClick={() => {
                handleAddMeal(mealText, calText);
            }}>
                ADD MEAL
            </AddButton>
        )
        
    }
    const [isUpdating, setUpdating] = useState(false);
    function updateMeal(){
        console.log('update clicked');
        if(!isUpdating){
            console.log('1st press');
            mealInput.current.value = editingName;
            calInput.current.value = editingCalCount;
            setUpdating(true);
            return;
        }
        console.log('2nd press');
        
        
        let newItems = mealItems;
        var oldCals = 0;
        oldCals = editingCalCount;
        // newItems.splice(editingId, 1, {id: editingId, foodName: editingName, calCount: editingCalCount});
        // console.log(newItems);

        // mealItems[editingId] = {id: editingId, foodName: editingName, calCount: editingCalCount}
        console.log('look at dis - ', calInput.current.value)
        newItems.splice(editingId, 1, {id: editingId, foodName: mealInput.current.value, calories: calInput.current.value});
        localStorage.setItem('meal-list', JSON.stringify(newItems));

        // console.log(mealItems);
        
        // setCalSum(parseInt(calSum)+(parseInt(calInput.current.value) - parseInt(oldCals)))

        console.log(oldCals);
        setCalSum(parseInt(calSum)+(parseInt(calInput.current.value)-parseInt(oldCals)));

        //setCalSum()

        setUpdating(false);
        setIsEditing(false);
        mealInput.current.value = "";
        calInput.current.value = "";
    }
    
    function deleteMeal(){
        console.log('delete ', editingId);
        if(editingId === -1){
            console.log('delete failed');
            return;
        }
        // let newItems = mealItems;
        // newItems.splice(editingId, 1);      
        updateMealItems(mealItems.filter((o, i) => editingId !== i));
        setCalSum(calSum-editingCalCount);
        setIsEditing(false);
        setEditingId(-1);
    }

    /*states for changing labels above textfields*/
    const [mfocused, setmFocused] = useState(false);
    const [cfocused, setcFocused] = useState(false);

    const [mealText, setMealText] = useState();
    const [calText, setCalText] = useState();

    const mealInput = React.useRef(null);
    const calInput = React.useRef(null);

    return (
        <Box className="interfaceContainer">
            <Stack className="outerStack">
                <Paper>
                    <br />
                    <Stack justifyContent="left">
                        <Container style={{fontSize: "24px", paddingLeft: "22px", margin:"0px", textAlign: "left"}}>Add Meal / Food Item</Container>
                        <br />
                        <Stack direction="row" alignItems="stretch" /*justifyContent="space-around"*/>
                            <Stack>
                                <Container style={{ fontSize: "14px", color: mfocused ? 'blue' : ''}}>
                                    <Box>meal</Box>
                                    <TextField id="interfaceTF" placeholder="Add item" variant="standard" fullWidth style={{ width: '100%' }}
                                        onFocus={() => setmFocused(true)}
                                        onBlur={() => setmFocused(false)}
                                        onChange={(mealText) => setMealText(mealText.target.value)}
                                        inputRef={mealInput}
                                    />
                                </Container>
                            </Stack>
                            
                            <Stack>
                                <Container style={{ fontSize: "14px", color: cfocused ? 'blue' : '' }}>
                                    <Box>calories</Box>
                                    <TextField id="interfaceTF" placeholder="Add calories" variant="standard" fullWidth style={{ width: '100%' }} type="number"
                                        onFocus={() => setcFocused(true)}
                                        onBlur={() => setcFocused(false)}
                                        onChange={(calText) => setCalText(calText.target.value)}
                                        inputRef={calInput}
                                    />
                                </Container>
                            </Stack>
                        </Stack>
                        <br />
                        <ButtonHandler />
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

export default Interface