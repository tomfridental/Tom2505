import React from 'react';
import styled from 'styled-components';
import Autocomplete from 'react-autocomplete';


const AutocompleteComponent = ({ resultsList, inputValue, handlePlaceSelected, handleValueChange }) => {

    return (
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
    )
}

export default AutocompleteComponent;

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

const Input = styled.input`
width: 50rem;
height: 4.8rem;
background-color: transparent;
border-bottom: .3rem solid ${p => p.theme.mainColor};
font-size: 2rem;
`


const SingleOption = styled.div`
padding: .8rem .5rem;
font-size: 1.6rem;
cursor: pointer;
background-color: ${p => p.isHighlighted ? 'lightgray' : '#fff'};
`