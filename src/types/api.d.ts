import type { FetchError } from "ofetch";

/**
 * Common 422 response format from Laravel
 */
interface LaravelErrors<T = any> {
  errors: { [key in keyof T as string]: string[] };
  message: string;
}

/**
 * Error response comming from the backend
 */
export type ApiError<T = any> = FetchError<LaravelErrors<typeof T>>;

/**
 * Error returned from `useFetch` and `useAsyncData` composables
 */
export type ResponseError = Ref<ApiError | null> | Object;
