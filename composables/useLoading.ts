/**
 * Utilities to handle forms loading state
 */
export default function () {
  const loading = ref(false);

  function startLoad() {
    loading.value = true;
  }

  function stopLoad() {
    loading.value = false;
  }

  function invertLoad() {
    loading.value = !loading.value;
  }

  return { loading, invertLoad, startLoad, stopLoad };
}
