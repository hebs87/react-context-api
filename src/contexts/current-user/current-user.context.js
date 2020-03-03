// Import createContext to use Context API
// It is a method that can take anything like
// strings, integers, objects, functions, etc.
// and stores them as its initial state
import { createContext } from 'react';

// Create a CurrentUserContext and set its initial state to undefined
const CurrentUserContext = createContext(undefined);

export default CurrentUserContext;
