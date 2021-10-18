function useQueryParams() {
  let url = new URLSearchParams(window.location.search);
  return url;
}

export default useQueryParams;
