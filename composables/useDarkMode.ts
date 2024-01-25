export function useDarkMode() {
  const colorMode = useColorMode();

  const isDark = computed({
    get() {
      return colorMode.value === 'dark';
    },
    set() {
      colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
    },
  });

  return { isDark, colorMode }
}
