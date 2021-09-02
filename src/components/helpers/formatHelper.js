export function mapToSelectMultiple(options) {
  const formatedOptions = options
    ? options.map(option => {
        return {
          value: option.id,
          label: option.name
            ? option.name + " " + (option.lastName ? option.lastName : "")
            : option.title
        };
      })
    : [];
  return formatedOptions;
}

export function mapVotingsToSelect(options) {
  const formatedOptions = options
    ? options.map(option => {
        return {
          value: option.id,
          label: option.abstract
            ? option.abstract
            : option.name
            ? option.name + " " + (option.lastName ? option.lastName : "")
            : option.title,
          abstract: option.abstract,
          title: option.title
        };
      })
    : [];
  return formatedOptions;
}
