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
      if( (''+res).includes('px') ){ console.log('Please pass numbers to Grid.  You do not need to add "px" to anything. This number will be ignored.  Using '+defaultVal+' instead.'); return defaultVal;}
      return Number(res);                // oh, and make sure it's actully a number
    }

    // this used to all be in the render method of GridBody.
    // It was moved here so that it could be unit tested without having to render anything.
    calcGridBody(props,scrollBarWide)
    {
      if(props.debugGridMath){
        console.log('do the math');
      }
        
      // object to return
      var result={};
      result.keyNames=[];                 // always the keys present either from data inspection, or column definition
      result.showBottomGridLine=false;
      result.rowHeaderList=[];
      result.colHeaderKeyList=[];         // when pivoted, this will NOT match the keyNames list.
      result.saveColumnForRowHeader=0;
      result.debugGridMath = props.debugGridMath;

      // math needs access to columns by key name.
      if (props.columnList && props.columnList.length>0) {
        result.colDefListByKey = {};
        // make a map of keys to objects for easy access later.
        for (var clctr = 0; clctr < props.columnList.length; clctr++) {
          result.colDefListByKey[props.columnList[clctr].key] = props.columnList[clctr];
        }
      }
      else {
        result.colDefListByKey = {};
      }    

      // empty object checking & data cleanup
      if(!scrollBarWide){   result.notReady='missing scrollbar size'; return result       }
      if(!props){           result.notReady='missing grid props';     return result       }
      if(!props.data && !props.columnList){ result.notReady = "No Data Provided";     return result }      

      // try to handle bad input data
      var data = props.data;
      if(!props.data && props.columnList){ data=[]; }      

      if( (typeof data === 'string' || data instanceof String) ||  // array of strings
          (typeof data === 'number' && isFinite(data) ) ||         // array of numbers
          (typeof data === 'boolean') ){                                 // array of booleans
        result.notReady='Grid data must be an array';  return result;
      }

      // don't us foo.isArray because MobX and other arrays don't look like arrays, but are.
      if(!data.length && 0!==data.length){ result.notReady = "Input Data is not an array"; return result } 
      if(data.length===0 && !props.columnList){  result.notReady = "No sample data supplied and no column definition list supplied.  To start with an empty array, please define the columns."; return result; }
      if(data.length>0 && !props.columnList &&
         (data[0]===null || typeof data[0] === 'undefined')){ 
        result.notReady = "Falsey sample data supplied with no column definition list supplied."; return result; 
      }

      // add validation that "px" should not be used, and only numbers should be passed as parameters.

      if( data[0] && typeof data[0] === 'object' && data[0].constructor === RegExp){ result.notReady = "Grids of RegExp objects are not supported."; return result; }
      if(typeof data[0] === 'symbol'){ result.notReady = "Grids of Symbol objects are not supported."; return result; }
      if(typeof data[0] === 'function'){ result.notReady = "Grids of Function objects are not supported."; return result; }

      // if it's an array of primitivs, make sure to treat it as if it were an array of objects
      if( (typeof data[0] === 'string' || data[0] instanceof String) ||  // array of strings
          (typeof data[0] === 'number' && isFinite(data[0]) ) ||                         // array of numbers
          (typeof data[0] === 'boolean') ){                                            // array of booleans
        result.isPrimitiveData=true;
      }

      // make the data conversion and hold onto the converted data.
      // just give data available calls?  onChange pass an object that can get the translation?
      // give an object that can be used to ask for translation at any time.
      // data.asJSON()
      // data.asCSV()
      // data.asPSV()

      // general info
      result.borderWide = this.makeValidInt(props.borderWide,1);
      result.padWide = this.makeValidInt(props.padWide, 3);
  
      result.gridWide = this.makeValidInt(props.gridWide,800);
      result.autoColWide = 0;                                   // width of the default filled column, before weights
      result.fixedRowCount = props.rowCount;               // what is the rowCount limit

      result.editDisabled = props.editDisabled || false;

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
      result.gridHigh = testStyleHeight || this.makeValidInt(props.gridHigh) || Math.min(result.rowHighWithPad*(data.length+2) ,400);  // read from style, read from attributes, read from gridHigh attribute, default to 300
      if (result.gridHigh === -1) {
        result.gridHigh = 400;
      }

      // header height
      if (props.colHeaderHide || result.forceColHeaderHide) {     // provide a header row.
        result.headerUsage=1;
      }
      else{
        result.headerUsage=(result.colHeaderHigh+(2*result.padWide)+(2*result.borderWide));
      }

      // tools height
      result.toolUsage = 0;
      if(props.showToolsAddCut || props.showToolsImpExp || props.showToolsPage || props.showToolsCustom){
        result.toolUsage = 35;
      }

      // collapsed grid height
      result.collapseAmount=0;

      result.formatDate = props.formatDate||'YYYY-MM-DD';
      result.formatTime = props.formatTime||'HH:mm';

      var autoColCount=0;
      // look at the data to display and figure out what we need to do.
      if( (data && data.length>0) || (props.columnList && props.columnList.length>0) ){ // col def from colList or from data
        if(result.isPrimitiveData){
          // ==== PRIMITIVES we have only one line of data to display
          result.keyNames.push('data');
          if(props.pivotOn){
            result.rowHeaderList=['data'];              // one row header
            result.fixedRowCount = 1;                   // one row
            result.saveColumnForRowHeader=1;            // will have a row header.
            result.forceColHeaderHide=true;             // no column headers allowed on pivoted primitives.
            result.headerUsage=1;
            result.colHeaderKeyList=[];                 // I mean it: no column headers allowed!
            result.colHeaderKeyList.push('\\');                               // extra column on header for row headers.
            for(var pctr=0;pctr<data.length;pctr++){                    // pivot uses pivotOn key for column header keys
              result.colHeaderKeyList.push(pctr);       // key (or maybe value) for the column header.  Only used for autoColWide calculation
            }
            result.dataWide = data.length;        // length => width
            result.dataHigh = 1;                        // 1 row hight
          }
          else{
            result.colHeaderKeyList=result.keyNames;    // just one header
            result.fixedRowCount = data.length;   // amount of data is the rows
            result.dataWide = 1;                        // 1 item wide.
            result.dataHigh = data.length;        // length items tall.
          }
        }
        else{
          // ==== OBJECTS we have rows of objects to display
          if(props.pivotOn){  // pivot the data using this key as the col header
            //---- PIVOTED FLOW
            /*
            if(props.columnList){                             // pull key data from col def list first, but from data if cols are not defined
              result.colHeaderKeyList.push('\\');                               // extra column on header for row headers.
              for (var pctr = 0; pctr < props.columnList.length;pctr++){                    // pivot uses pivotOn key for column header keys
                result.colHeaderKeyList.push(props.columnList[pctr].key);  // key (or maybe value) for the column header
              }
            }
            else{              
              */
              result.colHeaderKeyList.push('\\');                               // extra column on header for row headers.
              var temp = Object.keys(data[0]);
              for(var pctr=0;pctr<data.length;pctr++){                    // pivot uses pivotOn key for column header keys
                result.colHeaderKeyList.push(temp[pctr]);
              }
            //}

            result.rowHeaderList = Object.keys(data[0]);   // pull headers from data.  Should there be a colDef check here?
            result.keyNames = result.rowHeaderList;              // object props are row headers
            result.saveColumnForRowHeader=1;                     // save a space for the row header.
            result.fixedRowCount = result.rowHeaderList.length;  // one row per property
            result.dataWide = data.length;                 // one col per data item
            result.dataHigh = result.rowHeaderList.length;       // one row per property.
          }
          else{
            //---- NORMAL FLOW
            if(props.columnList){                             // pull key data from col def list first, but from data if cols are not defined
              for(var cctr=0;cctr<props.columnList.length;cctr++){
                result.colHeaderKeyList.push(props.columnList[cctr]['key']);  // column for each definition
              }
              if(data && data[0]){
                result.keyNames = Object.keys(data[0]);   // hang on to the key names from the object if they're around
              }
              else{
                result.keyNames = result.colHeaderKeyList; // otherwise use the column defs if we don't have any data to use as a template.
              }
              result.dataWide = result.colHeaderKeyList.length;      // column definition count => data width. (data high handled later)
            }
            else{                                             // no column defs, inspect the first object.
              if(data[0].length){ // probably an array-look-alike.  Use indexes
                for (var ictr = 0; ictr < data[0].length;ictr++){
                  result.keyNames.push(ictr);
                }
                result.colHeaderKeyList = result.keyNames;      // keys => columns here
                result.dataWide = data[0].length;       // keynames is width  (data high handled later)
              }
              else{                     // likely an object.  Treat it normally.
                result.keyNames = Object.keys(data[0]);   // pull the key names
                result.colHeaderKeyList = result.keyNames;      // keys => columns here
                result.dataWide = result.keyNames.length;       // keynames is width  (data high handled later)
              }
            }          

            result.fixedRowCount = data.length; // allow over-ride item count.
            result.dataHigh = result.fixedRowCount;            
          }  
        }

        // fix degenerate sizing
        if(result.gridWide < scrollBarWide + 10*result.keyNames.length){
          result.gridWide = scrollBarWide + 10*result.keyNames.length;
        }
        result.rowWide = result.gridWide - (scrollBarWide||16);   // how wide is each row.
        autoColCount = result.colHeaderKeyList.length;
        if(props.pivotOn && props.pivotRowHeaderWide && props.pivotRowHeaderWide!==-1){
          // don't autoColCount the rowHeader
          autoColCount--;
        }

        //==== now calculate column actual sizes and autocol size

        var availableWide = result.rowWide;         // amount of space to allocate evenly
        var fixedWide = 0;                          // becomes the new rowWide is all columns are specified
        var change = 0;
        if (props.columnList && result.colHeaderKeyList.length && !props.pivotOn){ // only autosize allowed on pivoted data
          autoColCount = 0; // number of columns that need auto width, i.e. column defs without a pct or px
          for (var cctr = 0; cctr < result.colHeaderKeyList.length;cctr++){
            change=0;
            
            if (result.colDefListByKey[result.colHeaderKeyList[cctr]]) { // is there a colDef that uses this key?
              if (result.colDefListByKey[result.colHeaderKeyList[cctr]].widePx) {
                change = Number(result.colDefListByKey[result.colHeaderKeyList[cctr]].widePx);
                result.colDefListByKey[result.colHeaderKeyList[cctr]].forceColWide = change; // do this before considering the pad and border.
                change += Number(result.borderWide) + Number(result.padWide) + Number(result.padWide);
                fixedWide+=change;
                availableWide -= change;
              }
              else if (result.colDefListByKey[result.colHeaderKeyList[cctr]].widePct) {
                change = (Number(result.rowWide) * (Number(result.colDefListByKey[result.colHeaderKeyList[cctr]].widePct) / 100));
                result.colDefListByKey[result.colHeaderKeyList[cctr]].forceColWide = change;  // do this before considering the pad and border.
                change += Number(result.borderWide) + Number(result.padWide) + Number(result.padWide);
                fixedWide += change;
                availableWide -= change;
              }
              else{
                autoColCount++;
              }
            }
          }
        }
        if(props.pivotOn && props.pivotRowHeaderWide && props.pivotRowHeaderWide!==-1){
          result.pivotRowHeaderWide = Number(props.pivotRowHeaderWide);
          result.pivotRowHeaderWideTotal = result.pivotRowHeaderWide;
          result.pivotRowHeaderWideTotal += (result.borderWide);   // each column minus right border amount
          result.pivotRowHeaderWideTotal += (result.padWide);      // each column minus left pad amount
          result.pivotRowHeaderWideTotal += (result.padWide);      // each column minus right pad amount
          availableWide -= result.pivotRowHeaderWideTotal; // allow a set width pivot header, but still only autocol for pivoted data
          }
        else{
          result.pivotRowHeaderWide = 0;
          result.pivotRowHeaderWideTotal=0;
        }
        //if(autoColCount===0 && fixedWide<result.rowWide){ result.rowWide=fixedWide; } // all columns have a fixed width & smaller than available space.  This basically moves the scroll bar;

        //--- no column width data
        if(autoColCount>0){
          result.autoColWide = 
            ( availableWide -          // total width
              result.borderWide        // minus left most border bar
                                       // scrollbar already handled by basin on rowWide.
            ) / (autoColCount)
        }
        else{ result.autoColWide=0; }
        result.autoColWideWithBorderAndPad = result.autoColWide;
        result.autoColWide -= (result.borderWide);   // each column minus right border amount
        result.autoColWide -= (result.padWide);      // each column minus left pad amount
        result.autoColWide -= (result.padWide);      // each column minus right pad amount

        // calculate the used row width
        result.rowWide= fixedWide + (result.autoColWideWithBorderAndPad * autoColCount) - result.borderWide;

        // How high should the grid be?
        result.dataFullHigh = result.dataHigh * (result.rowHighWithPad + result.borderWide);
        result.dataAvailableHigh = result.gridHigh-result.headerUsage-result.toolUsage; // this is the virtList height.
        
        if(result.dataFullHigh > result.dataAvailableHigh){
          result.showBottomGridLine=true;  // less data than space: no bottom line is needed.
        }             
        else{
          result.showBottomGridLine=false;
          result.dataAvailableHigh -= (result.borderWide)
        }
        //result.bottomGridLineWide = (result.keyNames.length * (result.autoColWide + result.borderWide + result.padWide + result.padWide))-result.borderWide;
        result.bottomGridLineWide = result.rowWide;

        result.bottomLineUsage=0;
        if (result.showBottomGridLine) {
          result.bottomLineUsage = result.borderWide;
          result.dataAvailableHigh -= result.bottomLineUsage;
        }

        // fix a degenerate case
        if(result.dataAvailableHigh<0){
          result.dataAvailableHigh=100;
          result.gridHigh=150;
          result.showBottomGridLine=false;
        }
        

        // check wether to shrink the grid if there is not enough data to fill it.
        result.collapseAvailable = result.gridHigh - result.headerUsage 
                                      - result.dataFullHigh 
                                      - result.bottomLineUsage 
                                      - (result.borderWide*2)
                                      - result.toolUsage ;       // amount to fill

        if(result.collapseAvailable < 0) { result.collapseAvailable = 0 }  // amount to shrink by
        result.dataAvailableHigh -= result.collapseAvailable; // don't let the grid consume needless space.
        if (props.gridHighCollapse){
          result.gridHigh -= result.collapseAvailable; // shrink whole component if requested
        }

      }
      else if(props.getRowData){
        // ==== ROW DATA METHOD we have rows of objects to display ( check for an array )  
        result.autoColWide=
           result.gridWide -
          (scrollBarWide||20) -
          (result.borderWide*2);
        result.colHeaderKeyList = ["No Data Provided"];
      }
      else{
        // ==== NO DATA PROVIDED
        result.autoColWide =
           result.gridWide -
          (scrollBarWide||20) -
          (result.borderWide * 2);
        result.colHeaderKeyList = ["No Data Provided"];
      }

      
      return result;
    }
  

}

export default GridMath;

