import { ToastContainer } from "react-toastify";
import MenuBar from "./components/MenuBar";
import AppRouter from "./routers/AppRouter";

const App = () => {
  return (
    <>
      <MenuBar />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppRouter />
    </>
  );
};

export default App;
