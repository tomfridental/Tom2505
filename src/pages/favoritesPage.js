import React from 'react';
import styled from 'styled-components';

const FavoritesPage = () => {

    const dummylist = [{ name: 'Tel aviv', temp: 26.3, status: 'Sunny' }, {}, {}, {}, {}]

    return (
        <Wrapper>
            {dummylist?.length > 0 &&
                dummylist.map((item, index) =>
                    <Conatiner key={index}>
                        <VBox>
                            <LocationName>{item.name}</LocationName>
                            <span>{item.temp}</span>
                        </VBox>
                        <span>{item.status}</span>
                    </Conatiner>
                )}
        </Wrapper>
    )
}

export default FavoritesPage;


// CSS //
const Wrapper = styled.div`
display: flex;
width: 100%;
height: 100%;
padding: 5rem;
flex-wrap: wrap;
`

const Conatiner = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
padding: 1.5rem;
width: 25rem;
height: 30rem;
background-color: ${p => p.theme.mainColor};
margin-inline-end: 3rem;
margin-bottom: 3rem;
color: #fff;
font-size: 1.8rem;
`

const VBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
`

const LocationName = styled.span`
margin-bottom: 2rem;
`