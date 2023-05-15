import { Outlet } from "react-router-dom";

function Root(): JSX.Element {
  return (
    <>
      <h1>Hello World!</h1>
      <svg width="187" height="70" aria-hidden="true">
        <use xlinkHref="#logo"></use>
      </svg>
      <Outlet />
    </>
  );
}

export default Root;
