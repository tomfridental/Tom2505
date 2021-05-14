import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SEARCH_PAGE } from '../../Consts';
import { UPDATE_SELECTED_LOCATION, METRIC_UNIT } from '../../state/reducers/configReducer';
import FavoriteItem from './favoriteItem';

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
                favoriteList.map(item =>
                    <FavoriteItem
                        key={item.Key}
                        item={item}
                        isMetric={isMetric}
                        handleViewLocationClicked={handleViewLocationClicked}
                    />)
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

const NoFavorites = styled.span`
font-size: 3rem;
`

const SearchLink = styled(Link)`

`