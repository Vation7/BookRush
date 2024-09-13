import { gql } from '@apollo/client';

// Define the 'me' query to get the logged-in user's data
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;