export async function wait(n: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, n);
  });
}
