
// independent variable list: each variable may be is multipled by another variable to create a new test
// all test object names must end in the suffix 'Test'
// name your variables clearly, the variable name is used to describe the test being run.

const testData=
{
  testATest:{
    a0Test: { a: 0 },
    a1Test: { a: 1 },
    a2Test: { a: 2 },
  },
  testBTest:{
    b0Test: { b: 0 },
    b1Test: { b: 1 },
    b2Test: { b: 2 },
  },
  testCTest: {
    c0Test: { c: 0 },
    c1Test: { c: 1 },
    c2Test: { c: 2 },
  },
  // all supported input data types including bad and problematic data
  dataTypesTest:{
    //-- bad inputs
    badDataTest:{
      dataUndefinedTest: { data: undefined },
      dataNullTest: { data: null },
      dataTrueTest: { data: true },
      dataFalseTest: { data: false },
      dataNumberTest: { data: 42 },
      dataStringTest: { data: 'too much gin' },
      dataArrayEmptyTest: { data: [] },
      dataArrayNullsTest: { data: [null, null] },
      dataArraySymbolsTest: { data: [Symbol('a'), Symbol('b')] },
      dataArrayRegexTest: { data: [new RegExp(), new RegExp()] },
      dataArrayFuncsTest: { data: [() => { console.log('fail') }, () => { console.log('fail') }] },
    },
    //-- object array
    objArrayTest:{
      objListNumericTest : { data: [{ r: 5, a: 0, b: 6, c: 8, d: 90 }, { r: 4, a: 5, b: 0, c: 8, d: 90 }, { r: 3, a: 5, b: 6, c: 8, d: 90 }, { r: 2, a: 5, b: 6, c: 8, d: 90 }, { r: 1, a: 5, b: 6, c: 8, d: 90 }] },
      objListStringTest : { data: [{ r: 'asdf', a: 5, b: 6, c: 8, d: 90 }, { r: 4, a: 'qwer', b: 6, c: 8, d: 90 }, { r: 3, a: 5, b: 6, c: 'zxcv', d: 90 }, { r: 2, a: 5, b: 6, c: 8, d: 90 }, { r: 1, a: 5, b: 6, c: 8, d: 'zaq' }] },
      objListEmptyStringsTest:{ data: [{ r: 'asdf', a: '', b: 0, c: 8, d: 90 }, { r: 4, a: 'qwer', b: 6, c: 8, d: 90 }, { r: 3, a: '', b: 0, c: 'zxcv', d: 90 }, { r: 2, a: 5, b: 6, c: 8, d: 90 }, { r: 1, a: 5, b: 6, c: 8, d: 'zaq' }] },
      objListBoolsTest:{ data: [{ r: 5, a: true, b: 6, c: 8, d: 90 }, { r: 4, a: false, b: 6, c: 8, d: 90 }, { r: 3, a: true, b: 6, c: 8, d: 90 }, { r: 2, a: false, b: 6, c: 8, d: 90 }, { r: 1, a: true, b: 6, c: 8, d: 90 }] },
      objListNullsTest:{ data: [{ r: null, a: true, b: 6, c: null, d: 90 }, { r: 4, a: false, b: 6, c: 8, d: 90 }, { r: 3, a: true, b: 6, c: null, d: 90 }, { r: 2, a: false, b: 6, c: 8, d: 90 }, { r: 1, a: true, b: 6, c: 8, d: 90 }] },
    },
    //-- array array
    arrArrayTest: {
      arrayListNumericTest:{ data: [[0, 5, 6, 8, 90], [4, 0, 6, 8, 90], [3, 5, 0, 8, 90], [2, 5, 6, 8, 90], [1, 5, 6, 8, 90]] },
      arrayListWithStringsTest:{ data: [['asdf', 5, 6, 8, 90], [4, 'qwer', 6, 8, 90], [3, 5, 6, 'zxcv', 90], [2, 5, 6, 8, 90], [1, 5, 6, 8, 'zaq']] },
      arrayListWithEmptiesTest:{ data: [['asdf', '', 0, 8, 90], [4, 'qwer', 6, 8, 90], [3, '', 0, 'zxcv', 90], [2, 5, 6, 8, 90], [1, 5, 6, 8, 'zaq']] },
      arrayListWithBoolsTest:{ data: [[5, true, 6, 8, 90], [4, false, 6, 8, 90], [3, true, 6, 8, 90], [2, false, 6, 8, 90], [1, true, 6, 8, 90]] },
      arrayListWithNullsTest:{ data: [[null, true, 6, null, 90], [4, false, 6, 8, 90], [3, true, 6, null, 90], [2, false, 6, 8, 90], [1, true, 6, 8, 90]] },
      arrayListForPivotTest:{ data: [['a0', 'a1', 'a2', 'a3', 'a4'], ['b0', 'b1', 'b2', 'b3', 'b4'], ['c0', 'c1', 'c2', 'c3', 'c4'], ['d0', 'd1', 'd2', 'd3', 'd4'], ['e0', 'e1', 'e2', 'e3', 'e4'], ['f0', 'f1', 'f2', 'f3', 'f4']] },
    },
    //-- largish data - will need a generator
    //-- primitives
    primsTest:{
      primsListNumericTest:{ data: [0, 5, 6, 8, 90, 1, 5, 6, 8, 90] },
      primsListStringsTest:{ data: ['a0', 'a1', 'a2', 'a3', 'a4', 'a0', 'a1', 'a2', 'a3', 'a4',] },
      primsListMixedTest:{ data: ['a0', null, undefined, 0, 1, 2, true, false, 'last item'] },
    },
    //-- CSV/PSV/KVP
    /*
    text:{
      csvLightWithTitle:{ data: "col A, col B, col C\na1,b1,c1\na2,b2,c3\na3,b3,c3\na4,b4,c4\n" },
      csvLightNoTitle:{ data: "a1,b1,c1\na2,b2,c3\na3,b3,c3\na4,b4,c4\n" },
      csvHeavyWithTitle:{ data: 'col A, col B, col C\n"a1,a1","b1,b1","c1,c1"\na`2,b\'2,"c\"3"\na3,b3,c3\na4,b4,c4\n' },
      psvWithTitle:{ data: "col A|col B|col C\na1|b1|c1\na2|b2|c3\na3|b3|c3\na4|b4|c4\n" },
      psvNoTitle:{ data: "a1|b1|c1\na2|b2|c3\na3|b3|c3\na4|b4|c4\n" },
      kvpNoTitle:{ data: "a:1\nb:2\nc:3\nd:4\ne:5\n" },
    }
    */
  },
  //-- test the ways the data can be pivoted
  pivotsTest:  {
    pivotOnNameTest:{
      pivotOnColRTest: { pivotOn: 'r' },
      pivotOnColBTest:{ pivotOn: 'b' },
    },
    pivotOnIndexTest: {
      pivotOnColZeroTest:{ pivotOn: 0 },
      pivotOnColOneTest:{ pivotOn: 1 },
      pivotOnColErrNeg5Test: { pivotOn: -5 }, // invalid pivot
    },
    pivotOnPrimTest: {
      pivotOnTrueTest: { pivotOn: true },
    },
    //-- these are less thorough tests for convenience
    pivotToggleNamedColumnsTest:{
      pivotOffTest:{ none:'' },
      pivotOnColBTest:{ pivotOn: 'b' },
    },
    pivotToggleIndexColumnsTest:{
      pivotOffTest:{ none:'' },
      pivotOnColBTest:{ pivotOn: 'b' },
    },
    pivotToggleBoolColumnsTest:{
      pivotOffTest:{ none:'' },
      pivotOnColBTest:{ pivotOn: 'b' },
    }
  },
  //-- test the pivot row header sizing
  pivotsHeaderTest : {
    pivotWithNormalHeaderTest: {  },
    pivotWithWideHeaderTest: { pivotRowHeaderWide: 125 },
  },
  //--- test padding and borders
  padPlayTest:{
    border0Test:  { borderWide: 0 },
    pad0Test:     { padWide: 0 },
    border1Test:  { borderWide: 1 },
    pad1Test:     { padWide: 1 },
    border15Test: { borderWide: 15},
    pad15Test:    { padWide: 15},
    borderAndPad0Test:  { borderWide: 0, padWide: 0 },
    borderAndPad1Test:  { borderWide: 1, padWide: 1 },
    borderAndPad15Test: { borderWide: 15, padWide: 15}
  },
  //--- test various selection/input states
  inputSelectionStatesTest:{
    singleSelectionRootTest:{testCursor:{x:0,y:0}},
    singleSelection1x1Test:{testCursor:{x:1,y:1}},
    singleSelection2x2Test:{testCursor:{x:2,y:2}},
    singleSelectionRootTo2x2Test:{testCursor:{x:0,y:0,selectToX:2,selectToY:2,shiftSelInProgress:true}},
    singleSelection1x1to1x3Test:{testCursor:{x:1,y:1,selectToX:1,selectToY:3,shiftSelInProgress:true}},
    singleSelection1x1to3x1Test:{testCursor:{x:1,y:1,selectToX:3,selectToY:1,shiftSelInProgress:true}},
    singleSelection2x2to4x4Test:{testCursor:{x:2,y:2,selectToX:4,selectToY:4,shiftSelInProgress:true}},
    singleInput0x0Test:{testCursor:{x:0,y:0,editX:0,editY:0}},
    singleInput1x1SingleCellSelectionTest:{testCursor:{x:1,y:1,editX:1,editY:1}},
    singleInput1x1LargeSelectionTest:{testCursor:{x:2,y:2,selectToX:4,selectToY:4,editX:3,editY:3,shiftSelInProgress:true}},
  },
    //--- test grid-wide style settings
  styleGridTest:{
    styleAllTest:{
      styleHeaderCell:{backgroundColor:'pink'},
      styleCell:{backgroundColor:'lightblue'},
      styleCellOddRow:{backgroundColor:'linen'},
      styleRowHeaderCell:{backgroundColor:'yellow'},

      styleHeaderData:{backgroundColor:'lightbrown',transform: 'rotate(-20deg)',textAlign:'center'},
      styleData:{backgroundColor:'lightgreen',transform: 'rotate(20deg)',textAlign:'center'},                  
      styleDataOddRow:{backgroundColor:'slateblue'},
      styleRowHeaderData:{backgroundColor:'purple'},

      styleInput:{backgroundColor:'aqua'},
      styleSelected:{backgroundColor:'silver'},
    },
    styleNoOddRowsTest:{
      styleHeaderCell:{backgroundColor:'pink'},
      styleCell:{backgroundColor:'lightblue'},
      styleRowHeaderCell:{backgroundColor:'yellow'},

      styleHeaderData:{backgroundColor:'lightbrown',transform: 'rotate(-20deg)',textAlign:'center'},
      styleData:{backgroundColor:'lightgreen',transform: 'rotate(20deg)',textAlign:'center'},                  
      styleRowHeaderData:{backgroundColor:'purple'},

      styleInput:{backgroundColor:'aqua'},
      styleSelected:{backgroundColor:'silver'},
    }
  }
  
};

export default testData;

/****
// all pivot tests, including redundant failure moves, mostly error checking
var allPivotTest = [dataTypes * pivots]; // for some value of *



var testSizing = [sizing * normalDataPivotTests]    

var styleSet={
  // all data types * [pivotOff,pivotOnColB,pivotOnCol1] *all style
  styleCell:{},
  styleData:{ pivot: true },
  styleHeaderCell:{ pivot: true },
  styleHeaderData:{ pivot: true },
};
var testStyle = [styleSet * normalDataPivotTests]    


var classSet =  
  {
  // all data types * [pivotOff,pivotOnColB,pivotOnCol1] *all class
    name:'class',
    values:{
      classCell:{},
      classData:{ pivot: true },
      classHeaderCell:{ pivot: true },
      classHeaderData:{ pivot: true },
    }
  },
  {
  // all data types * [pivotOff,pivotOnColB,pivotOnCol1] *all components
    name: 'components',
    values: {
      compCell: {},
      compInput: { pivot: true },
      compHeader: { pivot: true },
      compRowHeader: { pivot: true },
    }
  },
  
  {
  // [ objA*[pivotOff,pivotOnColB], arrayA*[pivotOff,pivotOnColB], prims*[pivotOff,pivotOnTrue] ] * all tools
    name:'tools',
    values:{
      toolAddCut:{},
      toolPage:{ pivot: true },
      toolImpExp:{ pivot: true },
      toolAll:{ pivot: true },
      editAsText: { editAsText:true }
    }
  },
  {
    // all data types * all pivot types * [all class,all style]
    name:'columns',
    values:{
      colWidePx:{},
      colWidePct:{ pivot: true },
      colTitles:{ pivot: true },
      colDataTypes:{ pivot: true },
      colTools:{ pivot: true },
      colStyles:{ pivot: true },
      colClasses:{ pivot: true },
      colComps:{ pivot: true },
    }
  },

];

*/