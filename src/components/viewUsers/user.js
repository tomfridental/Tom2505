import React from 'react';
import styled from 'styled-components';


const User = ({ user }) => {

    return (
        <Wrapper>
            <span>UserId: {user.id}</span>
            <span>Name: {user.first_name}</span>
            <span>Last Name: {user.last_name}</span>
            <span>Email: {user.email}</span>
            <Description title={user.discription}>Description: {user.discription}</Description>
        </Wrapper>
    )
}

export default User;


const Wrapper = styled.div`
display: flex;
flex-direction: column;
width: 65rem;
height: 20rem;
border: .1rem solid black;
padding: 3rem;
font-size: 2rem;
border-radius: .5rem;
overflow: hidden;
`

const Description = styled.span`
text-overflow: ellipsis;
overflow: hidden; 
white-space: nowrap;
width: 90%;
`