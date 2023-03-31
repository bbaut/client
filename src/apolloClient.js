import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
// import query from './gql/query';
// import {REGISTER_USER, register} from './gql/mutation'; 

// Set `RestLink` with your endpoint
const restLink = new RestLink({ uri: "http://localhost:4000/" });

// Setup your client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink
});

// Invoke the query and log the person's name
// client.query({ query }).then(response => {
//   console.log(response.data.users);
// });

// client.query({query: REGISTER_USER, variables: {input: register}}).then(response => {
//   console.log(response.data)
// }) 

// client.mutate({mutation: REGISTER_USER, variables: {input: register}}).then(response => {
//   console.log(response.data)
// }) 

export default client;