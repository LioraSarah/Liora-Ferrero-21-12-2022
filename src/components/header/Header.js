import './Header.css';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMetric, setIsMetric } from '../../features/fiveDays/fiveDaysSlice';

export const Header = () => {

    const isMetric = useSelector(selectIsMetric);
    const dispatch = useDispatch();
    const navbarLinks = document.getElementsByClassName('navbar-links')[0]

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
                        <li onClick={onClickMetricHandler}>
                            <NavLink>set Metric</NavLink>
                        </li>
                    </ul>
                </div>
        </header>
    )
}