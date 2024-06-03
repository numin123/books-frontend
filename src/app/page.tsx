// pages/index.tsx
"use client";
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Book } from '../types/Book';
import Link from 'next/link';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, IconButton, Box } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    api.get('/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4" component="h1">
          Book List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          component={Link}
          href="/books/new"
        >
          Add New Book
        </Button>
      </Box>
      <Grid container spacing={3}>
        {books.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.short_description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  component={Link}
                  href={`/books/${book.id}`}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  function handleDelete(id: number) {
    api.delete(`/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  }
};

export default Home;
