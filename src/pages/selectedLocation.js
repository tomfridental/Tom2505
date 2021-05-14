import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { getLocationConditions, getLocationForcast } from '../fetchHelper';
import Processing from './processing';
import { lighten } from 'polished';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TOGGLE_FAVORITES } from '../state/reducers/favoritesReducer';
import { UPDATE_SELECTED_LOCATION } from '../state/reducers/configReducer';
import { METRIC_UNIT } from '../state/reducers/configReducer';
import { getTemperatureString, getDayName, getTempRangeString } from '../helper';
import BASIC_CITY_IMAGE from '../static/location_generic.jpg';
import IS_FAVORITE_IMG from '../static/favorite_yes.png';
import IS_NOT_FAVORITE_IMG from '../static/favorite_no.png';


const SelectedLocation = ({ item }) => {

    const [forcast, setForcast] = useState(null)

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
        if (!item.Conditions) {
            const res = await getLocationConditions(item.Key);
            if (res?.[0]) {
                dispatch({ type: UPDATE_SELECTED_LOCATION, location: { ...item, Conditions: res[0] } })
            }
        }
    }

    const initForcast = async () => {
        if (!forcast) {
            const res = await getLocationForcast(item.Key);
            if (res?.DailyForecasts) {
                setForcast(res);
            }
        }
    }

    const toggleFavoriteMode = () => {
        dispatch({ type: ACTION_TOGGLE_FAVORITES, location: item })
    }

    console.log('forcast: ', forcast)
    return (
        <ResultsBox>
            {!item.Conditions ? <Processing />
                :
                <Main>
                    <Header>
                        <Location>
                            <Image src={BASIC_CITY_IMAGE} />
                            <VBox>
                                <LocationName>{item.LocalizedName}</LocationName>
                                <div>{getTemperatureString(item.Conditions, isMetric)}</div>
                            </VBox>
                        </Location>

                        <FavoriteContainer>
                            <FavoriteImg title={isFavorite ? 'Remove from Favorites' : 'Add To Favorites'} onClick={toggleFavoriteMode} src={isFavorite ? IS_FAVORITE_IMG : IS_NOT_FAVORITE_IMG} />
                        </FavoriteContainer>
                    </Header>

                    <LocationText>
                        {item.Conditions.WeatherText}
                    </LocationText>

                    <ForCast>
                        {forcast?.DailyForecasts?.length > 0 ?
                            forcast.DailyForecasts.map((day, dayIndex) =>
                                <SingleForcast key={dayIndex}>
                                    <DayName>{getDayName(day.Date)}</DayName>
                                    <span>{getTempRangeString(day, isMetric)}</span>
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
background-color:  ${p => lighten(0.2, p.theme.mainColor)};
animation: open 500ms;

@keyframes open {
    from { opacity: 0}
    to {opacity: 1}
}
`

const DayName = styled.span`
font-size: 1.8rem;
`

const Image = styled.img`

`

const FavoriteImg = styled.img`
width: 5rem;
height: 5rem;
margin-inline-start: 2rem;
cursor: pointer;
`

const FavoriteContainer = styled.div`
display: flex;
align-items: center;
height: 5rem;
`