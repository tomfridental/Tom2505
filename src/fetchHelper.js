import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { API_KEY } from './Consts';
import { convertMetricToImperial } from './helper';

export const fetchGet = async (url, queryString) => {

    try {
        let res = await fetch(`${window.location.protocol}//${url}?${queryString}`, { method: 'GET' })
        if (res) {
            res = await res.json();
        }
        return res;

    }
    catch (err) {
        const error = `Error fetching ${url}. ${err}`;
        displayNotyf(error)
        return null;
    }
}

export const displayNotyf = (msg, props = {}) => {

    if (msg) {
        if (!window.GlobalNotyf) {
            window.GlobalNotyf = new Notyf();
        }

        const msgType = props.type || 'error'
        const isDismissible = props.dismissible || true
        const msgDuration = props.duration || 4000

        window.GlobalNotyf.open({ type: msgType, message: msg, dismissible: isDismissible, duration: msgDuration, icon: false })
    }
}

export const getLocationForcast = async (locationKey) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const url = `dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`;
    const queryString = `apikey=${API_KEY}&details=false&language=en-us&metric=true`;
    const res = await fetchGet(url, queryString);

    if (res ?.DailyForecasts ?.length > 0) {
        for (const day of res.DailyForecasts) {
            day.ImperialTemp = {
                Maximum: convertMetricToImperial(day.Temperature.Maximum),
                Minimum: convertMetricToImperial(day.Temperature.Minimum)
            }
        }
    }

    return res;
}

export const getLocationConditions = async (locationKey) => {
    const url = `dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
    const queryString = `apikey=${API_KEY}&details=false&language=en-us`;
    const res = await fetchGet(url, queryString);

    return res;
}

export const getAutocompleteOptions = async (value) => {
    const url = 'dataservice.accuweather.com/locations/v1/cities/autocomplete';
    const queryString = `apikey=${API_KEY}&q=${value}&language=en-us`;
    const res = await fetchGet(url, queryString);

    return res || [];
}

export const getCurrentPosition = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

export const getLocationByLatLng = async (pos) => {
    const url = 'dataservice.accuweather.com/locations/v1/cities/geoposition/search';
    const queryString = `apikey=${API_KEY}&q=${pos.latitude},${pos.longitude}&language=en-us&toplevel=true`;
    const res = await fetchGet(url, queryString);

    return res;
}