/**
 * Helper for pagination.
 *  * This checks the direction we are paging and then set the filter as following.
 * @param {Sting} direction
 * @param {Int} page
 * @param {Array} filterNow
 * @returns list with added filter
 */
export const getPageFilter = (direction, page, filterNow) => {
  if (direction === 'f') {
    const filter = [...filterNow];
    filter.push(`skip=${page * 10}`);
    return filter;
  }
  const filter = [...filterNow];
  if (page * 10 < 0) {
    // TODO: error handling here
    console.log('too low');
    return ('null');
  }
  filter.push(`skip=${page * 10}`);
  return filter;
};

/**
 * Helper for changing the filter.
 * Adds wanted filters to the previous filter. Als checks if filter already includes said filter.
 * @param {Array} filterNow
 * @param {Array} addToFilter
 * @returns Filter array with new filter added.
 */
export const newFilter = (filterNow, addToFilter) => {
  const filter = [...filterNow];
  const adding = addToFilter[0].split('=')[0];
  for (let s = 0; s < filter.length; s += 1) {
    if (filter[s].includes(adding)) {
      filter.pop(s);
    }
  }
  filter.push(addToFilter[0]);
  return filter;
};
