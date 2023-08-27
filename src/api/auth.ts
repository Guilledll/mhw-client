import api from "./api";

export function getCsrfCookie() {
  return api("/sanctum/csrf-cookie");
}

export function login(body: { email: string; password: string }) {
  return api("/login", { method: "POST", body });
}
