import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Page/Home'
import PassowrdReset from './Page/PassowrdReset';
import NavBar from './Components/NavBar';
import SignUp from './Page/SignUp';
import SignIn from './Page/SignIn';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Error403Page from './Page/Error403Page';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();

  }, []);
  // console.log(user.email)
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={user? <Error403Page/> : <SignIn />} />
          <Route path='/reset' element={!user? <Error403Page/> :<PassowrdReset />} />
          <Route path='/signup' element={user? <Error403Page/> :<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
