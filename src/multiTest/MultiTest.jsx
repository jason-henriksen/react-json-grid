import React from 'react';
//import { observable, action, computed } from 'mobx';
//import { observer } from 'mobx-react';
import autoBind from 'react-autobind';

import alphaStringify from 'json-stable-stringify';  // stable json for easy test name comparisons later.

import FlagIcon from 'mdi-react/FlagVariantIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import SelectNo from 'mdi-react/CheckboxBlankOutlineIcon';
import SelectYes from 'mdi-react/CheckboxBlankIcon';
import CloseBox from 'mdi-react/CloseBoxIcon';



// Given a set of parameters and rules for multiplying those objects togeter, generate 
// TODO: PropTypes
export default class MultiTest extends React.Component {

  constructor(props) {
    super(props); autoBind(this);        
    this.state = { filter: (window.reactFactorialTest_filter || ''),
                   compList: [],
                   flagList: [],
                   showCompsOnly: false,
                   showFlagsOnly: false
                 };
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

  // show only the given test name.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  setFilter(filterVal){
    window.reactFactorialTest_filter=filterVal;
    window.reactFactorialTest_compsOnly = false;
    window.reactFactorialTest_flagsOnly = false;
    this.setState({ filter: filterVal, compList: this.state.compList, showCompsOnly: false, showFlagsOnly: false });
  }

  // toggle wether a given test name is in the comparison list.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleComp(testName) {
    var compList = this.state.compList;
    if (compList.indexOf(testName)===-1){
      // add it
      compList.push(testName)
      window.reactFactorialTest_compList = compList;
      this.setState({ compList: compList });
    }
    else{
      // cut it
      var i;
      while ((i = compList.indexOf(testName)) != -1) {
        compList.splice(i, 1);
      }    
      window.reactFactorialTest_compList = compList;
      this.setState({ compList: compList });
    }
  }

  // toggle wether a given test name is in the comparison list.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleFlag(testName) {
    var flagList = this.state.flagList;
    if (flagList.indexOf(testName) === -1) {
      // add it
      flagList.push(testName)
      window.reactFactorialTest_flagList = flagList;
      this.setState({ flagList: flagList });
    }
    else {
      // cut it
      var i;
      while ((i = flagList.indexOf(testName)) != -1) {
        flagList.splice(i, 1);
      }
      window.reactFactorialTest_flagList = flagList;
      this.setState({ flagList: flagList });
    }
  }  

  // toggle wether the system is showing all tests or just the comparison tests.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleCompVisible(){
    var compsOnly = !this.state.showCompsOnly;
    window.reactFactorialTest_compsOnly = compsOnly;
    this.setState({ showCompsOnly: compsOnly });
  }

  // toggle wether the system is showing all tests or just the flagged tests.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleFlagVisible() {
    var flagsOnly = !this.state.showFlagsOnly;
    window.reactFactorialTest_flagsOnly = flagsOnly;
    this.setState({ showFlagsOnly: flagsOnly });
  }
  

  // Uses the getAllWork and multiplyObjects methods to generate a list of test parameters.
  // renders this.props.targetTag once for each multiplied test parameter group in the list.
  render(){
    // this is the input list of tests and test multiplications to perform
    var testArray = this.props.test;
    if(!testArray){ return(<div>you must specify an array of tests as the test paramter</div>); }

    //===== MULTIPLICATION PHASE =====
                                                  // testArray is an array or arrays.  
                                                  // in the outer array, each item is a test to calculate,
                                                  //   for the inner array, they are parameter sets to multiply
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

    //===== FILTERING PHASE =====
    var renderList = allWork.map((item, index) => {

      // check if rendering all, or only a specific test.
      // This filtering has a couple of notable things:
      // 1) test are filtered for focus so the user can make repairs to a specific mixture of text parameters
      // 2) test filter state is copied into window variables and used from there instead of from state.
      //    That way, the tests can re-load without losing your test focus or comparisons
      // 3) any number of tests can be set for comparison, again controlled by window variables.

      // this renders each item in allwork to an array, filtering out items that are not supposed to be rendered.
      var holdName = item.tstName; 
      if (
          // if there's no filter or this test matches a filter, include it.
          (!window.reactFactorialTest_filter || holdName === window.reactFactorialTest_filter) &&
          // if there's no comparison, or if there is comparison and this test is in the list.
          (!window.reactFactorialTest_compsOnly ||
             (window.reactFactorialTest_compsOnly && 
              window.reactFactorialTest_compList &&
              -1 !== window.reactFactorialTest_compList.indexOf(holdName))
          ) 
      ){
        item.tstName=undefined;

        // is this test name in the comparison list?
        var isInCompList      = (window.reactFactorialTest_compList && -1 !== window.reactFactorialTest_compList.indexOf(holdName));
        // is this system in comparisons only mode?
        var isInCompShowMode  = window.reactFactorialTest_compsOnly;
        // is this test flagged for review
        var isFlagged = (window.reactFactorialTest_flagList && -1 !== window.reactFactorialTest_flagList.indexOf(holdName));


        var focusButton='';
        var includeToggle = '';
        var compViewToggle = '';
        var flagToggle = '';
        if (holdName !== window.reactFactorialTest_filter){
          // only show the focus button if everything is being rendered
          focusButton =     <div  style={{ padding: '2px', backgroundColor: 'lightgreen', border: '1px solid black',width:20,display:'inline-block' }}
                              onClick={() => this.setFilter(holdName)}
                              title='Show only this test'
          ><MagnifyIcon width={18} height={18}/></div>

          includeToggle = <div style={{ padding: '2px', backgroundColor: 'lightgreen', border: '1px solid black', width: 20, display: 'inline-block' }}
                              onClick={() => this.toggleComp(holdName)}
                              title='Include test for comparisons'
          >{isInCompList ? <SelectYes width={18} height={18} /> : <SelectNo width={18} height={18}/>}</div>

          flagToggle = <div style={{ padding: '2px', backgroundColor: isFlagged ? 'crimson' : 'lightgreen', border: '1px solid black', width: 20, display: 'inline-block' }}
                              onClick={() => this.toggleFlag(holdName)}
                              title='Flag test for review'
                            ><FlagIcon width={18} height={18}/></div>


        }


        // final rendering of the target with each multiplied parameter set
        return(
        <div key={index}>
          <hr />          
          <div>
            <div style={{ width: '80%',display:'inline-block' }}>
              <div style={{ fontSize: '1.5em' }}>{holdName}</div>            
              {alphaStringify(item)}
            </div>
            <div style={{ width: '20%',display:'inline-block',marginLeft:'auto',verticalAlign:'top'}}>
                {focusButton}&nbsp;
                {flagToggle}&nbsp;
                {includeToggle}
            </div>
          </div>

          {React.cloneElement(this.props.target, item)}
        </div>
        );
      }
    });

    var unFocusButton='';
    var unCompareButton = '';    
    var unFlagButton = '';
    if (window.reactFactorialTest_filter || window.reactFactorialTest_compsOnly || window.reactFactorialTest_flagsOnly ) {
      unFocusButton = 
        <div style={{ display: 'inline-block', padding: '2px', backgroundColor: 'lightgreen', border: '1px solid black' }}
          onClick={() => this.setFilter('')}
          title='UnFocus / Show All Tests'
        >
        <CloseBox width={18} height={18} /><MagnifyIcon width={18} height={18} /></div>
    }
    else{
      unCompareButton = 
        <div style={{ display: 'inline-block', padding: '2px', backgroundColor: 'lightgreen', border: '1px solid black' }}
          onClick={() => this.toggleCompVisible()} title='Focus On Comparison Tests'
        ><MagnifyIcon width={18} height={18} /><SelectYes width={18} height={18} /></div>      
      unFlagButton = 
        <div style={{ display: 'inline-block', padding: '2px', backgroundColor: 'lightgreen', border: '1px solid black' }}
          onClick={() => this.toggleFlagVisible()} title='Focus On Flagged Tests'
        ><MagnifyIcon width={18} height={18} /><FlagIcon width={18} height={18} /></div>
    }
    
    return(
      <div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 50, borderBottom: '3px solid grey', padding: '5px'}}>
          <div style={{ padding:'5px',fontSize: '2em' , width: '80%',display:'inline-block'  }}>{allWork.length} Tests Computed </div>
          <div style={{ width: '18%', display: 'inline-block' }}>
            {unFocusButton}&nbsp;
            {unFlagButton}&nbsp;
            {unCompareButton}
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 65, bottom: 0, overflow: 'auto',padding: '5px',  }}>
          {renderList}
        </div>
      </div>
    )
  }
}