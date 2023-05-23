import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

export function Logo() {
  return (
    <Link className="header__logo" to={AppRoute.Intro} aria-label="Переход на главную">
      <svg width="187" height="70" aria-hidden="true">
        <use xlinkHref="#logo"></use>
      </svg>
    </Link>
  );
}

export default Logo;
