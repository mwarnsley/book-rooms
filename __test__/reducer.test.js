import reducer from '../reducer';
import {
    SET_SAVED_ROOMS,
    TOGGLE_ENABLE_ROOM,
    UPDATE_ROOMS_COUNT
} from '../constants';

import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

const initialState = {
    rooms: [
        {
            id: '3jf09aj390wk3f09ka09fkasf',
            name: 'Room 1',
            adults: '1',
            children: '0',
            enabled: true,
            alwaysOn: true
        },
        {
            id: 'smdimaseifjfasj09fk9asdf09asdf',
            name: 'Room 2',
            adults: '1',
            children: '0',
            enabled: false,
            alwaysOn: false
        },
        {
            id: '23fkmadifm0aisd0fkas9dfka9sdf',
            name: 'Room 3',
            adults: '1',
            children: '0',
            enabled: false,
            alwaysOn: false
        },
        {
            id: 'sdmfaoisf09ase90fka09skdf09kas9dfk',
            name: 'Room 4',
            adults: '1',
            children: '0',
            enabled: false,
            alwaysOn: false
        }
    ]
};

describe('reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(initialState, {})).toEqual(initialState);
    });

    it('should updated the toggled room', () => {
        // Getting the rooms from the initial state
        const rooms = initialState.rooms;
        /**
         * Setting the random id to choose from the initial state to test with
         * Since there are different scenarios depending on which room is selected and not selected we are selecting the rooms at random
         * This should simulate the enabling and disabling of rooms at different positions
         */
        const roomId = rooms[Math.floor(Math.random() * rooms.length)].id;
        // Finding the index of the room that was selected in the array so we can modify the ones before it
        const roomIndex = findIndex(rooms, room => room.id === roomId);
        // Checking to see if the room we are clicking on is currently enabled
        const findEnabled = find(rooms, room => room.id === roomId).enabled;
        // Updating the enabled rooms
        const updateEnableRooms = map(rooms, (room, index) => {
            if (index !== 0 && index <= roomIndex && !findEnabled) {
                return {
                    ...room,
                    enabled: true
                };
            } else if (index !== 0 && index >= roomIndex && findEnabled) {
                return {
                    ...room,
                    enabled: false,
                    adults: '1',
                    children: '0'
                };
            }
            return room;
        });

        // Setting the action type of toggling the room to a variable for expect comparison
        const fireAction = reducer(initialState, {
            type: TOGGLE_ENABLE_ROOM,
            payload: roomId
        });

        expect(fireAction).toEqual({
            ...initialState,
            rooms: updateEnableRooms
        });
    });

    it('should update the room count for adults or children', () => {
        // Getting the rooms from the initial state
        const rooms = initialState.rooms;
        // Setting the categories array in order to switch randomly between the two when running the test
        const categories = ['adults', 'children'];

        /**
         * Setting the payload that is expected from the update rooms count action
         * We are doing a lot of random selections to make sure different scenarios are accounted for when running test
         */
        const payload = {
            id: rooms[Math.floor(Math.random() * rooms.length)].id,
            category: categories[Math.floor(Math.random() * categories.length)],
            selectionValue: Math.floor(Math.random() * 2) + 1
        };

        // Setting the updated room count based on whether the category is for adults or children
        const updatedRoomCount = map(rooms, room => {
            if (room.id === payload.id) {
                return payload.category === 'adults'
                    ? {
                          ...room,
                          adults: payload.selectionValue
                      }
                    : {
                          ...room,
                          children: payload.selectionValue
                      };
            }
            return room;
        });

        // Setting the action type of updating the room count for adults and children
        const fireAction = reducer(initialState, {
            type: UPDATE_ROOMS_COUNT,
            payload
        });

        expect(fireAction).toEqual({
            ...initialState,
            rooms: updatedRoomCount
        });
    });

    it('should save the saved rooms to localstorage for page reloads', () => {
        // Setting the action type of saving the rooms to localstorage
        const fireAction = reducer(initialState, {
            type: SET_SAVED_ROOMS,
            payload: initialState.rooms
        });

        // Mocking up the local storage function to return the mocked localstorage
        const localStorageMock = (function() {
            let store = {};
            return {
                getItem: function(key) {
                    return store[key];
                },
                setItem: function(key, value) {
                    store[key] = value.toString();
                },
                clear: function() {
                    store = {};
                },
                removeItem: function(key) {
                    delete store[key];
                }
            };
        })();

        // Setting the local storage item of saved rooms to the mocked localstorage
        localStorageMock.setItem(
            'savedRooms',
            JSON.stringify(initialState.rooms)
        );

        // Testing if the action fired off updates the rooms in the state
        expect(fireAction).toEqual({
            ...initialState,
            rooms: initialState.rooms
        });

        // Getting the saved rooms from the localstorage mock that we created
        const savedRooms = JSON.parse(localStorageMock.getItem('savedRooms'));

        // Testing to make sure that the saved rooms is the same as the initial rooms since nothing was changed in them
        expect(savedRooms).toEqual(initialState.rooms);
    });
});
