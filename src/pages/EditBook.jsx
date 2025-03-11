import  { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://full-backend-gxdc.onrender.com/books/${id}`);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleEditBook = async () => {
    if (!title || !author || !publishYear) {
      enqueueSnackbar('Please fill in all fields', { variant: 'error' });
      return;
    }

    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    try {
      await axios.put(`https://full-backend-gxdc.onrender.com/books/${id}`, data);
      enqueueSnackbar('Book Edited successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      setError(error.message);
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading && <Spinner />}
      {error && <p className='text-red-500'>{error}</p>}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
