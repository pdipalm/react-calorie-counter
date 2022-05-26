import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Stack';
import AddBoxIcon from '@mui/icons-material/AddBox';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

export function Interface() {

    /*states for changing labels above textfields*/
    const [mfocused, setmFocused] = useState(false);
    const [cfocused, setcFocused] = useState(false);

    /*textfield width*/
    const TfWidth = 400;

    var calSum = 0;

    return (
        <Box className="interfaceContainer">
            <Stack className="outerStack">
                <Paper>
                    <br />
                    <Stack>
                        <Container style={{fontSize: "24px"}}>Add Meal / Food Item</Container>
                        <br />
                        <Stack direction="row" alignItems="center" justifyContent="space-evenly">
                            <Stack>
                                <Container style={{ fontSize: "14px", color: mfocused ? 'blue' : ''}}>
                                    <Box>meal</Box>
                                    <TextField id="interfaceTF" placeholder="Add item" variant="standard" shrink="true" style={{ width: TfWidth }}
                                        onFocus={() => setmFocused(true)}
                                        onBlur={() => setmFocused(false)}
                                    />
                                </Container>
                            </Stack>

                            <Stack>
                                <Container style={{ fontSize: "14px", color: cfocused ? 'blue' : '' }}>
                                    <Box>calories</Box>
                                    <TextField id="interfaceTF" placeholder="Add calories" variant="standard" shrink="true" style={{ width: TfWidth }} type="number"
                                        onFocus={() => setcFocused(true)}
                                        onBlur={() => setcFocused(false)}
                                    />
                                </Container>
                            </Stack>
                        </Stack>
                        <br />
                        <AddButton startIcon={<AddBoxIcon />}>
                            ADD MEAL
                        </AddButton>
                    </Stack>
                    <br />
                    <br />
                </Paper>
            </Stack>
            <br />
            <br />
            <Container>
                <h3>Total Calories: {calSum}</h3>
            </Container>
        </Box>    
    )
}

const AddButton = styled(Button) (() => ({
    color: 'white',
    left: 20,
    width: 130,
    backgroundColor: '#1565C0',
    '&:hover': {
        backgroundColor: '#1565C0',
    },
}));

/*<Button variant="outlined"
    sx={{
        
    }}
    >
    ADD MEAL
</Button>*/


export default Interface