import React from 'react';

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
      objListNumericTest : { data: [{ r: 5, a: 0, b: 6, c: 7, d: 8 }, 
                                    { r: 4, a: 1, b: 7, c: 8, d: 9 }, 
                                    { r: 3, a: 0, b: 8, c: 9, d: 10 }, 
                                    { r: 2, a: 1, b: 9.50, c: 10.50, d: 11.50 }, 
                                    { r: 1, a: 0, b: 10.75, c: 11.75, d: 12.75 }] },
      objListStringTest : { data: [{ r: 'asdf', a: 5, b: 6, c: 8, d: 90 }, { r: 4, a: 'qwer', b: 6, c: 8, d: 90 }, { r: 3, a: 5, b: 6, c: 'zxcv', d: 90 }, { r: 2, a: 5, b: 6, c: 8, d: 90 }, { r: 1, a: 5, b: 6, c: 8, d: 'zaq' }] },
      objListEmptyStringsTest:{ data: [{ r: 'asdf', a: '', b: 0, c: 8, d: 90 }, 
                                       { r: 4, a: 'qwer', b: 6, c: 8, d: 90 }, 
                                       { r: 3, a: '', b: 0, c: 'zxcv', d: 90 }, 
                                       { r: 2, a: 5, b: 6, c: 8, d: 90 }, 
                                       { r: 1, a: 5, b: 6, c: 8, d: 'zaq' }] },
      objListBoolsTest:{ data: [{ r: 5, a: true, b: 6, c: 8, d: 90 }, { r: 4, a: false, b: 6, c: 8, d: 90 }, { r: 3, a: true, b: 6, c: 8, d: 90 }, { r: 2, a: false, b: 6, c: 8, d: 90 }, { r: 1, a: true, b: 6, c: 8, d: 90 }] },
      objListNullsTest:{ data: [{ r: null, a: true,  b: 6, c: null, d: 90 }, 
                                { r: 4,    a: false, b: null, c: 8, d: null }, 
                                { r: 3,    a: true,  b: 6, c: null, d: 90 }, 
                                { r: 2,    a: false, b: null, c: 8, d: null }, 
                                { r: 1,    a: true,  b: 6, c: 8, d: 90 }] },
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
      pivotOnColZeroTest: { pivotOn: 0 },
      pivotOnColOneTest: { pivotOn: 1 },
    },
    pivotToggleBoolColumnsTest:{
      pivotOffTest:{ none:'' },
      pivotOnColPrimTest:{ pivotOn: 'data' },
    }
  },
  //-- test the pivot row header sizing
  pivotsHeaderTest : {
    pivotWithNormalHeaderTest: { none: '' },
    pivotWithWideHeaderTest: { pivotRowHeaderWide: 250 },
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
    borderAndPad15Test: { borderWide: 15, padWide: 15},
    hideHeaderTest:{ hideHeader: true },
    gridCollapseOnTest: { gridCollapse: true, gridHigh:500 },
    gridCollapseOffTest: { gridCollapse: true, gridHigh: 500 },
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

      styleHeaderData:{backgroundColor:'cornsilk',transform: 'rotate(-20deg)',textAlign:'center'},
      styleData:{backgroundColor:'lightgreen',transform: 'rotate(20deg)',textAlign:'center'},                  
      styleDataOddRow:{backgroundColor:'slateblue'},
      styleRowHeaderData:{backgroundColor:'plum'},

      styleInput:{backgroundColor:'aqua'},
      styleSelected:{backgroundColor:'silver'},
    },
    styleNoOddRowsTest:{
      styleHeaderCell:{backgroundColor:'pink'},
      styleCell:{backgroundColor:'lightblue'},
      styleRowHeaderCell:{backgroundColor:'yellow'},

      styleHeaderData:{backgroundColor:'cornsilk',transform: 'rotate(-20deg)',textAlign:'center'},
      styleData:{backgroundColor:'lightgreen',transform: 'rotate(20deg)',textAlign:'center'},                  
      styleRowHeaderData:{backgroundColor:'plum'},

      styleInput:{backgroundColor:'aqua'},
      styleSelected:{backgroundColor:'silver'},
    }
  },
  classGridTest: {
    classAllTest: {
      classHeaderCell: 'testHeaderCell',
      classCell: 'testCell',
      classCellOddRow: 'testCellOddRow',
      classRowHeaderCell: 'testRowHeaderCell',

      classHeaderData: 'testHeaderData',
      classData: 'testData',
      classDataOddRow: 'testDataOddRow',
      classRowHeaderData: 'testRowHeaderData',

      classInput: 'testInput',
      classSelected: 'testSelected',
    },
    classNoOddRowsTest: {
      classHeaderCell: 'testHeaderCell',
      classCell: 'testCell',
      classRowHeaderCell: 'testRowHeaderCell',

      classHeaderData: 'testHeaderData',
      classData: 'testData',
      classRowHeaderData: 'testRowHeaderData',

      classInput: 'testInput',
      classSelected: 'testSelected',
    }
  },
  toolsEnabledTest:{
    toolsAllTest:{
      showToolsAddCut:true,
      showToolsPage: true,
      showToolsImpExp: true,
      showToolsCustom: true,
      pageCount:5,
    },
    toolsSomeTest:{
      showToolsAddCut: true,
      showToolsPage: false,
      showToolsImpExp: true,
      showToolsCustom: false,
      pageCount: 5,
    },
    editAsTextTest:{
      editAsText:true
    },
    editDisabledTest: {
      editDisabled: true
    }
  },
  columnsTest:{
    titleAndEditableColsByInvalidNameTest: {
      columnList: [
        { key: 'OMG this is wrong!', altText: 'col me RRR', editDisabled: true },
        { key: 'Nobody uses this as key!', altText: 'col me AAA', title: 'AA Col', },
        { key: 'Show me an error please!', altText: 'col me CCC', title: 'CC Col', }]
    },
    titleAndEditableColsByNameTest: {
      // key, title, editable, altText.  Columns deliberately out of order, with not all values specified
      columnList:[
        { key: 'r', altText: 'col me RRR', editDisabled:true}, 
        { key: 'a', altText: 'col me AAA', title: 'AA Col', },
        { key: 'c', altText: 'col me CCC', title: 'CC Col', },
        { key: 'b', altText: 'col me BBB', title: 'BB Col', editDisabled: true },
        { key: 'd', altText: 'col me DDD', title: 'DD Col', editDisabled: true}]
    },
    titleAndEditableColsByIndexTest: {
      // key, title, editable, altText.  Columns deliberately out of order, with not all values specified
      columnList: [
        { key: 0, altText: 'col me 000', editDisabled: true },
        { key: 1, altText: 'col me 111', title: 'AA1 Col', },
        { key: 2, altText: 'col me 222', title: 'CC2 Col', },
        { key: 3, altText: 'col me 333', title: 'BB3 Col', editDisabled: true },
        { key: 4, altText: 'col me 444', title: 'DD4 Col', editDisabled: true }]
    },
    primColTest: {
      primColBadTest: {
        // columns are specified, but not with the correct key.  (For primitive lists it is always 'data')
        columnList: [
          { key: 'r', altText: 'col me RRR', editDisabled: true },
          { key: 'a', altText: 'col me AAA', title: 'AA Col', },
          { key: 'c', altText: 'col me CCC', title: 'CC Col', },
          { key: 'b', altText: 'col me BBB', title: 'BB Col', editDisabled: true },
          { key: 'd', altText: 'col me DDD', title: 'DD Col', editDisabled: true }]
      },
      primColGoodTest: {
        // key, title, editable, altText.  Columns deliberately out of order, with not all values specified
        columnList: [
          { key: 'data', altText: 'Prim Data Alt', title:'Prim Data Title' },
        ]
      },
    },
    columnSizeTest: {
      oneLargeColTest: {
            columnList:[{ key: 'r', widePct: '15'},
                        { key: 'a', widePct: '15' },
                        { key: 'c', widePct: '15' },
                        { key: 'b', widePct: '15' },
                        { key: 'd', widePct: '40' }]},
      mostlyPxColTest: {
            columnList:[{ key: 'r', widePx:  '15' },
                        { key: 'a', widePx:  '15' },
                        { key: 'c', widePx:  '15' },
                        { key: 'b', widePx:  '15' },
                        { key: 'd', widePct: '100' }]},
      decreaseColTest: {
            columnList:[{ key: 'r', widePct: '50' },
                        { key: 'a', widePct: '25' },
                        { key: 'c', widePct: '13' },
                        { key: 'b', widePct: '7'  },
                        { key: 'd', widePct: '5'  }]},
    },
    columnEasyTypesTest:{
      simpleFormatsTest:{
            columnList: [ { key: 'r', easyInt: true },
                          { key: 'a', easyFloat: true },
                          { key: 'c', easyDollar: true },
                          { key: 'b', easyEuro: true },
                          { key: 'd', easyPound: true }]},
      interactiveFormatsTest:{
            columnList: [ { key: 'r', easyBool: true },
                          { key: 'a', easyMenu: 'a|b|c|d|e'},
                          { key: 'c', easyDate: true },
                          { key: 'b', easyDateTime: true },
                          { key: 'd', easyPound: true }]},
    },
    columnStyleTest: {
      columnList: [
        { key: 'r', easyBool: true },
        {
          key: 'a', 
          styleHeaderCell: { backgroundColor: 'pink' },
          styleCell: { backgroundColor: 'lightblue' },
          styleHeaderData: { backgroundColor: 'lightbrown', transform: 'rotate(-20deg)', textAlign: 'center' },
          styleData: { backgroundColor: 'lightgreen', transform: 'rotate(20deg)', textAlign: 'center' },              
        },
        { key: 'c', 
          styleHeaderCell: { backgroundColor: 'pink' },
          styleCell: { backgroundColor: 'lightblue' },
          styleHeaderData: { backgroundColor: 'lightbrown', transform: 'rotate(-20deg)', textAlign: 'center' },
          styleData: { backgroundColor: 'lightgreen', transform: 'rotate(20deg)', textAlign: 'center' },              
        },
        { key: 'b', easyDateTime: true },
        { key: 'd', easyPound: true }]
    },
    columnClassTest: {
      columnList: [
        { key: 'r', easyBool: true },
        {
          key: 'a',
          classCell: { backgroundColor: 'lightblue' },
          classData: { backgroundColor: 'lightgreen', transform: 'rotate(20deg)', textAlign: 'center' },
          classHeaderCell: { backgroundColor: 'pink' },
          classHeaderData: { backgroundColor: 'lightbrown', transform: 'rotate(-20deg)', textAlign: 'center' },
        },
        {
          key: 'c',
          classCell: { backgroundColor: 'lightblue' },
          classData: { backgroundColor: 'lightgreen', transform: 'rotate(20deg)', textAlign: 'center' },
          classHeaderCell: { backgroundColor: 'pink' },
          classHeaderData: { backgroundColor: 'lightbrown', transform: 'rotate(-20deg)', textAlign: 'center' },
        },
        { key: 'b', easyDateTime: true },
        { key: 'd', easyPound: true }]
    },
    columnComponentTest: {
      columnList: [
        { key: 'r', easyBool: true },
        {
          key: 'a',
          classCell: <div>My Cell</div>,
          classData: <div>My Data</div>,
          classHeaderCell: <div>Header Cell</div>,
          classHeaderData: <div>Header Data</div>,
        }
      ]
    },
  },
  componentTest:{
    classCell: <div>My Cell</div>,
    classData: <div>My Data</div>,
    classHeaderCell: <div>Header Cell</div>,
    classHeaderData: <div>Header Data</div>,    
  }
  
};

export default testData;

/****
// all pivot tests, including redundant failure moves, mostly error checking
var allPivotTest = [dataTypes * pivots]; // for some value of *


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