import React from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';  // GraphQL query to get user data
import { REMOVE_BOOK } from '../utils/mutations';  // GraphQL mutation to remove book
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // Get user data from GraphQL with useQuery hook
  const { loading, data } = useQuery(GET_ME);
  
  // Mutation for removing a book from savedBooks list
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Get user data from the query response, or set an empty object if no data
  const userData = data?.me || {};

  // Handle deleting a book
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Call the removeBook mutation
      await removeBook({
        variables: { bookId },  // Pass bookId to the mutation
      });

      // Remove the book ID from localStorage
      removeBookId(bookId);

      // Optionally refetch the user data or update the state manually to reflect the changes
    } catch (err) {
      console.error(err);
    }
  };

  // If the data is still loading, show a loading message
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors.join(', ')}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;