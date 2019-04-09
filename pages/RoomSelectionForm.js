import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import RoomSelection from './RoomSelection';

import Api from '../utils/api';
import Context from '../context';
import map from 'lodash/map';

import {
    FETCH_ROOMS,
    ROOMS_URL,
    SET_SAVED_ROOMS,
    TOGGLE_ENABLE_ROOM,
    UPDATE_ROOMS_COUNT
} from '../constants';

const api = new Api();

const RoomSelectionContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
`;
const MainForm = styled.form`
    padding: 30px;
`;
const SubmitButton = styled.button`
    background-color: #c0c0c0;
    display: flex;
    font-size: 14px;
    font-weight: 100;
    margin-top: 15px;
    padding: 5px 10px;
    &:hover {
        cursor: pointer;
    }
`;

const RoomSelectionForm = () => {
    // Using effect to call the fetch rooms function from the server and setting the rooms
    useEffect(() => {
        fetchRooms();
    }, []);

    // Function to fetch the rooms from the server db.json mocked file
    const fetchRooms = async () => {
        const rooms = await api.get(ROOMS_URL);
        dispatch({ type: FETCH_ROOMS, payload: rooms });
    };

    // Destructuring the state and dispatch from the use context
    const { state, dispatch } = useContext(Context);

    // Destructuring the rooms from the state
    const { rooms } = state;

    // Function that handles the changing of the selection
    const onSelectChange = selectionChanged => e => {
        // Getting the value from the option that was selected
        const selectionValue = e.target.value;
        // Reformatting the payload with the value that was given
        const payload = {
            ...selectionChanged,
            selectionValue
        };
        dispatch({
            type: UPDATE_ROOMS_COUNT,
            payload
        });
    };

    // Function for toggling the room on and off
    const toggleRoom = id => () => {
        dispatch({ type: TOGGLE_ENABLE_ROOM, payload: id });
    };

    // Function for handling the submission of the selected rooms
    const submitRoomSelection = async e => {
        e.preventDefault();
        const { rooms } = state;

        let updatedRooms = [];

        /**
         * THIS IS NOT A REALISTIC WAY OF DOING THE API CALL
         * HOWEVER, Json-Server only allows for the put request to be made on one item at a time at a specific endpoint
         * You can't update multiple items using it so since there are only 4 rooms I can do them individual like this
         * If there were a dynamic amount of rooms, the call would be different
         * Otherwise we will get a 404 Not Found error on just the original /rooms ROUTE
         */

        const updateRoom1 = await api.put(
            `${ROOMS_URL}/${rooms[0].id}`,
            rooms[0]
        );
        updatedRooms.push(updateRoom1);
        const updateRoom2 = await api.put(
            `${ROOMS_URL}/${rooms[1].id}`,
            rooms[1]
        );
        updatedRooms.push(updateRoom2);
        const updateRoom3 = await api.put(
            `${ROOMS_URL}/${rooms[2].id}`,
            rooms[2]
        );
        updatedRooms.push(updateRoom3);
        const updateRoom4 = await api.put(
            `${ROOMS_URL}/${rooms[3].id}`,
            rooms[3]
        );
        updatedRooms.push(updateRoom4);

        dispatch({ type: SET_SAVED_ROOMS, payload: updatedRooms });
    };

    return (
        <MainForm>
            <RoomSelectionContainer>
                {map(rooms, room => (
                    <RoomSelection
                        className="room-selection-component"
                        key={room.id}
                        onSelectChange={onSelectChange}
                        room={room}
                        toggleRoom={toggleRoom}
                    />
                ))}
            </RoomSelectionContainer>
            <SubmitButton
                className="submit-rooms-button"
                onClick={submitRoomSelection}
            >
                Submit
            </SubmitButton>
        </MainForm>
    );
};

export default RoomSelectionForm;
