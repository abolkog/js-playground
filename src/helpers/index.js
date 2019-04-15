const runCodeInVM = code =>
  new Promise((resolve, reject) => {
    try {
      const result = eval(code);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });

export default runCodeInVM;
