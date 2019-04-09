import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import map from 'lodash/map';

const RoomSelectionContainer = styled.div`
    border-radius: 7px;
    margin-right: 10px;
    padding: 5px;
    width: auto;
`;

const RoomHeader = styled.p`
    font-size: 12px;
    font-weight: 400;
    margin: 5px 0 5px 0;
    text-align: left;
`;

const SelectionContainer = styled.div`
    align-items: center;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    padding: 5px 5px 15px 5px;
`;

const ContentSection = styled.section`
    margin-right: 20px;
`;

const SelectionContentHeaders = styled.p`
    font-size: 12px;
    margin: 0;
    padding: 0;
`;

const RoomSelection = ({ onSelectChange, room, toggleRoom }) => {
    return (
        <RoomSelectionContainer
            style={{ backgroundColor: room.enabled ? '#e7e7e7' : '#dbdbe3' }}
        >
            <RoomHeader
                style={{ fontWeight: room.enabled ? 'bold' : 'normal' }}
            >
                {!room.alwaysOn ? (
                    <input
                        checked={room.enabled}
                        className="toggle-enabled"
                        onChange={toggleRoom(room.id)}
                        type="checkbox"
                    />
                ) : null}{' '}
                {room.name}
            </RoomHeader>
            <SelectionContainer
                style={{
                    backgroundColor: room.enabled ? '#ffffff' : '#dbdbe3'
                }}
            >
                <ContentSection>
                    <SelectionContentHeaders>Adults</SelectionContentHeaders>
                    <SelectionContentHeaders>(18+)</SelectionContentHeaders>
                    <select
                        className="adults-selection"
                        disabled={!room.enabled}
                        onChange={onSelectChange({
                            id: room.id,
                            category: 'adults'
                        })}
                        value={room.adults}
                    >
                        {map([1, 2], option => (
                            <option
                                key={`adult_option_${option}`}
                                value={option}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                </ContentSection>
                <ContentSection>
                    <SelectionContentHeaders>Children</SelectionContentHeaders>
                    <SelectionContentHeaders>(0-17)</SelectionContentHeaders>
                    <select
                        className="children-selection"
                        disabled={!room.enabled}
                        onChange={onSelectChange({
                            id: room.id,
                            category: 'children'
                        })}
                        value={room.children}
                    >
                        {map([0, 1, 2], option => (
                            <option
                                key={`chilrend_option_${option}`}
                                value={option}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                </ContentSection>
            </SelectionContainer>
        </RoomSelectionContainer>
    );
};

RoomSelection.displayName = 'RoomSelection';

RoomSelection.propTypes = {
    onSelectChange: PropTypes.func.isRequired,
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        adults: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired
    }),
    toggleRoom: PropTypes.func.isRequired
};

export default RoomSelection;
