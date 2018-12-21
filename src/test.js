const vm = require("vm");
const code = `var promise = new Promise(function(resolve, reject) {
    try {
        setTimeout(function() {
            resolve('hello world');
        }, 2000);
    }catch(e){
        reject(e);
    }
});
promise.then(function(data) {
    console.log(data);
});
promise.catch(function(e){ console.error(e)})
`;

const vmTest = new Promise((resolve, reject) => {
  try {
    const result = vm.runInNewContext(code, {
      console: console,
      setTimeout: setTimeout
    });
    resolve(result);
  } catch (e) {
    reject(e);
  }
});

vmTest
  .then(data => console.log("Run ok", data))
  .catch(e => console.log("Error", e));
