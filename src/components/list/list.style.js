import styled from 'styled-components';

const StyledList = styled.aside`
  position: relative;
  width: 55%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 2;
  overflow-y: auto;
  border-left: 1px solid black;

  .list__headline {
    padding: 15px 20px 10px;
    background: black;
    color: white;
  }

  .list__wrapper {
    flex-grow: 2;
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;

    td {
      padding: 15px;
      border-bottom: 1px solid black;
      vertical-align: middle;
    }

    thead td {
      top: 0;
      position: sticky;
      background: #000;
      color: #fff;
      z-index: 1;
      font-weight: bold;
      font-size: 14px;
    }
  }

  tr:hover {
    cursor: pointer;
    background: #f4f4f4;
  }

  p {
    margin: 0;
  }

  .list__city {
    display: inline-flex;
    align-items: center;
    font-weight: bold;

    button {
      appearance: none;
      outline: none;
      border: none;
      background: none;
      cursor: pointer;
      margin-right: 10px;
      padding: 0;

      svg {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

export default StyledList;
