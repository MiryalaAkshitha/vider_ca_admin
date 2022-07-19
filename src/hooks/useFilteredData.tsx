function useFilteredData(data: any, searchItems: string[], search: string) {
  let result = data;

  if (searchItems && searchItems.length && search) {
    result = result?.filter((item: any) => {
      return searchItems.some((searchItem: string) => {
        return JSON.stringify(item[searchItem])
          ?.toLowerCase()
          ?.includes(search.toLowerCase());
      });
    });
  }

  return result;
}

export default useFilteredData;
