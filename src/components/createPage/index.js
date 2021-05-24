import React, { useState } from 'react';
import styled from 'styled-components';
import { createUser } from '../../fetchHelper';
import Processing from '../../utils/processing';

// const fields = ['firstName', 'lastName', 'email', 'password', 'discription'];
const fields = [
    { fieldName: 'firstName', title: 'First name' },
    { fieldName: 'lastName', title: 'Last name' },
    { fieldName: 'email', title: 'Email' },
    { fieldName: 'password', title: 'Password', type: 'password' },
    { fieldName: 'description', title: 'Description' },
];

const CreatePage = () => {

    const [user, setUser] = useState({})
    const [error, setError] = useState('');
    const [formDone, setFormDone] = useState(false);
    const [fetching, toggleFetching] = useState(false);

    const handleChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [fieldName]: value })
    }

    const submit = async () => {
        // for (const field of fields) {
        //     if (!user[field.fieldName]) {
        //         setError(`Please enter ${field.title}`)
        //         return;
        //     }
        // }

        toggleFetching(true);
        const res = await createUser();
        console.log('res: ', res)
        toggleFetching(false);
        setFormDone(true);
    }


    return (
        <Wrapper>
            <Main>
                {formDone ?
                    <div>User created successfully, Thank you.</div>
                    :
                    <>
                        {fields.map((field, index) =>
                            <Box key={index}>
                                <Title>{field.title}:</Title>
                                <Input type={field.type || 'text'} name={field.fieldName} value={user[field.fieldName] || ''} onChange={handleChange} />
                            </Box>
                        )}
                        <Button onClick={submit}>
                            {fetching ? <Processing size="3rem" /> : 'Register'}
                        </Button>
                        <Error>{error}</Error>
                    </>
                }
            </Main>
        </Wrapper>
    )
}

export default CreatePage;

// CSS //
const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding: 5rem;
`

const Main = styled.div`
display: flex;
flex-direction: column;
padding: 5rem;
border: .1rem solid black;
border-radius: .5rem;
align-items: center;
`

const Input = styled.input`
width: 25rem;
height: 3rem;
padding: 0 1.6rem;
`

const Box = styled.div`
display: flex;
align-items: center;
margin-bottom: 3rem;
`

const Button = styled.button`
width: 15rem;
height: 4rem;
background-color: red;
color: white;
border-radius: .5rem;
`

const Title = styled.span`
font-size: 1.6rem;
display: flex;
width: 10rem;
/* border: 1px solid red; */
`

const Error = styled.span`
font-size: 1.6rem;
height: 2rem;
color: red;
margin-top: 2rem;
`