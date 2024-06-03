"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../services/api';
import { Container, TextField, Button, Typography } from '@mui/material';

const NewBook = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    api.post('/books', {
      title,
      short_description: shortDescription,
      full_description: fullDescription,
      author,
    })
      .then(() => {
        router.push('/');
      })
      .catch(error => {
        console.error('Error creating book:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Book
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

export default NewBook;
