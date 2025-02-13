import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to Nodepop</h1>
      <p className="text-gray-600 mt-2">The best marketplace for buying and selling.</p>

      {/* Navigation buttons */}
      <nav className="flex flex-col gap-4 mt-6">
        {!isAuthenticated && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        {isAuthenticated ? (
          <>
            <Link to="/adverts">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                View Adverts
              </button>
            </Link>
            <Link to="/advert/new">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                Create Advert
              </button>
            </Link>
            {/* Logout button */}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/login")}
            >
              View Adverts
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/login")}
            >
              Create Advert
            </button>
          </>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold">Are you sure you want to log out?</h2>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                }}
              >
                Yes, Logout
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;



