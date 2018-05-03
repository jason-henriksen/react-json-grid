// using the naive implementation for performance.
// it is not expected that complex, extended objects will be used for this
export default function isEmpty(val) {
  if(!val) return true; // falsey stuff is empty
  for (var key in val) return false; return true; // objects without members are empty
}