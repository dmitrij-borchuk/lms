import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${props => props.width && css`
    width: ${props.width};
    display: inline-block;
  `}
  ${props => props.height && css`
    height: ${props.height};
  `}
`;

function Widget(props) {
  const {
    children,
    width,
    height,
  } = props;

  return (
    <Container
      width={width}
      height={height}
    >
      {children}
    </Container>
  );
}

Widget.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  width: PropTypes.string,
  height: PropTypes.string,
};

Widget.defaultProps = {
  children: [],
  width: null,
  height: null,
};

export default Widget;
