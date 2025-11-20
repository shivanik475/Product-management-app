export function useValidation(requiredFields, limits, numberFields) {
  const validateField = (name, value) => {
    // For amount fields (decimals allowed)
    if (['variableDenomPriceMinAmount', 'variableDenomPriceMaxAmount'].includes(name)) {
      if (value && !/^\d+(\.\d{0,2})?$/.test(value)) return false;
    } 
    // Other numeric fields → integers only
    else if (numberFields.includes(name) && !/^\d*$/.test(value)) return false;

    // If text field has max length → block exceeding input
    if (limits[name] && value && value.length > limits[name]) return false;

    return true;
  };

  const validateRequired = (formData, errors) => {
    let valid = true;

    requiredFields.forEach((field) => {
      const val = formData[field];
      if (val === undefined || val === null || String(val).trim() === "") {
        errors[field] = "This field is required";
        valid = false;
      } else {
        errors[field] = "";
      }
    });

    return valid;
  };

  return { validateField, validateRequired };
}
