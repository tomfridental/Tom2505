import { DAYS_ARR } from './Consts';

export const getTemperatureString = (conditionObj, isMetric) => {
    if (conditionObj.Temperature) {
        const key = isMetric ? 'Metric' : 'Imperial'
        return formatString(conditionObj.Temperature[key])
    }

    return '';
}

export const getTempRangeString = (forcastDay) => {
    if (forcastDay?.Temperature) {
        const minString = formatString(forcastDay.Temperature?.Minimum)
        const maxString = formatString(forcastDay.Temperature?.Maximum)
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