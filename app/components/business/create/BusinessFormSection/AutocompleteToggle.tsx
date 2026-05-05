type AutocompleteToggleProps = {
  showAutocomplete: boolean;
  setShowAutocomplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const AutocompleteToggle = ({
  showAutocomplete,
  setShowAutocomplete,
}: AutocompleteToggleProps) => {
  return (
    <div>
      <label className="inline-flex items-center text-gray-400 text-sm font-semibold">
        <input
          type="checkbox"
          checked={showAutocomplete}
          onChange={(e) => setShowAutocomplete(e.target.checked)}
          className="mr-2"
        />
        Use Address Autocomplete
      </label>
    </div>
  );
};

export default AutocompleteToggle;
