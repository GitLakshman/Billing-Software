import { ToastContainer } from "react-toastify";
import AppRouter from "./routers/AppRouter";
import MenuBar from "./components/MenuBar";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <MenuBar />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <AppRouter />
    </>
  );
};

export default App;
