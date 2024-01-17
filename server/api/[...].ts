import { joinURL } from 'ufo';

/**
 * Middleware to proxy frontend requrests that hit `/api` to the backend
 */
export default defineEventHandler(async (event) => {
  const { proxyUrl } = useRuntimeConfig();

  const url = event.path.replace(/^\/api\//, ''); // `/api/user` -> `/user`
  const targetUrl = joinURL(proxyUrl, url);

  return proxyRequest(event, targetUrl);
});
