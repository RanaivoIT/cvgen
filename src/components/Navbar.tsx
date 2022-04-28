import { Link } from "react-router-dom"
import { useProfile } from "../contexts/ProfileContext"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const { getProfile, logoutUser } = useProfile()!
    
    const navigator = useNavigate()

    const logout = () => {
        logoutUser()
        navigator('/login')
        alert('Vous êtes déconnecté!')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">CVGen</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        (!localStorage.getItem('Profile')) ? (
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link " to="/login">Connexion</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/register">Inscription</Link>
                                </li>
                            </ul>
                        ) : (
                                <>
                                    <span className="navbar-text ms-auto">
                                        <span>{getProfile()?.email}</span>
                                        <button className="mx-3 btn btn-outline-danger" onClick={logout}>Deconnexion</button>
                                    </span>

                                </>
                        )
                    }
                   
                </div>
            </div>
        </nav >
    )
}
export default Navbar