import {
    FETCH_ROOMS,
    SET_SAVED_ROOMS,
    TOGGLE_ENABLE_ROOM,
    UPDATE_ROOMS_COUNT
} from './constants';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

// The main or root reducer being used to hold all of the state
export default function reducer(state, { type, payload }) {
    switch (type) {
        case FETCH_ROOMS:
            const fetchedRooms = payload;
            return {
                ...state,
                rooms: fetchedRooms
            };
        case TOGGLE_ENABLE_ROOM:
            const roomId = payload;
            const rooms = state.rooms;
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
            return {
                ...state,
                rooms: updateEnableRooms
            };
        case UPDATE_ROOMS_COUNT:
            const updatedRoomId = payload.id;
            const category = payload.category;
            const value = payload.selectionValue;
            const stateRooms = state.rooms;
            // Setting the updated room count based on whether the category is for adults or children
            const updatedRoomCount = map(stateRooms, room => {
                if (room.id === updatedRoomId) {
                    return category === 'adults'
                        ? {
                              ...room,
                              adults: value
                          }
                        : {
                              ...room,
                              children: value
                          };
                }
                return room;
            });
            return {
                ...state,
                rooms: updatedRoomCount
            };
        case SET_SAVED_ROOMS:
            return {
                ...state,
                rooms: payload
            };
        default:
            return state;
    }
}
