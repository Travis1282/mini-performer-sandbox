const waitForClarity = (): Promise<typeof window.clarity | undefined> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.clarity) {
      resolve(window.clarity);
      return;
    }

    const checkClarity = setInterval(() => {
      if (typeof window !== 'undefined' && window.clarity) {
        clearInterval(checkClarity);
        resolve(window.clarity);
      }
    }, 200);

    setTimeout(() => {
      clearInterval(checkClarity);
      resolve(window.clarity);
    }, 5000);
  });
};

export const sendEventToClarity = async (event: string) => {
  const clarity = await waitForClarity();
  clarity?.('event', event);
};
