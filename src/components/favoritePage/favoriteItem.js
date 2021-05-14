import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { getTemperatureString } from '../../helper';

const FavoriteItem = ({ item, isMetric, handleViewLocationClicked }) => {

    return (
        <Conatiner>
            <VBox>
                <LocationName>{item.LocalizedName}</LocationName>
                <span>ID: {item.Key}</span>
                <span>{getTemperatureString(item.Conditions, isMetric)}</span>
            </VBox>
            <span>{item.Conditions?.WeatherText}</span>

            <Button onClick={() => handleViewLocationClicked(item)}>View Forcast</Button>
        </Conatiner>
    )
}

export default FavoriteItem;

// CSS //
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
border-radius: .5rem;
box-shadow: 0 0 1rem 0 rgba(51,51,51,0.51);
animation: open 500ms;

@keyframes open {
    from { opacity: 0}
    to {opacity: 1}
}
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

const Button = styled.button`
padding: 1rem 1.5rem;
font-size: 1.6rem;
background-color:  ${p => lighten(0.2, p.theme.mainColor)};
border-radius: .5rem;
color: #fff;

&:hover{
    background-color:  ${p => lighten(0.1, p.theme.mainColor)}; 
}
`