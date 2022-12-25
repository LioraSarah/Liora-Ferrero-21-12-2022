import './Header.css';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMetric, setIsMetric } from '../../features/fiveDays/fiveDaysSlice';
import { selectCurrentCondition } from '../../features/currentCity/correntCitySlice';
import { getUnit, isNotEmptyObj } from '../../helperFunctions/helpers';

export const Header = () => {

    const isMetric = useSelector(selectIsMetric);
    const currentCondition = useSelector(selectCurrentCondition);
    const dispatch = useDispatch();
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    let unit = '';

    //check if the current city was already rendered, then assign temperature and hour values
    if (isNotEmptyObj(currentCondition)) {
        const unitObj = getUnit(currentCondition, isMetric);
        unit = unitObj.unit;
    }

    //make interactive menu
    const onClickToggleHandler = () => {
        if (navbarLinks.id === 'active') {
            navbarLinks.id = '';
        } else {
            navbarLinks.id = 'active';
        }
    };

    const onClickMetricHandler = () => {
        console.log(isMetric);
        if (isMetric) {
            dispatch(setIsMetric(false));
        } else {
            dispatch(setIsMetric(true));
        }
    };

    return (
        <header className="navbar">
            <div className="logo">
                Weather App
            </div>
            <div className="toggle-button" onClick={onClickToggleHandler}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <div className="navbar-links">
                <ul id="menu-list">
                    <li onClick={onClickMetricHandler}>
                        <NavLink>&deg;{unit}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites">
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}