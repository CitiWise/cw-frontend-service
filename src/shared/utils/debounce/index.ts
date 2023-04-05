let timeout: any;
const debounce = (fn: any, delay: any) => {
  return (...args: any) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounce;
