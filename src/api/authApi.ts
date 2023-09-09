import api from "./api";

export function getCsrfCookie() {
  return api<void>("/sanctum/csrf-cookie");
}

export function login(body: { email: string; password: string }) {
  return api<void>("/login", { method: "POST", body });
}

export function logout() {
  return api<void>("/logout", { method: "POST" });
}
