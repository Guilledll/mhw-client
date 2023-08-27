import api from "./api";

export function getServerTime() {
  return api<{ time: string }>("/server-time");
}
