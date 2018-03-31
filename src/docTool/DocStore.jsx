import { observable, computed, action } from 'mobx';
import autoBind from 'react-autobind';


class DocStore {           // Just a class.  Nothing fancy here.
  constructor() { 
    autoBind(this); 
  }

  @observable showOutline = false;
  @action toggleOutline() { this.showOutline = !this.showOutline; }

  @observable hideEditor = false;
  @action toggleEditor() { this.hideEditor = !this.hideEditor; }

  // determine which onChangeHandler help and variables to use
  @observable onChangeHandlerType = 'normal'; // fast,primitive, rowReplace

  @observable showToolsAddCut = false;
  @observable showToolsPage = false;
  @observable showToolsImpExp = false;
  @observable showToolsCustom = false;  
  @observable toolsButtonClass = '';  
  @observable pageCount = 0;  
  @action toggleToolsAddCut() { this.showToolsAddCut = !this.showToolsAddCut; }
  @action toggleToolsPage() { this.showToolsPage = !this.showToolsPage; }
  @action toggleToolsImpExp() { this.showToolsImpExp = !this.showToolsImpExp; }
  @action toggleToolsCustom() { this.showToolsCustom = !this.showToolsCustom; }
  @action setToolsButtonClass(evt) { this.toolsButtonClass = evt.target.value; }
  @action setPageCount(val) { this.pageCount = val; if(this.pageCount<0){this.pageCount=0;} }


  @observable editDisabled = false;
  @action toggleEditDisabled() { this.editDisabled = !this.editDisabled; }
  
  @observable editAsText = false;
  @action toggleEditAsText() { this.editAsText = !this.editAsText; }
  
  @observable propBorderWide = -1;
  @action setBorderWidth(val) { this.propBorderWide = val; }

  @observable propPadWide = -1;
  @action setPadWidth(val) { this.propPadWide = val; }
  
  @observable propGridWide = -1;
  @action setGridWide(val) { this.propGridWide = val; }
  
  @observable propGridHigh = -1;
  @action setGridHigh(val) { this.propGridHigh = val; }

  @observable gridHighCollapse = false;
  @action toggleGridHighCollapse(val) { this.gridHighCollapse = !this.gridHighCollapse; }

  @observable propRowHigh = -1;
  @action setRowHigh(val) { this.propRowHigh = val; }

  @observable propRowHeaderHigh = -1;
  @action setRowHeaderHigh(val) { this.propRowHeaderHigh = val; }

  @observable propMinColWide = -1;
  @action setMinColWide(val) { this.propMinColWide = val; }

  @observable colHeaderHide = false;
  @action toggleColHeaderHide() { this.colHeaderHide = !this.colHeaderHide; }

  @observable pivotOn = false;
  @action togglePivotOn() { this.pivotOn = !this.pivotOn; }

  @observable pivotRowHeaderWide = -1;
  @action setPivotRowHeaderWide(val) { this.pivotRowHeaderWide = val; }

  @observable columnList = false;
  @action toggleColumnList() { this.columnList = !this.columnList; }

  @observable showSizeStuff = false;
  @observable showFormatStuff = false;
  @observable showStyleStuff = false;
  @observable showClassStuff = false;
  @observable showPivotStuff = false;
  @observable showEditStuff = false;
  @observable showDebugStuff = false;
  @observable showKeyboardStuff = false;
  @observable showCompStuff = false;
  @action toggleShowStyleStuff() { this.showStyleStuff = !this.showStyleStuff; }
  @action toggleShowSizeStuff() { this.showSizeStuff = !this.showSizeStuff; }
  @action toggleShowFormatStuff() { this.showFormatStuff = !this.showFormatStuff; }
  @action toggleShowClassStuff() { this.showClassStuff = !this.showClassStuff; }
  @action toggleShowPivotStuff() { this.showPivotStuff = !this.showPivotStuff; }
  @action toggleShowEditStuff() { this.showEditStuff = !this.showEditStuff; }
  @action toggleShowDebugStuff() { this.showDebugStuff = !this.showDebugStuff; }
  @action toggleShowKeyboardStuff() { this.showKeyboardStuff = !this.showKeyboardStuff ; }
  @action toggleShowCompStuff() { this.showCompStuff = !this.showCompStuff; }

  @observable debugGridMath = false;
  @action toggleDebugGridMath() { this.debugGridMath = !this.debugGridMath; }



  
  @observable classCell = '';
  @observable classData = '';
  @observable classHeaderCell = '';
  @observable classHeaderData = '';
  @observable classRowHeaderCell = '';
  @observable classRowHeaderData = '';
  @observable classCellOddRow = '';
  @observable classDataOddRow = '';
  @observable classInput = '';
  @observable classSelected = '';

  @action setClassCell(evt) { this.classCell = evt.target.value; }
  @action setClassData(evt) { this.classData = evt.target.value; }
  @action setClassHeaderCell(evt) { this.classHeaderCell = evt.target.value; }
  @action setClassHeaderData(evt) { this.classHeaderData = evt.target.value; }
  @action setClassRowHeaderCell(evt) { this.classRowHeaderCell = evt.target.value; }
  @action setClassRowHeaderData(evt) { this.classRowHeaderData = evt.target.value; }
  @action setClassCellOddRow(evt) { this.classCellOddRow = evt.target.value; }
  @action setClassDataOddRow(evt) { this.classDataOddRow = evt.target.value; }
  @action setClassInput(evt) { this.classInput = evt.target.value; }
  @action setClassSelected(evt) { this.classSelected = evt.target.value; }

  @observable formatDate = '';
  @observable formatTime = '';
  @action setFormatDate(evt) { this.formatDate = evt.target.value; }
  @action setFormatTime(evt) { this.formatTime = evt.target.value; }
  


  @observable colDef = 
      [
        {  
          key: 'a',           title:'col A',        editDisabled: '',          widePct: '',          widePx: '',
          easyBool:'',          easyInt: '',          easyFloat: '',          easyMoneyDollar: '',          easyMoneyEuro: '',          easyMoneyPound: '',
        easyDate: '',easyDateTime: '',           easyMenu: '',altText: '',
          styleHeader: '',          styleInput: '',                    styleCell: '',          
          compHeader: '',          compInput: '',          compCell: '',displayFormatter:''
        },       
        {
          key: 'b', title: 'col B', editDisabled: '', widePct: '', widePx: '',
          easyBool: '', easyInt: '', easyFloat: '', easyMoneyDollar: '', easyMoneyEuro: '', easyMoneyPound: '',
          easyDate: '',easyDateTime: '', altText: '',
          styleHeader: '', styleInput: '', styleCell: '',
          compHeader: '', compInput: '', compCell: '', displayFormatter: '', easyMenu: ''
        },
        {
          key: 'c', title: 'col C', editDisabled: '', widePct: '', widePx: '',
          easyBool: '', easyInt: '', easyFloat: '', easyMoneyDollar: '', easyMoneyEuro: '', easyMoneyPound: '',
          easyDate: '',easyDateTime: '', altText: '',
          styleHeader: '', styleInput: '', styleCell: '',
          compHeader: '', compInput: '', compCell: '', displayFormatter: '', easyMenu: ''
        },
        {
          key: 'd', title: 'col D', editDisabled: '', widePct: '', widePx: '',
          easyBool: '', easyInt: '', easyFloat: '', easyMoneyDollar: '', easyMoneyEuro: '', easyMoneyPound: '',
          easyDate: '',easyDateTime: '', altText: '',
          styleHeader: '', styleInput: '', styleCell: '',
          compHeader: '', compInput: '', compCell: '', displayFormatter: '', easyMenu: ''
        }
    ]
    
  @action setColDefValue(x, y, objKey, newValue) {
    this.colDef[y][objKey] = newValue;
  }

  @computed get outlineCSS() {
    if (this.showOutline) { return '2px green dashed';}
    else{return '';}
  }


  @observable styleCell = '';
  @observable styleData = '';
  @observable styleCellOddRow = '';
  @observable styleDataOddRow = '';
  @observable styleHeaderCell = '';
  @observable styleHeaderData = '';
  @observable styleInput = '';
  @observable styleSelected = '';

  @action setStyleCell(evt) {  this.styleCell = evt.target.value;  }
  @action setStyleData(evt) {  this.styleData = evt.target.value;  }
  @action setStyleCellOddRow(evt) {  this.styleCellOddRow = evt.target.value;  }
  @action setStyleDataOddRow(evt) {  this.styleDataOddRow = evt.target.value;  }  
  @action setHStyleHeaderCell(evt) { this.styleHeaderCell = evt.target.value; }
  @action setHStyleHeaderData(evt) { this.styleHeaderData = evt.target.value; }
  @action setInputStyle(evt) { this.styleInput = evt.target.value; }
  @action setStyleSelected(evt) { this.styleSelected = evt.target.value; }

  @computed get jsonCellStyleObject(){
    var res={}; 
    if(!this.styleCell){ return res; }
    try { res = JSON.parse(this.rrjs.stringToJson(this.styleCell));} 
    catch(e) { res={backgroundColor:'red',err:'invalid Cell JSX Style'}; console.log(e,'invalid Cell JSX Style');}
    return res;
  }
  @computed get jsonDataStyleObject(){
    var res={};
    if(!this.styleData){ return res; }
    try { res = JSON.parse(this.rrjs.stringToJson(this.styleData));} 
    catch(e) { res={backgroundColor:'red',err:'invalid Data JSX Style'}; console.log(e,'invalid Data JSX Style');}
    return res;
  }
  @computed get jsonCellOddRowStyleObject(){
    var res={};
    if(!this.styleCellOddRow){ return res; }
    try { res = JSON.parse(this.rrjs.stringToJson(this.styleCellOddRow));} 
    catch(e) { res={backgroundColor:'red',err:'invalid Odd Row Cell JSX Style'}; console.log(e,'invalid Odd Row Cell JSX Style');}
    return res;
  }
  @computed get jsonDataOddRowStyleObject(){
    var res={};
    if(!this.styleDataOddRow){ return res; }
    try { res = JSON.parse(this.rrjs.stringToJson(this.styleDataOddRow));} 
    catch(e) { res={backgroundColor:'red',err:'invalid JSX Odd Row Data Style'}; console.log('invalid JSX Odd Row Data Style',e);}
    return res;
  }
  @computed get jsonHeaderCellStyleObject(){
    var res={}
    if(!this.styleHeaderCell){ return res; }
    try {      res = JSON.parse(this.rrjs.stringToJson(this.styleHeaderCell));    } 
    catch(e) { res={backgroundColor:'red',err:'Invalid JSX Header Cell Style'}; console.log('Invalid JSX Header Cell Style',e); }
    return res;
  }
  @computed get jsonHeaderDataStyleObject(){
    var res={}
    if(!this.styleHeaderData){ return res; }
    try {      res = JSON.parse(this.rrjs.stringToJson(this.styleHeaderData));    } 
    catch(e) { res={backgroundColor:'red',err:'Invalid JSX Header Data Style'}; console.log('Invalid JSX Header Data Style',e); }
    return res;
  }
  @computed get jsonInputStyleObject(){
    var res={}
    if(!this.styleInput){ return res; }
    try {      res = JSON.parse(this.rrjs.stringToJson(this.styleInput));    } 
    catch(e) { res={backgroundColor:'red',err:'Invalid JSX Input Cell Style'}; console.log('Invalid JSX Input Cell Style',e); }
    return res;
  }
  @computed get jsonCellSelectedStyleObject(){
    var res={}
    if(!this.styleSelected){ return res; }
    try {      res = JSON.parse(this.rrjs.stringToJson(this.styleCellSelected));   } 
    catch(e) { res={backgroundColor:'red',err:'Invalid JSX Selected Cell Style'}; console.log('Invalid JSX Selected Cell Style',e); }
    return res;
  }


}

export default DocStore;