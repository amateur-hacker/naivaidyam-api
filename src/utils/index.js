export const missingFieldsErrorMsg = (fields) => {
  let missingFields = "";
  let count = 0;

  for (let fieldName in fields) {
    if (fields[fieldName] === undefined) {
      if (count > 0) {
        missingFields += ", ";
      }
      missingFields += fieldName;
      count++;
    }
  }

  if (missingFields) {
    const plural = count > 1 ? "s" : "";
    const errorMsg = `Missing required field${plural}: ${missingFields}`;
    return errorMsg;
  }

  return null;
};