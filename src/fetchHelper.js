import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { API_KEY } from './Consts';

export const fetchGet = async (url, queryString) => {

    try {
        let res = await fetch(`${url}?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        })
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
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`;
    const queryString = `apikey=${API_KEY}&details=false&language=en-us&metric=true`;
    // const res = await fetchGet(url, queryString);
    const res = dummy3;

    return res;
}

const dummy3 = { "Headline": { "EffectiveDate": "2021-05-15T08:00:00+03:00", "EffectiveEpochDate": 1621054800, "Severity": 4, "Text": "Pleasant this weekend", "Category": "mild", "EndDate": null, "EndEpochDate": null, "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?unit=c&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us" }, "DailyForecasts": [{ "Date": "2021-05-13T07:00:00+03:00", "EpochDate": 1620878400, "Temperature": { "Minimum": { "Value": 20.0, "Unit": "C", "UnitType": 17 }, "Maximum": { "Value": 24.3, "Unit": "C", "UnitType": 17 } }, "Day": { "Icon": 2, "IconPhrase": "Mostly sunny", "HasPrecipitation": false }, "Night": { "Icon": 34, "IconPhrase": "Mostly clear", "HasPrecipitation": false }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us" }, { "Date": "2021-05-14T07:00:00+03:00", "EpochDate": 1620964800, "Temperature": { "Minimum": { "Value": 19.9, "Unit": "C", "UnitType": 17 }, "Maximum": { "Value": 24.5, "Unit": "C", "UnitType": 17 } }, "Day": { "Icon": 2, "IconPhrase": "Mostly sunny", "HasPrecipitation": false }, "Night": { "Icon": 34, "IconPhrase": "Mostly clear", "HasPrecipitation": false }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us" }, { "Date": "2021-05-15T07:00:00+03:00", "EpochDate": 1621051200, "Temperature": { "Minimum": { "Value": 18.7, "Unit": "C", "UnitType": 17 }, "Maximum": { "Value": 24.2, "Unit": "C", "UnitType": 17 } }, "Day": { "Icon": 1, "IconPhrase": "Sunny", "HasPrecipitation": false }, "Night": { "Icon": 34, "IconPhrase": "Mostly clear", "HasPrecipitation": false }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us" }, { "Date": "2021-05-16T07:00:00+03:00", "EpochDate": 1621137600, "Temperature": { "Minimum": { "Value": 20.1, "Unit": "C", "UnitType": 17 }, "Maximum": { "Value": 27.5, "Unit": "C", "UnitType": 17 } }, "Day": { "Icon": 2, "IconPhrase": "Mostly sunny", "HasPrecipitation": false }, "Night": { "Icon": 34, "IconPhrase": "Mostly clear", "HasPrecipitation": false }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us" }, { "Date": "2021-05-17T07:00:00+03:00", "EpochDate": 1621224000, "Temperature": { "Minimum": { "Value": 21.2, "Unit": "C", "UnitType": 17 }, "Maximum": { "Value": 25.0, "Unit": "C", "UnitType": 17 } }, "Day": { "Icon": 3, "IconPhrase": "Partly sunny", "HasPrecipitation": false }, "Night": { "Icon": 35, "IconPhrase": "Partly cloudy", "HasPrecipitation": false }, "Sources": ["AccuWeather"], "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us" }] }

export const getLocationConditions = async (locationKey) => {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
    const queryString = `apikey=${API_KEY}&details=false&language=en-us`;
    // const res = await fetchGet(url, queryString);
    const res = dummy2;

    return res;
}

const dummy2 = [{ "LocalObservationDateTime": "2021-05-13T09:46:00+03:00", "EpochTime": 1620888360, "WeatherText": "Mostly cloudy", "WeatherIcon": 6, "HasPrecipitation": false, "PrecipitationType": null, "IsDayTime": true, "Temperature": { "Metric": { "Value": 23.0, "Unit": "C", "UnitType": 17 }, "Imperial": { "Value": 73.0, "Unit": "F", "UnitType": 18 } }, "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us", "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us" }]

export const getAutocompleteOptions = async (value) => {
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    const queryString = `apikey=${API_KEY}&q=${value}&language=en-us`;
    // const res = await fetchGet(url, queryString);
    const res = dummyRes;

    return res || [];
}

const dummyRes = [{ "Version": 1, "Key": "215854", "Type": "City", "Rank": 31, "LocalizedName": "Tel Aviv", "Country": { "ID": "IL", "LocalizedName": "Israel" }, "AdministrativeArea": { "ID": "TA", "LocalizedName": "Tel Aviv" } }, { "Version": 1, "Key": "3431644", "Type": "City", "Rank": 45, "LocalizedName": "Telanaipura", "Country": { "ID": "ID", "LocalizedName": "Indonesia" }, "AdministrativeArea": { "ID": "JA", "LocalizedName": "Jambi" } }, { "Version": 1, "Key": "300558", "Type": "City", "Rank": 45, "LocalizedName": "Telok Blangah New Town", "Country": { "ID": "SG", "LocalizedName": "Singapore" }, "AdministrativeArea": { "ID": "05", "LocalizedName": "South West" } }, { "Version": 1, "Key": "325876", "Type": "City", "Rank": 51, "LocalizedName": "Telford", "Country": { "ID": "GB", "LocalizedName": "United Kingdom" }, "AdministrativeArea": { "ID": "TFW", "LocalizedName": "Telford and Wrekin" } }, { "Version": 1, "Key": "169072", "Type": "City", "Rank": 51, "LocalizedName": "Telavi", "Country": { "ID": "GE", "LocalizedName": "Georgia" }, "AdministrativeArea": { "ID": "KA", "LocalizedName": "Kakheti" } }, { "Version": 1, "Key": "230611", "Type": "City", "Rank": 51, "LocalizedName": "Telsiai", "Country": { "ID": "LT", "LocalizedName": "Lithuania" }, "AdministrativeArea": { "ID": "TE", "LocalizedName": "Telšiai" } }, { "Version": 1, "Key": "2723742", "Type": "City", "Rank": 55, "LocalizedName": "Telégrafo", "Country": { "ID": "BR", "LocalizedName": "Brazil" }, "AdministrativeArea": { "ID": "PA", "LocalizedName": "Pará" } }, { "Version": 1, "Key": "186933", "Type": "City", "Rank": 55, "LocalizedName": "Tela", "Country": { "ID": "HN", "LocalizedName": "Honduras" }, "AdministrativeArea": { "ID": "AT", "LocalizedName": "Atlántida" } }, { "Version": 1, "Key": "3453754", "Type": "City", "Rank": 55, "LocalizedName": "Telaga Asih", "Country": { "ID": "ID", "LocalizedName": "Indonesia" }, "AdministrativeArea": { "ID": "JB", "LocalizedName": "West Java" } }, { "Version": 1, "Key": "3453755", "Type": "City", "Rank": 55, "LocalizedName": "Telagamurni", "Country": { "ID": "ID", "LocalizedName": "Indonesia" }, "AdministrativeArea": { "ID": "JB", "LocalizedName": "West Java" } }]

export const getCurrentPosition = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

export const getLocationByLatLng = async (pos) => {
    console.log('pos: ', pos)
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
    const queryString = `apikey=${API_KEY}&q=${pos.latitude},${pos.longitude}&language=en-us&toplevel=true`;
    //  const res = await fetchGet(url, queryString);
    const res = dummyloc;
     return res;
}

const dummyloc = {"Version":1,"Key":"215854","Type":"City","Rank":31,"LocalizedName":"Tel Aviv","EnglishName":"Tel Aviv","PrimaryPostalCode":"","Region":{"ID":"MEA","LocalizedName":"Middle East","EnglishName":"Middle East"},"Country":{"ID":"IL","LocalizedName":"Israel","EnglishName":"Israel"},"AdministrativeArea":{"ID":"TA","LocalizedName":"Tel Aviv","EnglishName":"Tel Aviv","Level":1,"LocalizedType":"District","EnglishType":"District","CountryID":"IL"},"TimeZone":{"Code":"IDT","Name":"Asia/Jerusalem","GmtOffset":3.0,"IsDaylightSaving":true,"NextOffsetChange":"2021-10-30T23:00:00Z"},"GeoPosition":{"Latitude":32.045,"Longitude":34.77,"Elevation":{"Metric":{"Value":34.0,"Unit":"m","UnitType":5},"Imperial":{"Value":111.0,"Unit":"ft","UnitType":0}}},"IsAlias":false,"SupplementalAdminAreas":[],"DataSets":["AirQualityCurrentConditions","AirQualityForecasts","Alerts","ForecastConfidence"]}