import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const AutosuggestInput = ({ placeholder, value, onUpdate, items }) => {
  const [suggestions, setSuggestions] = useState([]);

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
    value: value ? value : '',
    onChange: e => {
      const { value } = e.target;
      onUpdate(value);
    }
  };

  // Finally, render it!
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => {
        setSuggestions(getSuggestions(value));
      }}
      onSuggestionSelected={(event, { suggestionValue }) => {
        event.preventDefault();
        onUpdate(suggestionValue);
      }}
      renderSuggestionsContainer={({ children }) => <div>{children}</div>}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={suggestion => suggestion.name}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutosuggestInput;
