import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUsers } from '../../fetchHelper';
import Processing from '../../utils/processing';
import User from './user';
import { USERS_PAGENATION } from '../../Consts';

const ViewUsersPage = () => {

    const [users, setUsers] = useState([]);
    const [processing, toggleProcessing] = useState(true);
    const [usersIndex, setUserIndex] = useState(0);
    const [isMoreUsersAvailable, setSsMoreUsersAvailable] = useState(true);

    useEffect(() => {
        initPage();
    }, [])

    const initPage = async () => {
        const res = await getUsers(usersIndex);
        setUsers(res?.Data || []);
        setSsMoreUsersAvailable(res?.IsMoreUsersAvailable);
        toggleProcessing(false);
    }

    const loadMoreUsers = async () => {
        const newIndex = usersIndex + USERS_PAGENATION;
        const moreUsersRes = await getUsers(newIndex);
        const moreUsers = moreUsersRes?.Data || [];
        setUsers([...users, ...moreUsers]);
        setSsMoreUsersAvailable(moreUsersRes?.IsMoreUsersAvailable);
        setUserIndex(newIndex);
    }   


    return (
        <Wrapper>
            {processing ? <Processing />
                :
                users.length === 0
                    ?
                    <span>no users yet</span>
                    :
                    <>
                        {users.map(user =>
                            <PaddingBox key={user._id}>
                                <User user={user}/>
                            </PaddingBox>
                        )}
                        {isMoreUsersAvailable && <LoadMore onClick={loadMoreUsers}>Load more</LoadMore>}
                    </>
            }
        </Wrapper >
    )
}

export default ViewUsersPage;


// CSS //
const Wrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
padding: 5rem;
`

const PaddingBox = styled.div`
margin-bottom: 3rem;
`

const LoadMore = styled.button`
background-color: none;
font-weight: 600;
font-size: 2rem;
cursor: pointer;
`