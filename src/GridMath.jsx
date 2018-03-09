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
      result.borderWide = this.makeValidInt(props.borderWide,1);
      result.padWide = this.makeValidInt(props.padWide, 3);
  
      result.gridWide = this.makeValidInt(props.gridWide,800);
      result.rowWide = result.gridWide - (scrollBarWide||16);   // how wide is each row.
      result.autoColWide = 0;                                   // width of the default filled column, before weights
      result.fixedRowCount = props.rowCount;               // what is the rowCount limit

      // how high is each row:  user requested height does NOT include padding.  
      result.rowHighNoPad = this.makeValidInt(props.rowHigh, 18);
      if (-1 === result.rowHighNoPad) { result.rowHighNoPad=23;}
      result.rowHighWithPad = this.makeValidInt(result.rowHighNoPad, 18);
      result.rowHighWithPad += result.padWide;
      result.rowHighWithPad += result.padWide;
      
      // column header height
      result.colHeaderHigh = (props.colHeaderHigh||-1);
      if (-1 === result.colHeaderHigh) { result.colHeaderHigh = 18; }
      if (props.colHeaderHide) { result.colHeaderHigh = 0; } // hide not wide or high

      // grid height
      var testStyleHeight = null;
      if(props.style){ testStyleHeight = props.style.height}; // needed for null safety on props.style.  Needs to remove trailing px or % !!! 
      result.gridHigh = testStyleHeight || props.gridHigh || 300;  // read from style, read from attributes, read from gridHigh attribute, default to 300
      if (result.gridHigh === -1) {
        result.gridHigh = 300;
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


        var availableWide = result.rowWide;         // amount of space to allocate evenly
        var autoColCount = result.keyNames.length;
        var fixedWide = 0;                          // becomes the new rowWide is all columns are specified
        var change = 0;
        if (props.columnList && props.columnList.length && props.pivotOn===false){ // only autosize allowed on pivoted data
          autoColCount = props.columnList.length;  // number of columns that need auto width
          for (var cctr = 0; cctr<props.columnList.length;cctr++){
            change=0;
            if (props.columnList[cctr]) { // is there a colDef that uses this key?
              if (props.columnList[cctr].widePx) {                
                change = Number(props.columnList[cctr].widePx);
                change += Number(result.borderWide) + Number(result.padWide) + Number(result.padWide);
                fixedWide+=change;
                availableWide -= change;
                autoColCount--;
              }
              else if (props.columnList[cctr].widePct) {
                change = (Number(result.rowWide) * (Number(props.columnList[cctr].widePct) / 100));
                change += Number(result.borderWide) + Number(result.padWide) + Number(result.padWide);
                fixedWide += change;
                availableWide -= change;
                autoColCount--;
              }
            }
          }
        }
        //if(autoColCount===0 && fixedWide<result.rowWide){ result.rowWide=fixedWide; } // all columns have a fixed width & smaller than available space.  This basically moves the scroll bar;

        //--- no column width data
        result.autoColWide = Math.floor(
          ( availableWide -          // total width
            result.borderWide   // minus left most border bar
                                     // scrollbar already handled by basin on rowWide.
          ) / (autoColCount));       // div number of items that need autocount + (optionally plus 1 if a row header is present)
        result.autoColWide -= (result.borderWide);   // each column minus right border amount
        result.autoColWide -= (result.padWide);      // each column minus left pad amount
        result.autoColWide -= (result.padWide);      // each column minus right pad amount
        console.log(availableWide,result.autoColWide,result.autoColCount);
  

        // check wether to show the bottom line
        result.actualDisplayHigh = (props.data.length*result.rowHighWithPad)+result.colHeaderHigh;
        if(result.actualDisplayHigh < result.gridHigh){
          result.showBottomGridLine=false;
        }             
      }
      else if(props.getRowData){
        // ==== ROW DATA METHOD we have rows of objects to display ( check for an array )  
        result.autoColWide=
           result.gridWide -
          (scrollBarWide||20) -
          (result.borderWide*2);
        result.keyNames = ["No Data Provided"];
      }
      else{
        // ==== NO DATA PROVIDED
        result.autoColWide =
           result.gridWide -
          (scrollBarWide||20) -
          (result.borderWide * 2);
        result.keyNames = ["No Data Provided"];
      }
      
      return result;
    }
  

}

export default GridMath;

