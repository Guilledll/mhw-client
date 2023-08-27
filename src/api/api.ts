import cookies from "js-cookie";

const api = "http://localhost";

const isNoContent = (res: Response) =>
  res.status === 204 || res.statusText === "No Content";
const isError = (res: Response) =>
  !(res.status >= 200 && res.status < 300) || !res.ok;

function getToken() {
  return cookies.get("XSRF-TOKEN") || "";
}

interface ApiRequestOptions extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
}

interface ErrorResponse {
  message: string;
  errors?: string[];
}

interface ApiResponse<T = any> {
  ok: boolean;
  data: T | { [key: string]: any };
  error?: ErrorResponse;
}

export default async function <T = any>(
  url: string,
  options: ApiRequestOptions = {}
) {
  options.credentials = "include";
  options.headers = {
    "X-XSRF-TOKEN": getToken(),
    Accept: "application/json",
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (!options.method) {
    options.method = "GET";
  }

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  return fetch(api + url, options).then(async (res) => {
    const response: ApiResponse<T> = { ok: res.ok, data: {} };

    if (isError(res)) {
      response.error = (await res.json()) as ErrorResponse;
    } else if (isNoContent(res)) {
      response.data = (await res.json()) as T;
    }

    return response;
  });
}
