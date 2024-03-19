import { useAuthStore } from "../../hooks/useAuthStore"

export const NavBar = () => {

  const { user, startAuthLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4" >
        <span className="navbar-brand" >
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.name }
        </span>
        <button
          className="btn btn-outline-danger"
          onClick={ startAuthLogout }
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;

            <span> salir </span>
        </button>
    </div>
  )
}
