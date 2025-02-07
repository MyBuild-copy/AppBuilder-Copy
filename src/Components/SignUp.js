import React, { useState } from "react";
import "./SignUp.css";

const SignUp = ({ onSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(name, email, password, image);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-3 mb-5 bg-white rounded animateanimated animatefadeIn">
        <div className="card-body">
          <h2 className="card-title text-center">
            <i className="bi bi-person-plus me-2"></i>
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-person me-2"></i>
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-envelope me-2"></i>
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-lock me-2"></i>
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-image me-2"></i>
                Profile Image:
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {imagePreview && (
                <div className="mt-2 text-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              )}
            </div>

            {/* Sign Up Button */}
            <button type="submit" className="btn btn-success w-100">
              <i className="bi bi-person-plus me-2"></i>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
