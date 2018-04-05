import { observable, computed, action } from 'mobx';
import GridMath from './GridMath';

class GridStore {           // Just a class.  Nothing fancy here.
  constructor() { 
    this.uiMathInst = new GridMath();
  }

  @observable cursor = {x:0,y:0,                         // cursor x and y values
                        maxX:-1,maxY:-1,                 // max legal x and y values.
                        selectToX:-1,selectToY:-1,       // selection box for shift selection
                        editX:-1,editY:-1,editObjKey:-1, // cell being edited
                        showAltX:-1,showAltY:-1,         // for displaying alt text help
                        shiftSelInProgress:false         // for shift arrow selecting cells
                       };
  @observable selectedCells = [];                 // for control clicking cells.
  @observable curEditingValue='';                 // value being edited before it is applied.

  @observable autoFocus=false;                    // if true, rendering a selected cell will cause that cell to take focus
  @observable inst = '';                          // if true, rendering a selected cell will cause that cell to take focus
  @observable pivotOn = '';                       // from props.  Here for easy cell access.

  @observable colDefListByKey = {};               // column definition meta data accessible by keyName
  @observable colDefListByIdx = [];               // column definition meta data accessible by ordered index
  @observable keyList=[]                          // list of the keys in the given data object.

  @observable showDatePicker = false;             // due to scrolling issues, the react-datepicker popup cannot be used.  This add a non-scrolled over-lay picker.
  @observable showDateTimePicker = false;         // due to scrolling issues, the react-datepicker popup cannot be used.  This add a non-scrolled over-lay picker.
  @observable showMenuPicker = false;             // due to scrolling issues, the react-datepicker popup cannot be used.  This add a non-scrolled over-lay picker.
  @observable showOverlayComp = false;         // due to scrolling issues, the react-datepicker popup cannot be used.  This add a non-scrolled over-lay picker.



  // javascript sucks at math
  makeValidInt(inputVal, defaultVal) {
    var res = (inputVal || defaultVal);
    if (inputVal === 0) { res = inputVal; }
    if (res < 0) { res = defaultVal; }
    return Number(res);
  }

  @action logNoChangeHandlerMessage()         {console.log('no onChange handler supplied.');}
  @action logNoOnRowAddHandlerMessage()       { console.log('no onRowAdd handler supplied.'); }
  @action logNoOnRowCutHandlerMessage()       { console.log('no onRowCut handler supplied.'); }
  @action logNoOnGotoPageHandlerMessage()     { console.log('no onGotoPage handler supplied.'); }
  @action logNoOnImportHandlerMessage()       { console.log('no onImport handler supplied.'); }
  @action logNoOnExportHandlerMessage()       { console.log('no onExport handler supplied.'); }
  @action logNoOnReplaceDataHandlerMessage()  { console.log('no onReplaceData handler supplied. (Required for text mode editing)'); }

  // don't call the user supplied on change directly.  
  // call this to ensure that the pivot variables get swizzled correctly.
  onChangePivotWrapper(x,y,objKey,val){
    if(val===null) return; // cannot set null via the UI.  prevents unintended changes.
    if (this.pivotOn) {
      this.onChange(y, x, objKey, val);
    }
    else {
      this.onChange(x, y, objKey, val);
    }
    
  }

  /* 	
  something funky here:
  this method takes the props and updates the grid store.
  However, the gridStore is ALSO part of the props.  So once this method id done, it will be called again with the newly updated props.
  The method must give the same results again in order not to get into a loop of re-changing props each round. 
  I'd love a cleaner solution to this, but not sure what that would be yet.
  */
  @action prepSelectionField(props)
  {
    // make the calculations
    this.uiMath = this.uiMathInst.calcGridBody(props, (this.scrollBarWide||20));    

    // ease of access
    this.colDefListByKey = this.uiMath.colDefListByKey;
    this.colDefListByIdx = props.columnList;

    //--- style data holders
    this.styleCell = props.styleCell||{};
    this.styleCellOddRow = props.styleCellOddRow||{};
    this.styleHeaderCell = props.styleHeaderCell||{};
    this.styleRowHeaderCell = props.styleRowHeaderCell||{};

    this.styleData = props.styleData||{};
    this.styleDataOddRow = props.styleDataOddRow||{};
    this.styleHeaderData = props.styleHeaderData||{};
    this.styleRowHeaderData = props.styleRowHeaderData||{};

    this.styleInput = props.styleInput||{};
    this.styleSelected = props.styleSelected||{};


    //--- class data holders
    this.classCell = props.classCell||'';
    this.classCellOddRow = props.classCellOddRow||'';
    this.classHeaderCell = props.classHeaderCell||'';
    this.classRowHeaderCell = props.classRowHeaderCell||'';

    this.classData = props.classData||'';
    this.classDataOddRow = props.classDataOddRow||'';
    this.classHeaderData = props.classHeaderData||'';
    this.classRowHeaderData = props.classRowHeaderData||'';

    this.classInput = props.classInput||'';
    this.classSelected = props.classSelected||'';
    
    this.keyList = this.uiMath.keyNames;


    var dataWide = this.uiMath.dataWide;
    var dataHigh = this.uiMath.dataHigh;

    // ensure that we only set the values if they've actuallly changed.
    if (this.cursor.maxX !== dataWide - 1 || this.cursor.maxY !== dataHigh - 1) {
      this.cursor.maxX = dataWide-1;
      this.cursor.maxY = dataHigh-1;
    }

    // make handlers easily available and log messages if they're missing.
    this.onChange       = (props.onChange       || this.logNoChangeHandlerMessage );  
    this.onRowAdd       = (props.onRowAdd       || this.logNoOnRowAddHandlerMessage); 
    this.onRowCut       = (props.onRowCut       || this.logNoOnRowCutHandlerMessage); 
    this.onGotoPage     = (props.onGotoPage     || this.logNoGotoPageHandlerMessage); 
    this.onExport       = (props.onExport       || this.logNoOnExportHandlerMessage); 
    this.onImport       = (props.onImport       || this.logNoOnImportHandlerMessage); 
    this.onReplaceData  = (props.onReplaceData  || this.logNoOnReplaceDataHandlerMessage); 

    this.pivotOn = props.pivotOn;    // easy availability to cells
  }


  @action cellSelectSet(x,y,val){
    selectedCells[y][x]=val;
  }

  @action cellMoveKey(e)
  {
    // only worry about arrow keys:
      if(e.shiftKey){
        // was it already down?  if no, start a selection
        // note: google sheets does not allow 2 separate shift-cell-selections at a time.  It's one block+click collection , but not 2 blocks.
        if(!this.cursor.shiftSelInProgress){
          this.cursor.selectToX=this.cursor.x;
          this.cursor.selectToY=this.cursor.y;
          this.cursor.shiftSelInProgress=true;
        }
      }
      else{
        this.cursor.shiftSelInProgress = false;
      }
      if (e.keyCode == '38') {
        // up arrow
        this.cursor.y--;
        if (this.cursor.y < 0) this.cursor.y = 0;
      }
      else if (e.keyCode == '40') {
        // down arrow
        if (this.cursor.y < this.cursor.maxY) this.cursor.y++;
      }
      else if (e.keyCode == '37') {
        // left arrow
        this.cursor.x--;
        if (this.cursor.x < 0) this.cursor.x = 0;
      }
      else if (e.keyCode == '39') {
        // right arrow
        if (this.cursor.x < this.cursor.maxX) this.cursor.x++;
      }
      e.stopPropagation();
      e.preventDefault();    
  }

  @computed get selectionBounds(){
    var res={l:-1,r:-1,t:-1,b:-1};
    // block selection 
    if(this.cursor.shiftSelInProgress){
      res.l = Math.min(this.cursor.x, this.cursor.selectToX);
      res.r = Math.max(this.cursor.x, this.cursor.selectToX);
      res.t = Math.min(this.cursor.y, this.cursor.selectToY);
      res.b = Math.max(this.cursor.y, this.cursor.selectToY);
    }
    else{
      res.l = res.r = this.cursor.x;
      res.t = res.b = this.cursor.y;
    }
    // click selection

    return res;
  }

  @computed get curEditIsValidFor() {
    var res={};
    res.isValidInt = this.checkValidInt(this.curEditingValue);
    res.isValidFloat = this.checkValidFloat (this.curEditingValue);
    return res;
  }

  checkValidInt(t){  
    if(!t) return true; // blank+null is ok.  
    return (!isNaN(t) && (function (x) { return (x | 0) === x; })(parseFloat(t)));
  }
  checkValidFloat(t) {
    if(!t) return true; // blank+null is ok.
    return (!isNaN(t));
  }

  getDataRespectingPivotAtEditCursor(clientData){
    if(this.uiMath.isPrimitiveData){
      // non-object data.  Just pretend it's a grid.  Only one coordinate will matter.
      if(this.pivotOn){
        return clientData[this.cursor.editY]; // y is rows down / outer array
      }
      else{
        return clientData[this.cursor.editX];
      }
    }
    else{    
      if(this.pivotOn){        
        return clientData[this.cursor.editX][this.uiMath.rowHeaderList[this.cursor.editY]]; // y is rows down / outer array        
      }
      else{
        return clientData[this.cursor.editY][this.uiMath.colHeaderKeyList[this.cursor.editX]];
      }
    }
  }

  getDataRespectingPivotAtLocation(clientData,x,y)
  {
    if(typeof clientData !== "object"){ console.log('Remember that the first parameter of this method must be the user client data.  Currently it is '+clientData);}
    if(this.uiMath.isPrimitiveData){
      // non-object data.  Just pretend it's a grid.  Only one coordinate will matter.
      if(this.pivotOn){
        return clientData[x]; // y is rows down / outer array
      }
      else{
        return clientData[y];
      }
    }
    else{
      // object data.  Use the real stuff.
      if(this.pivotOn){
        return clientData[x][this.uiMath.rowHeaderList[y]]; // x data items into outer list.  Y+1 adjusts for the "/" column heading
      }
      else{
        return clientData[y][this.uiMath.colHeaderKeyList[x]];  // y is depth in outer list, x is the column into the inner list/object
      }
    }
  }
  

  @observable jsonAsTxtError = '';
  @observable textDataLinesLength=0;
  @observable textGoalFormat = '';

  @action convertJSONtoTXT(data){
    this.textDataLinesLength=0;
    this.keyList=[];
    var res = '';
    
    if(!data || data.length===0){
      return '';
    }    
    this.textDataLinesLength = data.length;

    if (typeof data[0] === 'object' || typeof data[0] === 'array'){

      this.textGoalFormat=typeof data[0];
      this.textDataLinesLength = data.length;
      this.keyList = Object.keys(data[0]);
      if(this.keyList.length===0){
        // fake object.  Treat it as an array
        this.textGoalFormat='array';
        if(data[0].length){
          for(var fi=0;fi<data[0].length;fi++){
            this.keyList.push(fi);
          }
        }
      }

      this.cursor.objKey =this.keyList[0];
      for(var y=0;y<data.length;y++){
        var line = '';
        for(var x=0;x<this.keyList.length;x++){
          line+=data[y][this.keyList[x]]+'|';
        }
        res+= line.substring(0,line.length-1)+'\n';
      }
      return res.trim();
      //return data.map(x=>x[this.cursor.objKey]).join('\n');  // get the "objKey"th item from each object into an array of primitives then newline-join it together for the response.
    }
    else{
      this.textGoalFormat='prims'; // single array of primitives
      return data.join('\n').trim();
    }    
  }

  // TODO
  // - Make this return a full, reconstituted data object.
  // - tool button to switch between editor types.
  // - remember if the input was obj, array, or prim array and use it to convert back
  // - ALSO: Get components working everywhere, then close to ready to ship it!
  @action convertTXTtoJSON(txt){
    var lines = txt.split('\n');
    // bonehead implementation.  this is intended for lists of less than 200 items.
    var result = [];
    for(var ctr=0;ctr<lines.length;ctr++){
      if(this.textGoalFormat==='prims'){ 
        result.push(lines[ctr]); 
      }
      else if(this.textGoalFormat==='array'){ 
        var items=lines[ctr].split('|');
        result.push(items); 
      }
      else if(this.textGoalFormat==='object'){ 
        var curObj = {}
        var items=lines[ctr].split('|');
        for(var kctr=0;kctr<this.keyList.length;kctr++){
          if(items.length>kctr){
            curObj[ this.keyList[kctr] ]=items[kctr];
          }
          else{
            curObj[ this.keyList[kctr] ]='';
          }
        }
        result.push(curObj); 
      }
    }
    
    if(this.uiMath.debugGridMath){
      console.log(result);
    }
    this.onReplaceData(result);    
    
  }  

}

export default GridStore;


