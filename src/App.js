
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './layouts/home/Home';
import SignIn from './layouts/authentication/login/SignIn'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearMessage } from './redux/actions/message';
import { logout } from './redux/actions/auth'
import Admin from './layouts/admin/Admin';
function App() {
  const [showSupportBoard, setShowSupportBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage()); // clear message when changing location
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowSupportBoard(currentUser.roles.includes("ROLE_SUPPORT"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    setShowSupportBoard(false)
    setShowAdminBoard(false)
    dispatch(logout());
  };
  return (
    <div>



      {/**router */}
      <div >
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/login" element={<SignIn />} />
          <Route exact path='/admin' element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
