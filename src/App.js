import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Game from "./Components/Game";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  // ================ LocalStorage Handlers ================
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // ================ Auth Handlers ================
  const handleSignUp = (name, email, password, image) => {
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      alert("User already exists");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const newUser = {
          name,
          email,
          password,
          image: reader.result,
          joinedDate: new Date().toLocaleDateString(),
        };
        setUsers([...users, newUser]);
        alert("Sign up successful!");
        navigate("/login"); // Redirect to Login after Sign Up
      };
    }
  };

  const handleLogin = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      navigate("/game"); // Redirect to Game after Login
    } else {
      alert("Invalid email or password");
    }
  };
  const ProfileSection = () => {
    if (!currentUser) return null; // Prevent errors

    return (
      <div className="profile-section text-center mt-5">
        <img
          src={currentUser.image || "default-profile.png"} // Fallback image
          alt="Profile"
          className="profile-image rounded-circle mb-3"
        />
        <h2 className="profile-name">Welcome, {currentUser.name}!</h2>
        <p className="profile-email text-muted">{currentUser.email}</p>
        <p className="text-secondary">Member since: {currentUser.joinedDate}</p>
        <button
          className="btn btn-danger logout-btn"
          onClick={() => {
            setCurrentUser(null);
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    );
  };
  // ================ Auth Switch Button ================
  const AuthSwitchButton = ({ isLoginView }) => (
    <div className="text-center mt-4">
      <button
        className="btn btn-outline-primary switch-btn"
        onClick={() => {
          if (isLoginView) {
            navigate("/signup"); // Redirect to Sign Up
          } else {
            navigate("/login"); // Redirect to Login
          }
        }}
      >
        {isLoginView ? (
          <>
            <i className="bi bi-person-plus me-2"></i>
            Create New Account
          </>
        ) : (
          <>
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Already have an account?
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="app-wrapper">
      {/* Animated Background */}
      <div className="animated-background"></div>

      {/* Main Content */}
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/game" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/game" />
              ) : (
                <>
                  <Login onLogin={handleLogin} />
                  <AuthSwitchButton isLoginView={true} />
                </>
              )
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? (
                <Navigate to="/game" />
              ) : (
                <>
                  <SignUp onSignUp={handleSignUp} />
                  <AuthSwitchButton isLoginView={false} />
                </>
              )
            }
          />
          <Route
            path="/game"
            element={
              currentUser ? (
                <>
                  {" "}
                  <ProfileSection />
                  <Game />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
