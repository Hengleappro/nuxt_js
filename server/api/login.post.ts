export default defineEventHandler(async (Event) => {
    try {
      const body = await readBody(Event);
      const headers = getHeaders(Event);
  
      // Assuming your backend needs to do something with the body (e.g., authenticate)
      const response = await $fetch('/your-auth-endpoint', {
        method: 'POST',
        headers: headers,
        body: body,
      });
  
      // Return whatever response you get from the authentication service
      return response;
    } catch (error) {
      return { error: 'Login failed', message: error.message };
    }
  });
  