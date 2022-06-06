/*the header for calorie counter, contains text and clear all button*/

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


function clearAll(){
    localStorage.clear()
    window.location.reload(false);
}

const Header = () => {
    return (
        <Box className='headerContainer'>

            <h1>Calorie Counter</h1>

            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#90CAF9',
                    float: 'right',
                    top: '-40px'
                }}
                onClick={() => { clearAll() }}
            >CLEAR ALL</Button>

        </Box>
    )
}

export default Header