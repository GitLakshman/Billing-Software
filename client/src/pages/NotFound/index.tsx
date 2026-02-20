import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import "./index.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        <div className="notfound-illustration">
          <ExclamationTriangleIcon />
        </div>

        <h1 className="notfound-code">404</h1>

        <hr className="notfound-divider" />

        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-description">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="notfound-actions">
          <button
            className="notfound-btn notfound-btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            <HomeIcon />
            Go to Dashboard
          </button>
          <button
            className="notfound-btn notfound-btn-secondary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
