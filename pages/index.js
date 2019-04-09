import { useContext, useReducer } from 'react';
import reducer from '../reducer';
import App from './App';

import Context from '../context';

export default () => {
    // Creating the initial state from use context
    const initialState = useContext(Context);
    // Getting the state and dispatch from the useReducer passing in the reducer and initial state from context
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            <App />
        </Context.Provider>
    );
};
