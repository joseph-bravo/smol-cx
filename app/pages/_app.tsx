import { ToastContainer } from 'react-toastify';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="colored"
      />
      <Component {...pageProps} />
    </>
  );
};

export default App;
