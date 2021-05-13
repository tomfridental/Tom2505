import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { getLocationConditions, getLocationForcast } from '../fetchHelper';
import Processing from './processing';
import { darken, lighten } from 'polished';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TOGGLE_FAVORITES } from '../state/reducers/favoritesReducer';
import { METRIC_UNIT } from '../state/reducers/configReducer';
import { getTemperatureString, getDayName, getTempRangeString } from '../helper';
import BASIC_CITY_IMAGE from '../static/location_generic.jpg';

const SelectedLocation = ({ item }) => {

    const [conditions, setConditions] = useState({})
    const [forcast, setForcast] = useState({})

    const dispatch = useDispatch();
    const favoriteList = useSelector(state => state.favorites);
    const tempUnit = useSelector(state => state.config.tempUnit);
    const isFavorite = useMemo(() => favoriteList.find(el => el.Key === item.Key) ? true : false, [favoriteList])
    const isMetric = tempUnit === METRIC_UNIT;
    
    useEffect(() => {
        initConditions();
        initForcast();
    }, [])

    const initConditions = async () => {
        const res = await getLocationConditions(item.Key);
        if (res?.[0]) {
            setConditions(res[0]);
        }
    }

    const initForcast = async () => {
        const res = await getLocationForcast(item.Key);
        if (res?.DailyForecasts) {
            setForcast(res);
        }
    }

    const toggleFavoriteMode = () => {
        dispatch({ type: ACTION_TOGGLE_FAVORITES, location: { ...item, Conditions: conditions } })
    }

    console.log('forcast: ', forcast)
    return (
        <ResultsBox>
            {!conditions ? <Processing />
                :
                <Main>
                    <Header>
                        <Location>
                            <Image src={BASIC_CITY_IMAGE} />
                            <VBox>
                                <LocationName>{item.LocalizedName}</LocationName>
                                <div>{getTemperatureString(conditions, isMetric)}</div>
                            </VBox>
                        </Location>

                        <AddToFavorites onClick={toggleFavoriteMode}>
                            {isFavorite ? 'Remove from Favorites' : 'Add To Favorites'}
                        </AddToFavorites>

                    </Header>

                    <LocationText>
                        {conditions?.WeatherText}
                    </LocationText>

                    <ForCast>
                        {forcast?.DailyForecasts?.length > 0 ?
                            forcast.DailyForecasts.map((day, dayIndex) =>
                                <SingleForcast key={dayIndex}>
                                    <DayName>{getDayName(day.Date)}</DayName>
                                    <span>{getTempRangeString(day)}</span>
                                </SingleForcast>
                            )
                            :
                            <Processing size="5rem" />
                        }
                    </ForCast>
                </Main>
            }
        </ResultsBox>
    )
}

export default SelectedLocation;

// CSS //
const ResultsBox = styled.div`
display: flex;
margin-top: 5rem;
width: 80rem;
border-radius: .5rem;
border: .2rem solid ${p => p.theme.mainColor};
`

const VBox = styled.div`
display: flex;
flex-direction: column;
`

const Main = styled(VBox)`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
padding: 3rem;
`

const Header = styled.div`
display: flex;
height: 5rem;
justify-content: space-between;
`

const Location = styled.div`
display: flex;
max-width: 50%;
`

const LocationName = styled.span`
font-size: 2rem;
font-weight: 600;
`

const LocationText = styled.span`
margin-top: 3rem;
width: 100%;
text-align: center;
font-size: 2rem;
font-weight: 600;
`

const ForCast = styled.div`
margin-top: 3rem;
width: 100%;
height: 10rem;
display: flex;
justify-content: space-between;
`

const SingleForcast = styled(VBox)`
width: 12rem;
height: 100%;
border: .2rem solid ${p => p.theme.mainColor};
border-radius: .5rem;
align-items: center;
justify-content: space-evenly;
font-weight: 600;
/* color: #fff; */
background-color:  ${p => lighten(0.2, p.theme.mainColor)};
`

const DayName = styled.span`
font-size: 1.8rem;
`

const AddToFavorites = styled.button`
padding: 0.4rem 1.2rem;
width: auto;
height: auto;
border-radius: .5rem;
background-color: ${p => p.theme.mainColor};
color: #fff;

&:hover{
    background-color:  ${p => darken(0.1, p.theme.mainColor)};
}
`

const Image = styled.img`

`