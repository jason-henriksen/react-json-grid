import autoBind from 'react-autobind';



class GridMath 
{           // Just a class.  Used to calculate valudes needed by the UI.
  constructor() { 
    autoBind(this); 
  }

    // javascript sucks at math
    makeValidInt(inputVal,defaultVal){
      var res = (inputVal||defaultVal);  // use a default instead of null.
      if(inputVal===0){res=inputVal;}    // zero is clearly indistinguishabel from null, so if you meant zero, use zero not the default.
      if(res<0){ res = defaultVal; }     // but negative numbers are just daft.  Us the default after all.
      return Number(res);                // oh, and make sure it's actully a number
    }

    // this used to all be in the render method of GridBody.
    // It was moved here so that it could be unit tested without having to render anything.
    calcGridBody(props,scrollBarWide)
    {
      // object to return
      var result={};
      result.keyNames=[];
      result.showBottomGridLine=true;
      result.rowHeaderList=[];
      result.saveColumnForRowHeader=0;

      // empty object checking
      if(!scrollBarWide){
        result.notReady='missing scrollbar size';
        return result 
      }

      if(!props){
        result.notReady='missing grid props';
        return result 
      }

      // general info
      result.borderWideLocal = this.makeValidInt(props.borderWide,1);
      result.padWideLocal = this.makeValidInt(props.padWide, 3);
  
      result.rowWide = props.width - (scrollBarWide||20);   // how wide is each row.
      result.autoColWide = 0;                                   // width of the default filled column, before weights
      result.fixedRowCount = props.rowCount;               // what is the rowCount limit

      // how high is each row:  user requested height does NOT include padding.  
      result.rowHighNoPadLocal = this.makeValidInt(props.rowHigh, 18);
      if (-1 === result.rowHighNoPadLocal) { result.rowHighNoPadLocal=23;}
      result.rowHighWithPadLocal = this.makeValidInt(result.rowHighNoPadLocal, 18);
      result.rowHighWithPadLocal += result.padWideLocal;
      result.rowHighWithPadLocal += result.padWideLocal;
      
      // column header height
      result.colHeaderHigh = props.colHeaderHigh;
      if (-1 === result.colHeaderHigh) { result.colHeaderHigh = 18; }
      if (props.colHeaderHide) { result.colHeaderHigh = 0; } // hide not wide or high

      // grid height
      var testStyleHeight = null;
      if(props.style){ testStyleHeight = props.style.height}; // needed for null safety on props.style.  Needs to remove trailing px or % !!! 
      result.gridHighLocal = testStyleHeight || props.gridHigh || 300;  // read from style, read from attributes, read from gridHigh attribute, default to 300
      if (result.gridHighLocal === -1) {
        result.gridHighLocal = 300;
      }


      // look at the data to display and figure out what we need to do.
      if(props.data && props.data.length>0){
        // ==== OBJECTS we have rows of objects to display ( check for an array )  
        if(props.pivotOn){  // pivot the data using this key as the col header
          //---- PIVOTED FLOW
          result.keyNames.push('\\');
          for(var pctr=0;pctr<props.data.length;pctr++){
            result.keyNames.push(props.data[pctr][props.pivotOn]);
          }
          result.rowHeaderList = Object.keys(props.data[0]);
          result.fixedRowCount = result.rowHeaderList.length;
          result.saveColumnForRowHeader=1;
        }
        else{
          //---- NORMAL FLOW
          result.keyNames = Object.keys(props.data[0]);
          if (props.rowCount != props.data.length) {
            result.fixedRowCount = props.data.length;
          }          
        }  
        //--- no column width data
        result.autoColWide = Math.floor(
          ( props.width -  // total width
            result.borderWideLocal -  // minus left most border bar
            (scrollBarWide||20)  // minus scroll bar
          ) / (result.keyNames.length)); // div number of items + (optionally plus 1 if a row header is present)
        result.autoColWide -= (result.borderWideLocal);   // each column minus right border amount
        result.autoColWide -= (result.padWideLocal);      // each column minus left pad amount
        result.autoColWide -= (result.padWideLocal);      // each column minus right pad amount
  
        // check wether to show the bottom line
        result.actualDisplayHigh = (props.data.length*result.rowHighWithPadLocal)+result.colHeaderHigh;
        if(result.actualDisplayHigh < result.gridHighLocal){
          result.showBottomGridLine=false;
        }
      }
      else if(props.getRowData){
        // ==== ROW DATA METHOD we have rows of objects to display ( check for an array )  
        result.autoColWide=
          props.width -
          (scrollBarWide||20) -
          (result.borderWideLocal*2);
        result.keyNames = ["No Data Provided"];
      }
      else{
        // ==== NO DATA PROVIDED
        result.autoColWide =
          props.width -
          (scrollBarWide||20) -
          (result.borderWideLocal * 2);
        result.keyNames = ["No Data Provided"];
      }
      
      return result;
    }
  

}

export default GridMath;

