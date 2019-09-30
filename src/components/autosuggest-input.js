import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
const StyledAutosuggestInput = styled.div`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    width: 240px;
    height: 30px;
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #aaa;
    border-radius: 4px;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
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
    width: 280px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
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
    background-color: #ddd;
  }
`;

const AutosuggestInput = ({ placeholder, value, onUpdate, items }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => setInputValue(value), [value]);

  // Imagine you have a list of languages that you'd like to autosuggest.

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = val => {
    const inputValue = val.trim().toLowerCase();

    return items.filter(item => item.name.toLowerCase().includes(inputValue));
  };

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder,
    value: inputValue ? inputValue : '',
    onChange: e => {
      const { value } = e.target;
      setInputValue(value);

      if (value === '' && onUpdate) {
        onUpdate(value);
      }
    }
  };

  // Finally, render it!
  return (
    <StyledAutosuggestInput>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => {
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={(event, { suggestionValue }) => {
          event.preventDefault();
          setInputValue(suggestionValue);
          if (onUpdate) {
            onUpdate(suggestionValue);
          }
        }}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </StyledAutosuggestInput>
  );
};

export default AutosuggestInput;
