import styled from 'styled-components';

const StyledAutosuggestInput = styled.div`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    width: calc(100% - 40px);
    height: 30px;
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid black;

    &::placeholder {
      color: black;
    }
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__suggestions-container {
    display: none;
    max-height: 400px;
    overflow-y: auto;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 51px;
    width: 100%;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    background-color: white;
    font-size: 14px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #f4f4f4;
  }
`;

export default StyledAutosuggestInput;
