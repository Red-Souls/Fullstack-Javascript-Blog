import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.css';
import {useEffect} from 'react';
import Navbar from '@/components/Navbar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.js');
  }, []);
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  )
}
