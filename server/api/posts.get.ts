export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return $fetch('https://dummyjson.com/posts', {query: query});
})