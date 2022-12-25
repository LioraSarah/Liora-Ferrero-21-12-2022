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
    for (let i=0; i<favoritesArray.length; i++) {
        if (cityKey === favoritesArray[i].key) {
            return i;
        }
    }
    return -1;
}
