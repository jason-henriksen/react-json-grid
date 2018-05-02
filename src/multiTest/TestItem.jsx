import React from 'react';
import autoBind from 'react-autobind';

import alphaStringify from 'json-stable-stringify';  // stable json for easy test name comparisons later.

import FlagIcon from 'mdi-react/FlagVariantIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import SelectNo from 'mdi-react/CheckboxBlankOutlineIcon';
import SelectYes from 'mdi-react/CheckboxBlankIcon';
import CloseBox from 'mdi-react/CloseBoxIcon';



// Given a set of parameters and rules for multiplying those objects togeter, generate 
// TODO: PropTypes
export default class TestItem extends React.Component {

  constructor(props) {
    super(props); autoBind(this);        
    this.state = { pleaseReRender:0 };
  }

  // toggle wether a given test name is in the comparison list.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleComp(testName) {
    var compList = window.reactFactorialTest_compList||[];
    if (compList.indexOf(testName)===-1){
      // add it
      compList.push(testName)
      window.reactFactorialTest_compList = compList;
    }
    else{
      // cut it
      var i;
      while ((i = compList.indexOf(testName)) != -1) {
        compList.splice(i, 1);
      }    
      window.reactFactorialTest_compList = compList;
    }
    this.setState({ pleaseReRender: this.state.pleaseReRender++ });
  }

  // toggle wether a given test name is in the comparison list.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleFlag(testName) {
    var flagList = window.reactFactorialTest_flagList||[];
    if (flagList.indexOf(testName) === -1) {
      // add it
      flagList.push(testName)
      window.reactFactorialTest_flagList = flagList;
    }
    else {
      // cut it
      var i;
      while ((i = flagList.indexOf(testName)) != -1) {
        flagList.splice(i, 1);
      }
      window.reactFactorialTest_flagList = flagList;
    }
    this.setState({ pleaseReRender: this.state.pleaseReRender++ });
  }  
  

  render()
  {
    var holdName = this.props.item.tstName; 

    if (
      // if there's no filter or this test matches a filter, include it.
      (!window.reactFactorialTest_filter || holdName === window.reactFactorialTest_filter) &&
      // if there's no comparison, or if there is comparison and this test is in the list.
      (!window.reactFactorialTest_compsOnly ||
         (window.reactFactorialTest_compsOnly && 
          window.reactFactorialTest_compList &&
          -1 !== window.reactFactorialTest_compList.indexOf(holdName))
      ) &&
      // if there's no comparison, or if there is comparison and this test is in the list.
      (!window.reactFactorialTest_flagsOnly ||
        (window.reactFactorialTest_flagsOnly && 
         window.reactFactorialTest_flagList &&
         -1 !== window.reactFactorialTest_flagList.indexOf(holdName))
     )          
    ){

      var focusButton='';
      var includeToggle = '';
      var compViewToggle = '';
      var flagToggle = '';

      // is this test name in the comparison list?
      var isInCompList      = (window.reactFactorialTest_compList && -1 !== window.reactFactorialTest_compList.indexOf(holdName));
      // is this test flagged for review
      var isFlagged = (window.reactFactorialTest_flagList && -1 !== window.reactFactorialTest_flagList.indexOf(holdName));

      
      if (holdName !== window.reactFactorialTest_filter){
        // only show the focus button if everything is being rendered
        focusButton =     <div  style={{ padding: '2px', backgroundColor: 'lightgreen', border: '1px solid black',width:20,display:'inline-block' }}
                            onClick={this.props.focusToggle}
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
      <div key={this.props.index+'item'}>
        <hr />          
        <div>
          <div style={{ width: '80%',display:'inline-block' }}>
            <div style={{ fontSize: '1.5em' }}>{holdName}</div>            
            {alphaStringify(this.props.item)}
          </div>
          <div style={{ width: '20%',display:'inline-block',marginLeft:'auto',verticalAlign:'top'}}>
              {focusButton}&nbsp;
              {flagToggle}&nbsp;
              {includeToggle}
          </div>
        </div>

        {React.cloneElement(this.props.target, this.props.item)}
      </div>
      );
    }
    else{
      // no longer relavant to the current focus list
      return('');
    }
  }
}

