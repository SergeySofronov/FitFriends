import { Link } from "react-router-dom";

export function NotificationList() {
  return (
    <div className="main-nav__dropdown">
      <p className="main-nav__label">Оповещения</p>
      <ul className="main-nav__sublist">
        <li key="main-nav__subitem1" className="main-nav__subitem">
          <Link className="notification is-active" to="#">
            <p className="notification__text">Катерина пригласила вас на&nbsp;тренировку</p>
            <time className="notification__time" dateTime="2023-12-23 12:35">23 декабря, 12:35</time>
          </Link>
        </li>
        <li key="main-nav__subitem2" className="main-nav__subitem">
          <Link className="notification is-active" to="#">
            <p className="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
            <time className="notification__time" dateTime="2023-12-22 09:22">22 декабря, 09:22</time>
          </Link>
        </li>
        <li key="main-nav__subitem3" className="main-nav__subitem">
          <Link className="notification is-active" to="#">
            <p className="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
            <time className="notification__time" dateTime="2023-12-18 18:50">18 декабря, 18:50</time>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NotificationList;
