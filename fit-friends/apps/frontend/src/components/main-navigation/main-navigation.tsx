import { NavLink } from "react-router-dom";
import { AppRoute, MainNavigationItem, MainNavigationItemAria, MainNavigationItemIcon } from "../../const";
import NotificationList from "../notification-list/notification-list";

export function MainNavigation() {

  const navItems = Object.values(MainNavigationItem).map((value, index) =>
    <li
      key={`main-nav__item-${index}`}
      className={`main-nav__item ${value === MainNavigationItem.Notifications ? 'main-nav__item--notifications' : 'null'}`}>

      <NavLink
        className={({ isActive, isPending }) => isActive ? "main-nav__link is-active" : "main-nav__link"}
        title={MainNavigationItemAria[value]}
        to={AppRoute[value]} aria-label={MainNavigationItemAria[value]}>

        <svg width="18" height="18" aria-hidden="true">
          <use xlinkHref={MainNavigationItemIcon[value]}></use>
        </svg>
      </NavLink>

      {value === MainNavigationItem.Notifications ? <NotificationList /> : ''}
    </li>
  );

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {navItems}
      </ul>
    </nav>
  );
}

export default MainNavigation;
