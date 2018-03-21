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

  @observable colDefList = {};                    // column definition meta data accessible by keyName
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

  @action logNoChangeHandlerMessage()     {console.log('no onChange handler supplied.');}
  @action logNoOnRowAddHandlerMessage()   { console.log('no onRowAdd handler supplied.'); }
  @action logNoOnRowCutHandlerMessage()   { console.log('no onRowCut handler supplied.'); }
  @action logNoOnGotoPageHandlerMessage() { console.log('no onGotoPage handler supplied.'); }
  @action logNoOnImportHandlerMessage()   { console.log('no onImport handler supplied.'); }
  @action logNoOnExportHandlerMessage()   { console.log('no onExport handler supplied.'); }

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
    this.colDefList = this.uiMath.colDefList;
    this.keyList = this.uiMath.keyNames;
    var dataWide = this.uiMath.dataWide;
    var dataHigh = this.uiMath.dataHigh;

    // ensure that we only set the values if they've actuallly changed.
    if (this.cursor.maxX !== dataWide - 1 || this.cursor.maxY !== dataHigh - 1) {
      this.cursor.maxX = dataWide-1;
      this.cursor.maxY = dataHigh-1;
    }

    // make handlers easily available and log messages if they're missing.
    this.onChange   = (props.onChange   || this.logNoChangeHandlerMessage );  
    this.onRowAdd   = (props.onRowAdd   || this.logNoOnRowAddHandlerMessage); 
    this.onRowCut   = (props.onRowCut   || this.logNoOnRowCutHandlerMessage); 
    this.onGotoPage = (props.onGotoPage || this.logNoGotoPageHandlerMessage); 
    this.onExport = (props.onExport     || this.logNoOnExportHandlerMessage); 
    this.onImport = (props.onImport     || this.logNoOnImportHandlerMessage); 

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
        return clientData[this.cursor.editX][this.uiMath.colHeaderKeyList[this.cursor.editY]]; // y is rows down / outer array
      }
      else{
        return clientData[this.cursor.editY][this.uiMath.colHeaderKeyList[this.cursor.editX]];
      }
    }
  }

  renderZero(tval) {if (0===tval){return '0';} else if (false===tval){return 'false';} else{return tval}}

  getDataRespectingPivotAtLocation(clientData,x,y)
  {
    if(typeof clientData !== "object"){ console.log('Remember that the first parameter of this method must be the user client data.  Currently it is '+clientData);}
    if(this.uiMath.isPrimitiveData){
      // non-object data.  Just pretend it's a grid.  Only one coordinate will matter.
      if(this.pivotOn){
        return this.renderZero(clientData[x]); // y is rows down / outer array
      }
      else{
        return this.renderZero(clientData[y]);
      }
    }
    else{
      // object data.  Use the real stuff.
      if(this.pivotOn){
        return this.renderZero(clientData[x][this.uiMath.colHeaderKeyList[y+1]]); // x data items into outer list.  Y+1 adjusts for the "/" column heading
      }
      else{
        return this.renderZero(clientData[y][this.uiMath.colHeaderKeyList[x]]);  // y is depth in outer list, x is the column into the inner list/object
      }
    }
  }
  

  @observable jsonAsTxtError = '';
  @observable textDataLinesLength=0;

  @action convertJSONtoTXT(data){
    this.textDataLinesLength=0;
    this.keyList=[];
    if(!Array.isArray(data)){
      this.jsonAsTxtError = 'Text mode should only be used on an array of primitives or objects with a single attribute';
      console.log(this.jsonAsTxtError);
      return '### Invalid Data ###';
    }
    if(data.length===0){
      return '';
    }    
    this.textDataLinesLength = data.length;

    if(typeof data[0] === 'object'){
      this.textDataLinesLength = data.length;
      this.keyList = Object.keys(data[0]);
      if(this.keyList.length!==1){
        this.jsonAsTxtError = 'Text mode should only be used on an array of primitives or an array of objects with a single attribute';
        console.log(this.jsonAsTxtError);
        return '### Invalid Data ###';
      }
      this.cursor.objKey =this.keyList[0];
      return data.map(x=>x[this.cursor.objKey]).join('\n');  // get the "objKey"th item from each object into an array of primitives then newline-join it together for the response.
    }
    else{
      return data.join('\n');
    }    
  }

  @action convertTXTtoJSON(txt){
    var lines = txt.split('\n');
    // bonehead implementation.  this is intended for lists of less than 200 items.
    if (lines.length > this.textDataLinesLength){
      var lim = lines.length - this.textDataLinesLength;
      for (var x=0;x<lim;x++){
        this.onRowAdd(0,0,'na');
      }
    }
    if (lines.length < this.textDataLinesLength) {
      var lim = this.textDataLinesLength - lines.length;
      for (var y = 0; y < lim; y++) {
        this.onRowCut(0, 0, 'na');
      }
    }
    for(var ctr=0;ctr<lines.length;ctr++){
      this.onChange(0, ctr, this.keyList[0], lines[ctr]);    
    }
  }  

}

export default GridStore;


