import { observable, computed, action } from 'mobx';

class GridStore {           // Just a class.  Nothing fancy here.
  constructor() { 
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

  @observable colDefList = {};                    // column definition meta data
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

  @action logNoChangeHandlerMessage() {console.log('no change handler supplied.');}

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

    var dataWide = 0;
    var dataHigh = 0;
    if (props.data && props.data.length > 0) {

      this.keyList = Object.keys(props.data[0]);

      if (props.pivotOn) {  // pivot the data using this key as the col header
        //---- PIVOTED FLOW
        dataWide = props.data.length;
        dataHigh = Object.keys(props.data[0]).length;
      }
      else {
        //---- NORMAL FLOW
        dataWide = Object.keys(props.data[0]).length;
        dataHigh = props.data.length;
      }
    }
    if (this.cursor.maxX !== dataWide - 1 || this.cursor.maxY !== dataHigh - 1) {
      // ensure that we only set the values if they've actuallly changed.
      this.cursor.maxX = dataWide-1;
      this.cursor.maxY = dataHigh-1;
    }

    this.onChange = (props.onChange || this.logNoChangeHandlerMessage ); // easy availability to cells

    this.pivotOn = props.pivotOn;    // easy availability to cells

    if (props.columnList){
      this.colDefList = {};
      // make a map of keys to objects for easy access later.
      for(var clctr=0;clctr<props.columnList.length;clctr++){
        this.colDefList[props.columnList[clctr].key] = props.columnList[clctr];
      }
    }
    else{
      this.colDefList = {};
    }
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

  getDataRespectingPivot(clientData){
    if(this.pivotOn){
      return clientData[this.cursor.editX][this.keyList[this.cursor.editY]]; // y is rows down / outer array
    }
    else{
      return clientData[this.cursor.editY][this.keyList[this.cursor.editX]];
    }
    
  }

}

export default GridStore;


