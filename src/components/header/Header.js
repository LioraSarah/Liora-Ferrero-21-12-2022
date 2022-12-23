import './Header.css';
import { NavLink } from "react-router-dom";
// import logo from "../../media/logo.png";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsMetric, setIsMetric } from '../../features/currentCity/correntCitySlice';

export const Header = () => {

    const isMetric = useSelector(selectIsMetric);
    const dispatch = useDispatch();

    const onClickHandler = () => {
        if (isMetric) {
            dispatch(setIsMetric(false));
        } else {
            dispatch(setIsMetric(true));
        }
    }

    return (
        <header>
            <div id="flex-container">
                <div id="logo">
                    <h2 id="logo-text">Weather App</h2>
                </div>
                <div id="menu">
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
                        <li>
                            <div onClick={onClickHandler}>
                                set Metric
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}