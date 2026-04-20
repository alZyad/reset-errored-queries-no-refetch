export function fetchHelloWorld() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("hello-world"), 3000);
  });
}

export function fetchError() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("bye-world")), 3000);
  });
}
