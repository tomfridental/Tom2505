import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Autocomplete from 'react-autocomplete';

const Test = () => {

    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([
        { label: 'aaa' },
        { label: 'bbb' },
        { label: 'ccc' },
    ])

    useEffect(() => {
        if (inputValue?.length > 2) {
            fetchResults();
        }
    }, [inputValue])

    const fetchResults = async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        setItems([{ label: 'tom' }, { label: 'yosi' }])

    }


    return (
        <Wrapper>
            {/* <Input /> */}
            <Autocomplete
                getItemValue={item => item.label}
                items={items}
                renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                    </div>
                }
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onSelect={val => setInputValue(val)}
            />
        </Wrapper>
    )
}

export default Test;

// CSS //
const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding-top: 5rem;
`

const Input = styled.input`
width: 50rem;
height: 4.8rem;
border-radius: .5rem;
padding: 0 1.6rem;
`