import { DAYS_ARR } from './Consts';

export const getTemperatureString = (conditionObj, isMetric) => {
    if (conditionObj?.Temperature) {
        const key = isMetric ? 'Metric' : 'Imperial'
        return formatString(conditionObj.Temperature[key])
    }

    return '';
}

export const getTempRangeString = (forcastDay, isMetric) => {
    if (forcastDay) {
        const tempObj = isMetric ? forcastDay.Temperature : forcastDay.ImperialTemp;
        const minString = formatString(tempObj?.Minimum)
        const maxString = formatString(tempObj?.Maximum)
        return `${minString || ''} - ${maxString || ''}`
    }
    return ''
}

const formatString = (tempObj) => {

    if (tempObj) {
        const value = tempObj.Value;
        const unit = tempObj.Unit;
        return `${value || ''} ${unit || ''}.`;
    }

    return '';
}

export const getDayName = (date) => {
    const dateCopy = new Date(date);
    const numOfDay = dateCopy.getDay();

    return DAYS_ARR[numOfDay]
}

export const convertMetricToImperial = (metricObj) => {
    return {
        Unit: 'F',
        Value: convertCelsiusToFahrenheit(metricObj?.Value)
    }
}

export const convertCelsiusToFahrenheit = (celsius) => {

    if (celsius !== null) {
        const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1);
        return parseFloat(fahrenheit);
    }

    return null;
}