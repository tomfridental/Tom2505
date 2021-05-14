import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Autocomplete from 'react-autocomplete';
import LogoImg from '../static/logo.png';
import { getAutocompleteOptions, getCurrentPosition, getLocationByLatLng } from '../fetchHelper';
import SelectedLocation from './selectedLocation';
import { UPDATE_SELECTED_LOCATION } from '../state/reducers/configReducer';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce'


const SearchPage = () => {

    const dispatch = useDispatch();
    const selectedLocation = useSelector(state => state.config.selectedLocation);

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


    return (
        <Wrapper>
            <Logo src={LogoImg} />
            <Autocomplete
                getItemValue={item => item.LocalizedName}
                items={resultsList}
                wrapperProps={{ style: { 'position': 'relative' } }}
                value={inputValue}
                onChange={e => handleValueChange(e.target.value.replace(/[^A-Za-z\s:/]/g, ''))}
                onSelect={handlePlaceSelected}
                renderInput={props => <Input {...props} placeholder={'Search for new loaction'} />}
                renderMenu={(items, value, style) =>
                    !value ? <div /> : items.length === 0 ? <div style={{ ...style, ...menuStyle }}><SingleOption>no results</SingleOption></div> : <div style={{ ...style, ...menuStyle }} children={items} />
                }
                renderItem={(item, isHighlighted) =>
                    <SingleOption key={item.Key} isHighlighted={isHighlighted}>
                        {item.LocalizedName}
                    </SingleOption>
                }
            />

            {selectedLocation &&
                <SelectedLocation
                    key={selectedLocation.Key}
                    selectedLocation={selectedLocation}
                />}
        </Wrapper>
    )
}

export default SearchPage;

const menuStyle = {
    borderRadius: '.5rem',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'absolute',
    overflow: 'auto',
    maxHeight: '30rem',
    top: '5rem',
    left: 0
}

// CSS //
const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: 5rem;
`

const Input = styled.input`
width: 50rem;
height: 4.8rem;
background-color: transparent;
border-bottom: .3rem solid ${p => p.theme.mainColor};
font-size: 2rem;
`

const Logo = styled.img`
width: 35rem;
height: 30rem;
margin-bottom: -3rem;
`

const SingleOption = styled.div`
padding: .8rem .5rem;
font-size: 1.6rem;
cursor: pointer;
background-color: ${p => p.isHighlighted ? 'lightgray' : '#fff'};
`