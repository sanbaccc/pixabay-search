import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ImageDisplay from './ImageDisplay';
import axios from 'axios';
import { Pagination } from '@mui/material';

const KEY = "39712289-c42785b92788e9781d913a182";
const URL = "https://pixabay.com/api/";
const PAGE_SIZE = 24;



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));


  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

class SearchBar extends React.Component {
    
    state = {
        searchValue: '',
        results: [],
        total: 0,
        currentPage: 1
    }

    inputHandler = (e) => {
        this.setState({searchValue: e.target.value});
    }

    searchHandler = (e, page=1) => {
        axios.get(`${URL}?key=${KEY}&q=${this.state.searchValue}&image_type=photo&per_page=${PAGE_SIZE}&page=${page}`)
        .then(res => this.setState({results: res.data.hits, total: res.data.totalHits, currentPage: page}));
    }


    keyListener = (e) => {
        if (e.key === "Enter") {
           this.searchHandler();
        }
    }


    render() {
        return (
            <div>
                <Box >
                    <AppBar position="static" color="transparent" >

                        <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            Pixabay
                        </Typography>
                        <Search>
                            <IconButton 
                                onClick={this.searchHandler}
                                type="submit"
                            >
                            <SearchIcon />
                            </IconButton>
                            <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={this.inputHandler}
                            onKeyDown={this.keyListener}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        </Toolbar>
                    </AppBar>
                </Box>
                {this.state.results.length ?
                (
                    <div>
                    <ImageDisplay imageData={this.state.results} />
                    <Pagination
                        count={Math.ceil(this.state.total / PAGE_SIZE)}
                        sx={{justifyContent:"center", display:'flex'}}
                        page={this.state.currentPage}
                        onChange={this.searchHandler}
                    />
                    </div>
                ) : null
                }
            </div>
        );
    }
}

export default SearchBar;