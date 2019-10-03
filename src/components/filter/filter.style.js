import styled from 'styled-components';

const StyledFilter = styled.div`
  position: relative;
  padding: 0;

  .filter__wrapper,
  .filter__selects {
    display: flex;
  }

  .filter__input {
    flex-grow: 2;
  }

  .filter__select {
    position: relative;
    width: 50%;
  }

  button {
    appearance: none;
    outline: none;
    border: none;
    background: white;
    color: black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    padding: 15px 20px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: #f4f4f4;
    }
  }

  select {
    width: 100%;
    height: 50px;
    background: none;
    border: none;
    outline: none;
    border-radius: 0;
    margin: 0;
    appearance: none;
    font-size: 14px;
    color: inherit;
    font-family: inherit;
    padding: 10px 20px;
    border-bottom: 1px solid black;
  }

  select::-ms-expand {
    display: none;
  }

  .filter__select-icon {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;

    &:before,
    &:after {
      position: absolute;
      content: '';
      top: 1px;
      width: 10px;
      height: 2px;
      border-radius: 1px;
      background: black;
    }

    &:before {
      left: -1px;
      transform: rotate(45deg);
      transform-origin: top left;
    }

    &:after {
      left: 1px;
      transform: rotate(-45deg);
      transform-origin: top right;
    }
  }

  .filter__select:first-of-type select {
    border-right: 1px solid black;
  }
`;

export default StyledFilter;
