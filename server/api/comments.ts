export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return $fetch('https://dummyjson.com/comments', {query: query});
})