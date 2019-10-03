import styled from 'styled-components';

export const StyledMarker = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.isCluster ? '30px' : '20px')};
  height: ${props => (props.isCluster ? '30px' : '20px')};
  background: black;
  color: white;
  border-radius: 20px;
  outline: none;
  border: none;
  appearance: none;
  font-weight: bold;
`;

export const StyledMap = styled.div`
  flex-grow: 2;
`;
