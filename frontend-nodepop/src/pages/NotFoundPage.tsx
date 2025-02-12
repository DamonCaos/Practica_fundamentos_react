import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <button style={{ padding: "10px 20px", marginTop: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
