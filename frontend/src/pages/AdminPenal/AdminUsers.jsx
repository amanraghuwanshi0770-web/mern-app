import { useEffect, useState } from "react";
import { getAdminUsers } from "../../api/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers()
      .then((response) => setUsers(response.data.users || []))
      .catch((error) =>
        setError(error.response?.data?.message || "Users loading failed")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="admin-page-title">Manage Users</h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="admin-error">{error}</p>}

      {!loading && !error && (
        <div className="admin-table-card">
          <div className="admin-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || "-"}</td>
                      <td>{user.role}</td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;