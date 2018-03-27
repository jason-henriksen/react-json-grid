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
  @action toggleToolsAddCut() { this.showToolsAddCut = !this.showToolsAddCut; }

  @observable showToolsPage = false;
  @action toggleToolsPage() { this.showToolsPage = !this.showToolsPage; }

  @observable showToolsImpExp = false;
  @action toggleToolsImpExp() { this.showToolsImpExp = !this.showToolsImpExp; }

  @observable showToolsCustom = false;
  @action toggleToolsCustom() { this.showToolsCustom = !this.showToolsCustom; }

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
  @action toggleShowSizeStuff() { this.showSizeStuff = !this.showSizeStuff; }
  @observable showFormatStuff = false;
  @action toggleShowFormatStuff() { this.showFormatStuff = !this.showFormatStuff; }
  @observable showStyleStuff = false;
  @action toggleShowStyleStuff() { this.showStyleStuff = !this.showStyleStuff; }
  @observable showClassStuff = false;
  @action toggleShowClassStuff() { this.showClassStuff = !this.showClassStuff; }
  @observable showPivotStuff = false;
  @action toggleShowPivotStuff() { this.showPivotStuff = !this.showPivotStuff; }
  @observable showEditStuff = false;
  @action toggleShowEditStuff() { this.showEditStuff = !this.showEditStuff; }
  @observable showDebugStuff = false;
  @action toggleShowDebugStuff() { this.showDebugStuff = !this.showDebugStuff; }

  @observable debugGridMath = false;
  @action toggleDebugGridMath() { this.debugGridMath = !this.debugGridMath; }


  @observable styleHeader = '';
  @action setHeaderStyle(evt) { this.styleHeader = evt.target.value; }
  @observable styleRowHeader = '';
  @action setRowHeaderStyle(evt) { this.styleRowHeader = evt.target.value; }

  @observable styleCell = '';
  @action setCellStyle(evt) { this.styleCell = evt.target.value; }
  @observable styleSelectedCell   = '';
  @action setStyleSelectedCell(evt) { this.styleSelectedCell   = evt.target.value; }
  @observable styleInput = '';
  @action setInputStyle(evt) { this.styleInput = evt.target.value; }

  
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
  @action setFormatDate(evt) { this.formatDate = evt.target.value; }
  @observable formatTime = '';
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

  @computed get jsonHeaderStyleObject(){
    var res={}
    if(!this.styleHeader){ return res; }
    try {
      res = JSON.parse(this.rrjs.stringToJson(this.styleHeader));
      console.log(res);
    } catch(e) { res={backgroundColor:'red',err:'invalid JSX Style'};
    }
    return res;
  }
  @computed get jsonRowHeaderStyleObject(){
    var res={}
    if(!this.styleRowHeader){ return res; }
    try {
      res = JSON.parse(this.rrjs.stringToJson(this.styleRowHeader));
    } catch(e) { res={backgroundColor:'red',err:'invalid JSX Style'}; }
    return res;
  }
  
  @computed get jsonInputStyleObject(){
    var res={}
    if(!this.styleInput){ return res; }
    try {
      res = JSON.parse(this.rrjs.stringToJson(this.styleInput));
    } catch(e) { res={backgroundColor:'red',err:'invalid JSX Style'}; }
    return res;
  }
  @computed get jsonCellStyleObject(){
    var res={}
    if(!this.styleCell){ return res; }
    try {
      res = JSON.parse(this.rrjs.stringToJson(this.styleCell));
      console.log(res);
    } catch(e) { res={backgroundColor:'red',err:'invalid JSX Style'}; }
    return res;
  }
  @computed get jsonCellSelectedStyleObject(){
    var res={}
    if(!this.styleCell){ return res; }
    try {
      res = JSON.parse(this.rrjs.stringToJson(this.styleCell));
      console.log(res);
    } catch(e) { res={backgroundColor:'red',err:'invalid JSX Style'}; }
    return res;
  }




}

export default DocStore;