function useParams() {
  const query = new URLSearchParams(window.location.search);

  return query;
}

export default useParams;
