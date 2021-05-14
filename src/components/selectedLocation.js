import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { getLocationConditions, getLocationForcast, displayNotyf } from '../fetchHelper';
import Processing from '../utils/processing';
import { lighten } from 'polished';
import { useSelector, useDispatch } from 'react-redux';
import { ACTION_TOGGLE_FAVORITES } from '../state/reducers/favoritesReducer';
import { UPDATE_SELECTED_LOCATION } from '../state/reducers/configReducer';
import { METRIC_UNIT } from '../state/reducers/configReducer';
import { getTemperatureString, getDayName, getTempRangeString } from '../helper';
import IS_FAVORITE_IMG from '../static/favorite_yes.png';
import IS_NOT_FAVORITE_IMG from '../static/favorite_no.png';
import WEATHER_IMG_RAINY from '../static/rainy.png'
import WEATHER_IMG_CLOUDY from '../static/cloudy.png'
import WEATHER_IMG_SUNNY from '../static/sunny.png'


const SelectedLocation = ({ selectedLocation }) => {

    const dispatch = useDispatch();
    const favoriteList = useSelector(state => state.favorites);
    const tempUnit = useSelector(state => state.config.tempUnit);
    const isFavorite = useMemo(() => favoriteList.find(el => el.Key === selectedLocation.Key) ? true : false, [favoriteList])
    const isMetric = tempUnit === METRIC_UNIT;

    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        if (!selectedLocation.Conditions || !selectedLocation.Forcast) {
            let res = await Promise.all([initConditions(), initForcast()]);
            dispatch({ type: UPDATE_SELECTED_LOCATION, location: { ...selectedLocation, Conditions: res[0], Forcast: res[1] } })
        }
    }

    const initConditions = async () => {

        const res = await getLocationConditions(selectedLocation.Key);
        if (res?.[0]) {
            return res[0];
        }
        return null;
    }

    const initForcast = async () => {

        const res = await getLocationForcast(selectedLocation.Key);
        if (res?.DailyForecasts) {
            return res;
        }
        return null;
    }

    const toggleFavoriteMode = () => {
        const notyfMsg = isFavorite ? 'Removed from favorites' : 'Added to favorites'
        dispatch({ type: ACTION_TOGGLE_FAVORITES, location: selectedLocation })
        displayNotyf(notyfMsg, { type: 'success' })
    }

    const loadWeahterImg = () => {
        const temperature = selectedLocation?.Conditions?.Temperature?.Metric?.Value;

        if (temperature > 16) {
            return WEATHER_IMG_SUNNY;
        }
        else if (temperature > 6) {
            return WEATHER_IMG_CLOUDY;
        }
        return WEATHER_IMG_RAINY;
    }

    return (
        <ResultsBox>
            {!selectedLocation.Conditions ?
                <ProcessingContainer>
                    <Processing />
                </ProcessingContainer>
                :
                <Main>
                    <Header>
                        <Location>
                            <Image src={loadWeahterImg()} />
                            <VBox>
                                <LocationName>{selectedLocation.LocalizedName}</LocationName>
                                <div>{getTemperatureString(selectedLocation.Conditions, isMetric)}</div>
                            </VBox>
                        </Location>

                        <FavoriteContainer key={isFavorite}>
                            <FavoriteImg title={isFavorite ? 'Remove from Favorites' : 'Add To Favorites'} onClick={toggleFavoriteMode} src={isFavorite ? IS_FAVORITE_IMG : IS_NOT_FAVORITE_IMG} />
                        </FavoriteContainer>
                    </Header>

                    <LocationText>
                        {selectedLocation.Conditions.WeatherText}
                    </LocationText>

                    <ForCast>
                        {selectedLocation.Forcast?.DailyForecasts?.length > 0 ?
                            selectedLocation.Forcast.DailyForecasts.map((day, dayIndex) =>
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
min-height: 30rem;
border-radius: .5rem;
border: .2rem solid ${p => p.theme.mainColor};
box-shadow: 0 0 1rem 0 rgba(51,51,51,0.51);
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
align-items: center;
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
height: 11rem;
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
width: 7rem;
height: 6rem;
`

const FavoriteImg = styled.img`
width: 5rem;
height: 5rem;
margin-inline-start: 2rem;
cursor: pointer;
animation: open 1000ms;

@keyframes open {
    from { opacity: 0}
    to {opacity: 1}
}

&:
`

const FavoriteContainer = styled.div`
display: flex;
align-items: center;
height: 5rem;
`

const ProcessingContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 30rem;
`