import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';

import StyledAutosuggestInput from './autosuggest-input.style';

const AutosuggestInput = ({
  placeholder,
  value,
  onUpdate,
  items,
  ...props
}) => {
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
    <StyledAutosuggestInput {...props}>
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
