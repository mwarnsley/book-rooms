import { createContext } from 'react';

// Creating the context from react which is basically the state
const Context = createContext({
    rooms: []
});

export default Context;
