import { useState, useEffect } from "react";
import { getprofile, updateprofile } from "../api/api";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getprofile();
        const userData = response.data.user;
        setUser(userData);
        setName(userData.name || "");
        setPhone(userData.phone || "");
        setAddress(userData.address || "");
      } catch (error) {
        console.log(error);
      }}

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateprofile({ name, phone, address });
      setUser(response.data.user);
      setEditMode(false);
      setMessage("Profile updated successfully");
    } catch (error) {
      console.log(error);
      setMessage("Profile update failed");
    }
  }

    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  if (!user) return 
 <p  className='loader'style={{ textAlign: "center", fontSize: "18px", color: "gray", marginTop: "40px" }}>fdddddd</p>
  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-user">
          <div className="profile-avatar"><CgProfile /></div>
          <div><span>Hello,</span><h2>{user.name}</h2></div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-title">
            <Link to='/myorder'>MY ORDERS</Link>
            </div>
        </div>

        <button className="login-button" onClick={handleLogout}>
        Logout
        </button>
      </div>  

      <main className="profile-content">
        <form onSubmit={handleUpdate}>
          <section className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!edit && <button type="button" onClick={() => setEdit(true)}>Edit</button>}
            </div>

            <div className="name-fields">
              <div className="input-box">
                <input type="text" value={name} disabled={!edit} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div className="gender-box">
              <h3>Your Gender</h3>
              <label><input type="radio" name="gender" /> Male</label>
              <label><input type="radio" name="gender" /> Female</label>
            </div>
          </section>

          <section className="profile-section">
            <div className="section-header">
              <h2>Email Address</h2>
            </div>

            <div className="input-box single-input">
              <input type="email" value={user.email} disabled />
            </div>
          </section>

          <section className="profile-section">
            <div className="section-header">
              <h2>Mobile Number</h2>
              {!edit && <button type="button" onClick={() => setEdit(true)}>Edit</button>}
            </div>
            <div className="input-box single-input">
              <input type="text" value={phone} disabled={!edit} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </section>

          <section className="profile-section">
            <div className="section-header"><h2>Address</h2></div>
            <textarea className="address-input" value={address} disabled={!edit} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" />
          </section>

          {edit && (
            <div className="save-buttons">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setEdit(false)}>Cancel</button>
            </div>
          )}

          {message && <p>{message}</p>}
        </form>
      </main>
    </div>
  );
}

export default Profile;