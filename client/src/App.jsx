import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';
import AddContactPage from './pages/AddContactPage';
import EditContactPage from './pages/EditContactPage';
import ContactTablePage from './pages/ContactTablePage';

function App() {

  return ( 
    <div className='app'>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={
            <ProtectedRoute>
              <ContactTablePage />
            </ProtectedRoute>
          } />
          <Route path="/:page" element={
            <ProtectedRoute>
              <ContactTablePage />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/add-contact" element={
            <ProtectedRoute>
              <AddContactPage />
            </ProtectedRoute>
          } />
          <Route path="/edit-contact/:id" element={
            <ProtectedRoute>
              <EditContactPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;