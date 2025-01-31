export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return $fetch('https://dummyjson.com/quotes', {query: query});
})
