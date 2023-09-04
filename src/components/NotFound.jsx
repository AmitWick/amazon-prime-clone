import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <p>Wrong Page</p>
        <Link to={"/"}>Back to Home Page</Link>
      </div>
    </div>
  );
};

export default NotFound;
