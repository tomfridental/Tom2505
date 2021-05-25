import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ADD_USERS_PAGE, VIEW_USERS_PAGE } from '../Consts';
import { darken } from 'polished';


const TopBar = ({ toggleTheme }) => {

    return (
        <Wrapper>
            <NavigationBar>
                <Navigation onClick={toggleTheme}>Change Theme</Navigation>
            </NavigationBar>

            <NavigationBar>
                <Navigation to={ADD_USERS_PAGE}>Create User</Navigation>
                <Navigation to={VIEW_USERS_PAGE}>View Users</Navigation>
            </NavigationBar>
        </Wrapper>
    )
}

export default TopBar;

// CSS //
const Wrapper = styled.div`
display: flex;
justify-content: space-between;
height: 4rem;
background-color: ${p => p.theme.mainColor};
font-size: 1.4rem;
color: #fff;
`

const NavigationBar = styled.div`
display: flex;
`

const Navigation = styled(Link)`
height: 100%;
padding: 0 2rem;
display: flex;
align-items: center;
background-color:  ${p => darken(0.1, p.theme.mainColor)};
color: #fff;

&:not(:first-child){
    border-left: .1rem solid #fff;
}

&:hover{
background-color:  ${p => darken(0.2, p.theme.mainColor)}; 
}
`