
/**
 * 
 * Effectively, this method gives your test object the names it needs before the objects are passed in to be used.
 * This allows each test to know it's name, so that when its rendered you can see what 
 * parameter groups were mixed together to make each test.
 * 
 * Basically, this is like Reflection in that each object will be allowed to know it's own name.
 * 
 * Note the only objects with Test at the end of the name, are given their name.
 
var testData=
{
  testATest:{
    a0Test: { a: 0 },
    a1Test: { a: 1 },
    a2Test: { a: 2 },
  },
  testBTest:{
    b0Test: { b: 0 },
    b1Test: { b: 1 },
    b2Test: { 
      normalB2Test:{ b:2 },
      b2C1Test:{ b:2, c:1 },
      b2C2Test:{ b:2, c:2 },
    },
  }
}

testNameTool(testData);
  -->
{
  testATest:{
    a0Test: { a: 0, tstName:'a0Test' },
    a1Test: { a: 1, tstName:'a1Test' },
    a2Test: { a: 2, tstName:'a2Test' },
    tstName:'testATest'
  },
  testBTest:{
    b0Test: { b: 0, tstName:'b0Test' },
    b1Test: { b: 1, tstName:'b1Test' },
    b2Test: {
      normalB2Test:{ b:2, tstName:'normalB2Test' },
      b2C1Test:{ b:2, c:1, tstName:'b2C1Test' },
      b2C2Test:{ b:2, c:2, tstName:'b2C2Test' },
    tstName:'b2Test'
    },
    tstName:'testBTest'
  }
}
**/
export default function testNameTool(workObj){
  if (!workObj) return;
  var keys = Object.keys(workObj);
  for (var kctr = 0; kctr < keys.length; kctr++) {
    var curKey = keys[kctr];
    if (curKey.endsWith('Test')) {
      workObj[curKey].tstName = curKey; // add the variable name to the test object
      testNameTool(workObj[curKey])     // recurse deeper in, to find child object names to set.      
    }
  }  
  return workObj;
}
