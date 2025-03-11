import  { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('https://full-backend-gxdc.onrender.com/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-4xl my-6 text-blue-950'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-blue-950 rounded-xl w-[600px] p-6 mx-auto bg-gradient-to-r from-blue-100 to-blue-50'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-blue-950'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-blue-950 px-4 py-2 w-full rounded-lg text-blue-950'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-blue-950'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-blue-950 px-4 py-2 w-full rounded-lg text-blue-950'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-blue-950'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-blue-950 px-4 py-2 w-full rounded-lg text-blue-900'
          />
        </div>
        <button className='p-3 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-all duration-200' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
