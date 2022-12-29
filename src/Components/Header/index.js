import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../../firebase/firebase";
import { UserContext } from "../../providers/UserProvider";
import "./index.scss";

function Header() {
  const user = useContext(UserContext);

  return (
    <header>
      <div className="logo">
        <Link to="/"><p>JobBoard</p></Link>
      </div>
      <div className="navigation">
        <nav>
          <ul>
            <li>
              <Link to="/">Jobs</Link>
            </li>
            <li>
              <Link to="/create">Post a job</Link>
            </li>
          </ul>
        </nav>
        {user ? (
          <button onClick={signOut}>Log out</button>
        ) : (
          <button onClick={signInWithGoogle}>Log in with Google</button>
        )}
      </div>
    </header>
  );
}

export default Header;
