type Head = RequestInit["headers"];

export function headers(heads: Head = {}): Head {
  const config = useRuntimeConfig();

  return {
    "X-XSRF-TOKEN": useCookie("XSRF-TOKEN").value,
    Accept: "application/json",
    "Content-Type": "application/json",
    Referer: config.public.appUrl,
    ...heads,
  };
}
