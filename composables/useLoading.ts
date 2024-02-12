/**
 * Utilities to handle forms loading state
 */
export default function () {
  const loading = ref(false);

  /**
   * Start the loading state
   */
  function startLoad() {
    loading.value = true;
  }

  /**
   * Stop the loading state
   */
  function stopLoad() {
    loading.value = false;
  }

  /**
   * Set opposite of current loading state
   */
  function toggleLoad() {
    loading.value = !loading.value;
  }

  return { loading, toggleLoad, startLoad, stopLoad };
}
