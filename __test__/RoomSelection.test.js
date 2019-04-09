import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import RoomSelection from '../pages/RoomSelection';

Enzyme.configure({ adapter: new EnzymeAdapter() });

// The initial props being used by the component
const defaultProps = {
    onSelectChange: () => {},
    room: {
        id: '',
        name: '',
        adults: '',
        children: '',
        enabled: false,
        alwaysOn: false
    },
    toggleRoom: () => {}
};

/**
 * Setup function that we can reuse in order to setup the component
 * @param { Object } props representing the props that are being passed to the component if any
 * @param { Object } state representing the state being used for the component if any
 * @returns { ShallowWrapper }
 */
const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    const wrapper = shallow(<RoomSelection {...setupProps} />);

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

describe('<RoomSelection />', () => {
    it('should render without crashing', () => {
        const wrapper = setup();
        expect(wrapper).toBeTruthy();
    });

    it('should render a checkbox', () => {
        const wrapper = setup();
        const checkbox = findByClass(wrapper, 'className', 'toggle-enabled');
        expect(checkbox.length).toBe(1);
    });

    it('should allow for the checkbox to change', () => {
        const wrapper = setup();
        const checkbox = findByClass(wrapper, 'className', 'toggle-enabled');
        expect(checkbox.props().checked).toBeFalsy();
    });

    it('should render a adult selection list', () => {
        const wrapper = setup();
        const adultSelection = findByClass(
            wrapper,
            'className',
            'adults-selection'
        );
        expect(adultSelection.length).toBe(1);
    });

    it('should render a children selection list', () => {
        const wrapper = setup();
        const childrenSelection = findByClass(
            wrapper,
            'className',
            'children-selection'
        );
        expect(childrenSelection.length).toBe(1);
    });
});
