import React from 'react';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';

import alphaStringify from 'json-stable-stringify';  // stable json for easy test name comparisons later.


// Given a set of parameters and rules for multiplying those objects togeter, generate 
// TODO: PropTypes
export default @observer class MultiTest extends React.Component {

  constructor(props) {
    super(props); autoBind(this);
  }

  // Flattens a JSON hierarchy to prepare for test discovery and multiplication.
  // Expands each test group into individual test to muldiply.
  // For Example 
  //   testParams:{
  //     alphaTest: { a1Test:{a:1}, a2Test:{a:2}, a3Test:{a:3} },
  //     betaTest:  { b1Test:{b:1}, b2Test:{b:2}, b3Test:{b:3} }, 
  //   }
  // getAllWork(testParams.alphaTest.a1Test) --> [{a:1}]
  // getAllWork(testParams.alphaTest)        --> [{a:1},{a:2},{a:3}]
  // getAllWork(testParams)                  --> [{a:1},{a:2},{a:3},{b:1},{b:2},{b:3}]
  getAllWork(workObj,nameSoFar){
    if(!workObj) return [];
    debugger;
    var results=[];
    var keys = Object.keys(workObj);
    for(var kctr=0;kctr<keys.length;kctr++){
      var curKey = keys[kctr];
      if (curKey.endsWith('Test')){
        results = results.concat( this.getAllWork( workObj[curKey],curKey ));
      }
      else if(curKey!=='tstName'){
        results.push( workObj );
        return results;
      }
    }
    return results;
  }

  // Multiplies two arrays of objects
  // Expands each test group into individual test to muldiply.
  // For Example 
  //   testParams:{
  //     alphaTest: { a1Test:{a:1}, a2Test:{a:2}, a3Test:{a:3} },
  //     betaTest:  { b1Test:{b:1}, b2Test:{b:2}, b3Test:{b:3} }, 
  //   }
  // var aList = getAllWork(testParams.alphaTest)        --> [{a:1},{a:2},{a:3}]
  // var bList = getAllWork(testParams.alphaTest)        --> [{a:1},{a:2},{a:3}]
  // multiplyObjects(aList,bList) --> [ {a:1,b:1} , {a:1,b:2} , {a:1,b:3} ,
  //                                    {a:2,b:1} , {a:2,b:2} , {a:2,b:3} ,
  //                                    {a:3,b:1} , {a:3,b:2} , {a:3,b:3} ]
  multiplyObjects(left,right){
    var results = [];
    for (var lctr = 0; lctr < left.length; lctr++) {
      for (var rctr = 0; rctr < right.length; rctr++) {
        var newName = (left[lctr].tstName||'');
        if (right[rctr].tstName){
          newName = (left[lctr].tstName || '')+ ' | ' + right[rctr].tstName;
        }
        results.push( Object.assign({},left[lctr],right[rctr],{tstName:newName} ));
      }
    }
    return results;
  }  

  // Uses the getAllWork and multiplyObjects methods to generate a list of test parameters.
  // renders this.props.targetTag once for each multiplied test parameter group in the list.
  render(){
    var testArray = this.props.test;
    if(!testArray){ return(<div>you must specify an array of tests as the test paramter</div>); }
                                                  // testArray is an array or arrays.  For example:
/**
     test={
      [ // outer array of tests
        [testData.testATest],                                       // 1 item array, run all test defined by this object
        [testData.testATest,testData.testBTest],                    // run all testA tests merged with all testB tests.
        [testData.testATest,testData.testBTest,testData.testCTest], // run the product of all tests in A*B*C
        [testData.testATest.a0Test],                                // run a single specific test.
      ]}
 **/                                                  
    var allWork = [];                             // the final list of all test parameters to be rendered.  
    for(var tctr=0;tctr<testArray.length;tctr++){ // test counter
      var curTest = testArray[tctr];              // take this item in the test array and expand it out.

                                                  // curTest is an array of parameter group objects.  
      if (curTest && curTest.length) {            // Each object has a field that is one test (recursively).                                                    
        var lastSet = [{}];                       // array with one empty object.  Important!  Multiply by 1, not 0  
        for (var pctr = 0; pctr < curTest.length; pctr++) { // part counter
          var part = curTest[pctr];               // part should be an object. Each member ending in Test is a parameter group                    
          var curSet = this.getAllWork(part,'');  // returns an array of multiplicable objects.
                                                  // multiply all the work from the lastSet by all the work in the curSet
          var thisSet = this.multiplyObjects(curSet, lastSet);
          lastSet = thisSet.slice(0);             // clone array so that we don't alter the sets
        }
        allWork = allWork.concat(lastSet);        // add this multiplied group of tests to the list of all tests to run.
      }
    }

    // final rendering of the target with each multiplied parameter set
    var renderList = allWork.map((item, index) => {
      var holdName = item.tstName; 
      item.tstName=undefined;
      return(
      <div key={index}>
        <hr />
        <div style={{fontSize:'1.5em'}}>{holdName}</div>
        {alphaStringify(item)}<br/>
        {React.cloneElement(this.props.target, item)}
      </div>
      );
    });
    
    return(
      <div>
        <div style={{ fontSize: '2em' }}>{allWork.length} Tests Computed: </div>
        {renderList}
      </div>
    )
  }
}