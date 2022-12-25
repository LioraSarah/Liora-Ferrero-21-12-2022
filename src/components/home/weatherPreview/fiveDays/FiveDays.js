import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadFiveDays, isLoadingFiveDays, selectFiveDays, selectIsMetric, selectHasError } from '../../../../features/fiveDays/fiveDaysSlice.js';
import "./fiveDays.css"
import { selectCurrentCityKey } from '../../../../features/currentCity/correntCitySlice';
import { formatDate, isNotEmptyObj } from '../../../../helperFunctions/helpers';


export const FiveDays = () => {

    const cityKey = useSelector(selectCurrentCityKey);
    const fiveDaysObj = useSelector(selectFiveDays);
    const isMetric = useSelector(selectIsMetric);
    const hasError = useSelector(selectHasError);
    const loadingFiveDays = useSelector(isLoadingFiveDays);
    const dispatch = useDispatch();
    let daysList = [];

    useEffect(()=>{
        dispatch(loadFiveDays({ key: cityKey, isMetric: isMetric }));
    }, [dispatch, cityKey, isMetric]);

    if (loadingFiveDays) {
        return <div id="loading-container">
            <p id="loading">loading...</p>
        </div>;
    }

    if(hasError) {
        return (
            <div className="error-container">
            <h4 className="error">Sorry, there was an error fetching the data :(</h4>
        </div>)
    };

    //check if five days forecast has rendered, then get the forecast list
    if (isNotEmptyObj(fiveDaysObj)) {
        daysList = fiveDaysObj.DailyForecasts;
    }

    //helper
    const getDayName = (date) => {
        const formattedDate = formatDate(date);
        const dayNumber = formattedDate.getDay();

        switch (dayNumber) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            default:
                return '';
        }
    }

    return (
        <div id="five-days-container" className='general-flex-container'>

            {daysList.map((day, i) => (
                <div key={i} className="days-container">
                    <h3 className="day-name">{getDayName(day.Date)}</h3>
                    <p>{day.Temperature.Minimum.Value}<span className="unit-style">{day.Temperature.Maximum.Unit}</span> <span className='to-style'>~</span> {day.Temperature.Maximum.Value}<span className="unit-style">{day.Temperature.Maximum.Unit}</span></p>
                    <div className="days-box">
                        <div className="day-container">
                            <h4>Day</h4>
                            <p>{day.Day.IconPhrase}</p>
                        </div>
                        <div className="night-container">
                            <h4>Night</h4>
                            <p>{day.Night.IconPhrase}</p>
                            </div>
                    </div>
                </div>
            ))}

        </div>
    );

}