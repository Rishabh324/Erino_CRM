import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
    if (localStorage.getItem('token')) return <Navigate to="/my-contacts"></Navigate>;
    else return children;
}

export default PublicRoute