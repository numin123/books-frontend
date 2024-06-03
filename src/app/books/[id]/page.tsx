"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import api from '../../../services/api';
import { Book } from '../../../types/Book';
import { Container, TextField, Button, Typography } from '@mui/material';

const EditBook = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/books/${id}`)
        .then(response => {
          const bookData = response.data;
          setBook(bookData);
          setTitle(bookData.title);
          setShortDescription(bookData.short_description);
          setFullDescription(bookData.full_description);
          setAuthor(bookData.author);
        })
        .catch(error => {
          console.error('Error fetching book:', error);
        });
    }
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    api.put(`/books/${id}`, {
      title,
      short_description: shortDescription,
      full_description: fullDescription,
      author,
    })
      .then(() => {
        router.push('/');
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };

  if (!book) return null;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Short Description"
          value={shortDescription}
          onChange={e => setShortDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Full Description"
          value={fullDescription}
          onChange={e => setFullDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default EditBook;
