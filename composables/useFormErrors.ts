type obj = { [key: string]: string };
type errorsType = { errors: obj };

export default function <T = object>(form: T) {
  const errors = reactive<T>({});

  // function getErrors(apiErrors: errorsType) {
  //   for (const key of Object.keys(form)) {
  //     if (apiErrors.errors && Array.isArray(apiErrors.errors[key])) {
  //       errors[key] = apiErrors.errors[key][0];
  //     }
  //   }
  // }

  return { errors /*getErrors*/ };
}
