import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Autocomplete from 'react-autocomplete';
import LogoImg from '../static/logo.png';
import { getAutocompleteOptions, getCurrentPosition, getLocationByLatLng } from '../fetchHelper';
import SelectedLocation from './selectedLocation';
import { useLocation } from 'react-router-dom';


const SearchPage = () => {

    let location = useLocation();

    const hasPreSelectedLocation = location?.state?.location;

    const [inputValue, setInputValue] = useState(hasPreSelectedLocation?.LocalizedName || '');
    const [resultsList, setResultsList] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(hasPreSelectedLocation);

    useEffect(() => {
        initCurrentPoisition();
    }, [])

    const initCurrentPoisition = async () => {
        if (!currentLocation) {
            const pos = await getCurrentPosition();
            if (pos) {
                const location = await getLocationByLatLng(pos.coords);
                if (location) {
                    setCurrentLocation(location);
                    setInputValue(location.EnglishName)
                }
            }
        }

    }

    const handleValueChange = (val) => {
        setInputValue(val);
        if (val.length > 1) {
            fetchResults(val)
        }
    }

    const fetchResults = async (val) => {
        const res = await getAutocompleteOptions(val);
        setResultsList(res);
    }

    const handlePlaceSelected = (inputValue, item) => {
        setInputValue(inputValue)
        setCurrentLocation(item);
    }


    return (
        <Wrapper>
            <Logo src={LogoImg} />
            <Autocomplete
                getItemValue={item => item.LocalizedName}
                items={resultsList}
                renderItem={(item, isHighlighted) =>
                    <SingleOption key={item.Key} isHighlighted={isHighlighted}>
                        {item.LocalizedName}
                    </SingleOption>
                }
                value={inputValue}
                onChange={e => handleValueChange(e.target.value.replace(/[^A-Za-z\s:/]/g, ''))}
                onSelect={handlePlaceSelected}
                renderInput={props => <Input {...props} placeholder={'Search for new loaction'} />}
            />

            {currentLocation &&
                <SelectedLocation
                    key={currentLocation.Key}
                    item={currentLocation}
                    setCurrentLocation={setCurrentLocation}
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

const Input = styled.input`
width: 50rem;
height: 4.8rem;
background-color: transparent;
border-bottom: .1rem solid black;
`

const Logo = styled.img`
width: 35rem;
height: 30rem;
margin-bottom: -3rem;
`

const SingleOption = styled.div`
padding: .5rem 0;
cursor: pointer;
background-color: ${p => p.isHighlighted ? 'lightgray' : '#fff'};
`