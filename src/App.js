import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";

import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


initializeAuthentication();
function App() {
  const [user, setUser] = useState({})

  const [gituser, setGituser] = useState({});

  const googleHandleButton = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const logginUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        // console.log(user);
        setUser(logginUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }
  const githubHandleButton = () => {
    const auth = getAuth();
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        // console.log(user);
        const logginGithub = {
          name: displayName,
          photo: photoURL,
          email: email
        }
        setGituser(logginGithub)
      })

  }
  const signoutbtn = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser({});
      setGituser({});
    })
  }
  return (
    <div className="App">
      {!((user.email) || (gituser.name)) ?
        <div>
          <button onClick={googleHandleButton}>Google SignIn</button>
          <button onClick={githubHandleButton}>GitHub SignIn</button>
        </div> :
        <button onClick={signoutbtn}>Sign Out</button>
      }
      {
        user.email && <div>
          <h3>Welocme {user.name}</h3>
          <p>Email:{user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      {
        gituser.name && <div>
          <h3>name:{gituser.name}</h3>
          <p>Email:{gituser.email}</p>
          <img src={gituser.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
