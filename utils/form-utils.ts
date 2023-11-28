import type { FormError } from "@nuxt/ui/dist/runtime/types";
import type { ResponseError } from "~/src/types/api";

/**
 * Returns an array of errors usable by Nuxt UI `<UForm>` component.
 *
 * @link https://ui.nuxt.com/forms/form#usage
 *
 * @returns `[{ path, message }, {...}]`
 */
export function parseApiErrors(error: ResponseError): FormError[] {
  console.log(error);

  const err = unref(error);

  // Check emptyness of errors
  if (!err || !Object.keys(err).length) return [];

  return Object.keys(err?.data?.errors).map((key) => ({
    path: key,
    message: err.data.errors[key][0],
  }));
}
