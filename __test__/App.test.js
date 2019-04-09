import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from '../pages/App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

// The initial props being used by the component
const defaultProps = {};

/**
 * Setup function that we can reuse in order to setup the component
 * @param { Object } props representing the props that are being passed to the component if any
 * @param { Object } state representing the state being used for the component if any
 * @returns { ShallowWrapper }
 */
const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    const wrapper = shallow(<App {...setupProps} />);

    return wrapper;
};

/**
 *
 * @param { ShallowWrapper } wrapper Enzyme shallow wrapper to search within
 * @param { String } attribute The attribute we will be using to search by
 * @param { String } name The class or id that we will be searching for
 */
const findByClass = (wrapper, attribute, name) => {
    if (attribute === 'id') {
        return wrapper.find(`#${name}`);
    }
    return wrapper.find(`.${name}`);
};

describe('<App />', () => {
    it('should render without crashing', () => {
        const wrapper = setup();

        expect(wrapper).toBeTruthy();
    });

    it('should render a checkbox', () => {
        const wrapper = setup();
        const roomSelectionForm = findByClass(
            wrapper,
            'className',
            'room-selection-form-component'
        );

        expect(roomSelectionForm).toBeTruthy();
    });
});
