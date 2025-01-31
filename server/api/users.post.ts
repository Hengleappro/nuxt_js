export default defineEventHandler(async (event) => {
  const body = await readBody(event)
    const headers = getHeaders(event)
    return $fetch('http://localhost:3000/users',{
        method: 'POST',
        headers: headers,
        body: body,
    });
})
