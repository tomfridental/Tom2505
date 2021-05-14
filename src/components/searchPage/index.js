import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Autocomplete from './autocomplete';
import LogoImg from '../../static/logo.png';
import { getAutocompleteOptions, getCurrentPosition, getLocationByLatLng } from '../../fetchHelper';
import SelectedLocation from './chart';
import { UPDATE_SELECTED_LOCATION } from '../../state/reducers/configReducer';
import { ACTION_TOGGLE_FAVORITES } from '../../state/reducers/favoritesReducer';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce'


const SearchPage = () => {

    const dispatch = useDispatch();
    const { config, favorites } = useSelector(state => state);
    const { selectedLocation, tempUnit } = config

    const [inputValue, setInputValue] = useState(selectedLocation?.LocalizedName || '');
    const [resultsList, setResultsList] = useState([]);

    const delayedQuery = useCallback(debounce(val => fetchResults(val), 300), []);

    useEffect(() => {
        initCurrentPoisition();
    }, [])

    const initCurrentPoisition = async () => {
        if (!selectedLocation) {
            const pos = await getCurrentPosition();
            if (pos) {
                const location = await getLocationByLatLng(pos.coords);
                if (location) {
                    updateSelectedLocation(location);
                    setResultsList([location])
                    setInputValue(location.EnglishName)
                }
            }
        }

    }

    const handleValueChange = (val) => {
        setInputValue(val);
        if (val.length > 1) {
            delayedQuery(val);
        }
    }

    const fetchResults = async (val) => {
        const res = await getAutocompleteOptions(val);
        setResultsList(res);
    }

    const handlePlaceSelected = (inputValue, item) => {
        if (item.Key !== selectedLocation?.Key) {
            updateSelectedLocation(item);
        }
        setInputValue(inputValue);
    }

    const updateSelectedLocation = (updatedLocation) => {
        dispatch({ type: UPDATE_SELECTED_LOCATION, location: updatedLocation })
    }

    const toggleFavoriteMode = (item) => {
        dispatch({ type: ACTION_TOGGLE_FAVORITES, location: item })
    }


    return (
        <Wrapper>
            <Logo src={LogoImg} />
            <Autocomplete
                inputValue={inputValue}
                resultsList={resultsList}
                handlePlaceSelected={handlePlaceSelected}
                handleValueChange={handleValueChange}
            />

            {selectedLocation &&
                <SelectedLocation
                    key={selectedLocation.Key}
                    selectedLocation={selectedLocation}
                    tempUnit={tempUnit}
                    favorites={favorites}
                    updateSelectedLocation={updateSelectedLocation}
                    toggleFavoriteMode={toggleFavoriteMode}
                />}
        </Wrapper>
    )
}

export default SearchPage;

// CSS //
const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 5rem;
`

const Logo = styled.img`
width: 35rem;
height: 30rem;
margin-bottom: -3rem;
`