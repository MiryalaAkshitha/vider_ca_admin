export function handleError(error: any) {
  let result = error?.response?.data?.message;

  if (Array.isArray(result)) {
    return result[0];
  } else {
    return result;
  }
}
