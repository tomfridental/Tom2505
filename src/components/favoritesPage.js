import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTemperatureString } from '../helper';
import { useHistory } from 'react-router-dom';
import { SEARCH_PAGE } from '../Consts';
import { lighten } from 'polished';
import { UPDATE_SELECTED_LOCATION, METRIC_UNIT } from '../state/reducers/configReducer';

const FavoritesPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const favoriteList = useSelector(state => state.favorites);
    const tempUnit = useSelector(state => state.config.tempUnit);
    const isMetric = tempUnit === METRIC_UNIT;

    const handleViewLocationClicked = (item) => {
        dispatch({ type: UPDATE_SELECTED_LOCATION, location: item })
        history.push(SEARCH_PAGE)
    }

    return (
        <Wrapper>
            {favoriteList?.length > 0 ?
                favoriteList.map((item, index) =>
                    <Conatiner key={index}>
                        <VBox>
                            <LocationName>{item.LocalizedName}</LocationName>
                            <span>ID: {item.Key}</span>
                            <span>{getTemperatureString(item.Conditions, isMetric)}</span>
                        </VBox>
                        <span>{item.Conditions?.WeatherText}</span>

                        <Button onClick={() => handleViewLocationClicked(item)}>View Forcast</Button>
                    </Conatiner>
                )
                :
                <NoFavorites>No Favorite yet, go to <SearchLink to={SEARCH_PAGE}>Search</SearchLink> page and add some.</NoFavorites>
            }
        </Wrapper >
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

const NoFavorites = styled.span`
font-size: 3rem;
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

const SearchLink = styled(Link)`

`