// A. Network Error (Malformed domain) -> Rejects immediately
async function testNetworkError() {
  try {
    await fetch('https://domain-that-does-not-exist-12345.com');
  } catch (err) {
    console.log('1. Caught Network Error (Domain unreachable):', err.message);
  }
}

// B. HTTP 404 Error (Valid domain, missing resource) -> Resolves, but res.ok is false
async function test404Error() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/name/nonexistentcountryxyz');
    
    // WITHOUT this check, fetch moves to json() and causes confusing errors!
    if (!res.ok) {
      throw new Error(`2. Caught HTTP Error: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
  } catch (err) {
    console.log(err.message);
  }
}

testNetworkError();
test404Error();
