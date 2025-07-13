import React, { useState, useEffect } from "react";
import { UserAuth } from "../../DataLayer/Context/Context";
import { useNavigate } from "react-router-dom";
import { BoxArrowRight, PencilSquare, PlusCircleFill } from 'react-bootstrap-icons';
import { useGetData } from "../../DataLayer/DataAccessLayer";
import { Spinner, Container, Button } from 'reactstrap';
import "./profile.css";

const Profile = () => {
  const { user, logOut, isAuthenticated, isAnonymous } = UserAuth();
  const navigate = useNavigate();
  const [errLog, setErrLog] = useState(null);
  const { response: allIngredients, error, isLoading_, refetch } = useGetData('recipe');
  const { response: catResponse, error: catError, isLoading_: catLoading } = useGetData('category');
  const [userIngredients, setUserIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    if (isAuthenticated && !isAnonymous && allIngredients && user?.uid) {
      const filtered = allIngredients.filter(ingredient => {
        // Check if userId matches OR if displayName matches (case-insensitive)
        const userIdMatch = ingredient.userId === user.uid;
        const displayNameMatch = ingredient.name && user.displayName && 
          ingredient.author.toLowerCase().includes(user.displayName.toLowerCase());
        
        return userIdMatch || displayNameMatch;
      });
      setUserIngredients(filtered);
    }
  }, [allIngredients, isAnonymous, isAuthenticated, user?.uid, user?.displayName]);

  const refresh = (e) => {
    e.preventDefault();
    // If your useGetData hook provides a refetch function, use it
    if (refetch) {
      refetch();
    } else {
      // Alternative: force re-render by reloading the page
      window.location.reload();
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
   
      setErrLog(`An error occurred while logging out: ${error.message}`);
    }
  };

// Filter ingredients acc search term and category
const filteredIngredients = userIngredients.filter(ingredient => {
  const matchesSearch = ingredient.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       ingredient.description?.toLowerCase().includes(searchTerm.toLowerCase());
  

  const matchesCategory = selectedCategory === 'All Categories' || 
                         (ingredient.ingredients && ingredient.ingredients.some(ing => 
                           ing.type === selectedCategory
                         ));
  
  return matchesSearch && matchesCategory;
});

  if (!isAuthenticated) {
    return (
      <div className="signin-prompt">
        <h2>Please Sign In to View Your Profile</h2>
        <button className="btn primary" onClick={() => navigate('/signIn')}>
          Sign In
        </button>
      </div>
    );
  }

  // Loading state - wait for both recipe and category data
  if (isLoading_ || catLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="text-center">
          <Spinner animation="grow" variant="light" />
          <p className="mt-3">Loading your profile...</p>
        </div>
      </Container>
    );
  }

  // Error state - check both recipe and category errors
  if (error || catError || errLog) {
    return (
      <Container className="bg-light border">
        <h1 className="notfoundText">An error occurred: {error || catError || errLog}</h1>
        <Button onClick={refresh}>Retry Loading All</Button>
      </Container>
    );
  }

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
                <input 
                name="search-input"
                  type="text" 
                  placeholder="Search ingredients..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select className="text-secondary"
                name="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  {catResponse && catResponse.map((category) => (
                    <option key={category.id} value={category.value}>
                      {category.text || category.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Content based on state */}
            {filteredIngredients.length > 0 ? (
              <div className="ingredients-grid">
                {filteredIngredients.map((item) => (
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
                        <span className="category">{item.category || 'Vegetable'}</span>
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
            ) : userIngredients.length === 0 ? (
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
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>No Ingredients Found</h3>
                <p>No ingredients match your current search criteria. Try adjusting your search or category filter.</p>
                <button 
                  className="btn secondary"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Categories');
                  }}
                >
                  Clear Filters
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