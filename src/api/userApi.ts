import type { User } from "@/src/types/user";
import api from "./api";

export function getUser() {
  return api<User>("/user");
}
