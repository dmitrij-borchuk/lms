import styled, { css } from 'styled-components';

const cellHeight = 50;
const border = '1px solid #e0e0e0';

export const Container = styled.div`
  border: ${border};
  display: flex;
`;

export const Column = styled.div`
  width: 100%;
`;

export const HoursColumn = styled.div`
  border-right: ${border};
  padding-top: ${cellHeight / 2}px;
`;

export const Hours = styled.div`
  align-items: center;
  display: flex;
  height: ${cellHeight}px;
  padding: 0 10px;
`;

export const Cell = styled.div`
  height: ${cellHeight}px;
  position: relative;
  &:not(:last-child) {
    border-bottom: ${border};
  }
`;

export const Event = styled.div`
  background: blue;
  border-radius: 3px;
  box-shadow: 0px 0px 4px grey;
  position: absolute;
  width: 100%;
  z-index: 1;
  &:nth-child(even) {
    width: 97%;
    left: 3%;
  }
  &:hover {
    z-index: 2;
  }
  ${props => props.height && css`
    height: ${props.height}%;
  `}
  ${props => props.top && css`
    top: ${props.top}%;
  `}
`;
