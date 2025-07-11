import React, { useState, useEffect } from "react";
import { UserAuth } from "../../DataLayer/Context/Context";
import { useNavigate } from "react-router-dom";
import { BoxArrowRight, PencilSquare, PlusCircleFill } from 'react-bootstrap-icons';
import { useGetData } from "../../DataLayer/DataAccessLayer";
import "./profile.css";

const Profile = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const { response: allIngredients, error, isLoading_ } = useGetData('recipe');
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    if (user && user.uid && allIngredients) {
      const filtered = allIngredients.filter(ingredient => ingredient.userId === user.uid);
      setUserIngredients(filtered);
    }
  }, [user, allIngredients]);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Section */}
        <header className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account and shared ingredients</p>
        </header>

        <div className="profile-content">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-summary">
              <div className="avatar-container">
                <img
                  src={user?.photoURL || `https://i.pravatar.cc/150?u=${user?.uid}`}
                  alt="Profile"
                  className="profile-avatar"
                />
                <button 
                  className="edit-avatar-btn"
                  onClick={() => navigate('/edit-profile')}
                >
                  <PencilSquare />
                </button>
              </div>
              
              <div className="profile-info">
                <h2>{user?.displayName || "Passionate Chef"}</h2>
                <p className="profile-email">{user?.email}</p>
                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-number">{userIngredients.length}</span>
                    <span className="stat-label">Shared Ingredients</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">0</span>
                    <span className="stat-label">Recipes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button 
                className="btn primary"
                onClick={() => navigate('/addRecipe')}
              >
                <PlusCircleFill className="icon" />
                Share New Ingredient
              </button>
              <button 
                className="btn secondary"
                onClick={() => navigate('/edit-profile')}
              >
                <PencilSquare className="icon" />
                Edit Profile
              </button>
              <button 
                className="btn danger"
                onClick={handleLogOut}
              >
                <BoxArrowRight className="icon" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Ingredients Section */}
          <section className="ingredients-section">
            <div className="section-header">
              <h2>My Shared Ingredients</h2>
              <div className="search-filter">
                <input type="text" placeholder="Search ingredients..." />
                <select>
                  <option>All Categories</option>
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Dairy</option>
                </select>
              </div>
            </div>

            {/* Content based on state */}
            {isLoading_ ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your ingredients...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <div className="error-icon">!</div>
                <h3>Oops! Something went wrong</h3>
                <p>We couldn't load your ingredients. Please try again later.</p>
                <button className="btn primary">Retry</button>
              </div>
            ) : userIngredients.length > 0 ? (
              <div className="ingredients-grid">
                {userIngredients.map((item) => (
                  <div key={item.id} className="ingredient-card">
                    <div className="ingredient-image">
                      <img 
                        src={`https://picsum.photos/seed/${encodeURIComponent(item.name)}/300/510` || 'https://via.placeholder.com/150?text=Ingredient'} 
                        alt={item.name}
                      />
                    </div>
                    <div className="ingredient-info">
                      <h3>{item.name}</h3>
                      <p className="ingredient-location">
                        <span className="location-icon">📍</span>
                        {item?.country?.name || 'Location not specified'}
                      </p>
                      <div className="ingredient-meta">
                        <span className="category">Vegetable</span>
                        <span className="date">Shared 2 days ago</span>
                      </div>
                    </div>
                    <div className="ingredient-actions">
                      <button 
                        className="btn view-btn"
                        onClick={() => navigate(`/viewRecipe/${item.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🍅</div>
                <h3>No Ingredients Shared Yet</h3>
                <p>You haven't shared any ingredients with the community. Get started by sharing your first ingredient!</p>
                <button 
                  className="btn primary"
                  onClick={() => navigate('/addRecipe')}
                >
                  <PlusCircleFill className="icon" />
                  Share Your First Ingredient
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;