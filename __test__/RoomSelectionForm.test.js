import React, { useContext, useReducer } from 'react';
import { render, cleanup } from 'react-testing-library';

import RoomSelectionForm from '../pages/RoomSelectionForm';

import Context from '../context';
import reducer from '../reducer';
import Api from '../utils/api';

afterEach(cleanup);

/**
 * Functional component that renders out the context and provider to mock the store and reducer
 * We need to use react-testing-library in order to test the React Hooks since Enzyme does not currently support it
 * @param { Object } props the props being passed to the component to use
 */
const TestComponent = props => {
    // Creating the initial state from use context
    const initialState = useContext(Context);
    // Getting the state and dispatch from the useReducer passing in the reducer and initial state from context
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }}>
            {props.children}
        </Context.Provider>
    );
};

/**
 * Function that we will reuse for rendering out the <RoomSelectionForm /> inside of the test component with the state needed
 */
const setup = () => {
    const { container } = render(
        <TestComponent>
            <RoomSelectionForm />
        </TestComponent>
    );

    return container;
};

/**
 *
 * @param { ShallowWrapper } wrapper Enzyme shallow wrapper to search within
 * @param { String } attribute The attribute we will be using to search by
 * @param { String } name The class or id that we will be searching for
 */
const findByClass = (wrapper, attribute, name) => {
    if (attribute === 'id') {
        return wrapper.querySelector(`#${name}`);
    }
    return wrapper.querySelector(`.${name}`);
};

describe('<RoomSelectionForm />', () => {
    it('should render without crashing', () => {
        const wrapper = setup();

        expect(wrapper).toBeTruthy();
    });

    it('should render a submit button', () => {
        const wrapper = setup();
        const roomSelection = findByClass(
            wrapper,
            'className',
            'submit-rooms-button'
        );

        expect(roomSelection).toBeTruthy();
    });

    it('should render a submit button', () => {
        const wrapper = setup();
        const button = findByClass(wrapper, 'className', 'submit-rooms-button');

        expect(button).toBeTruthy();
    });
});
