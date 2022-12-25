export const formatDate = (date) => {
    const formattedDate = date.slice(0, 19);
    const currentTime = new Date(formattedDate);
    return currentTime;
};

export const chooseClassName = (weatherNum) => {
    switch (true) {
        case (weatherNum > 0 && weatherNum < 3):
            return "sunny";
        case (weatherNum > 2 && weatherNum < 7):
            return "partly-sunny";
        case (weatherNum > 6 && weatherNum < 12):
            return "cloudy";
        case (weatherNum > 11 && weatherNum < 22):
            return "rainy";
        case (weatherNum > 21 && weatherNum < 30):
            return "snowy";
        default:
            return "night";
    }
};

export const searchFavorite = (cityKey, favoritesArray) => {
    return favoritesArray.findIndex((element) => element.key === cityKey);
};

export const getUnit = (currentCondition, isMetric) => {
    let temperature, unit;
    if (isMetric) {
        temperature = currentCondition.Temperature.Metric.Value;
        unit = currentCondition.Temperature.Metric.Unit;
    } else {
        temperature = currentCondition.Temperature.Imperial.Value;
        unit = currentCondition.Temperature.Imperial.Unit;
    }
    return {temperature: temperature, unit: unit};
};

export const isNotEmptyObj = (obj) => {
   return (!(Object.keys(obj).length === 0 && obj.constructor === Object));
};
