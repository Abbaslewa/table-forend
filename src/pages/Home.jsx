import  { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

import { MdOutlineAddBox, } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://full-backend-gxdc.onrender.com/books') 
      .then((response) => {
        setBooks(response.data.data || response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen p-8'>
      <div className='flex justify-center items-center gap-x-6 mb-6'>
        <button
          className='bg-sky-500 text-white hover:bg-sky-700 px-6 py-2 rounded-md transition-colors duration-300'
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className='bg-sky-500 text-white hover:bg-sky-700 px-6 py-2 rounded-md transition-colors duration-300'
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>
      
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-semibold text-gray-800 mb-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-5xl hover:text-sky-600 transition-colors duration-300 cursor-pointer' />
        </Link>
      </div>

      {loading ? (
        <div className='flex justify-center items-center'>
          <Spinner />
        </div>
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
