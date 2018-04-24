import React from 'react';
import { toJS,observable,action,computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';
import Grid from '../Grid';
import rrjsTool from '../rrj-compile/index.js';

import '../TestCSS.css';
import Toggle from './Toggle';
import ToggleFolder from './ToggleFolder';
import NumWheel from './NumWheel';
import TextParam from './TextParam';
import CompactObjView from './CompactObjView';
import DataMaker from './DataMaker';

import DocStore from './DocStore';


@observer class DocUI extends React.Component {

  constructor(props) { 
    super(props); autoBind(this); 
    this.rrjs = rrjsTool.createParser();
    this.printer = new rrjsTool.PrettyPrinter( rrjsTool.PrettyPrinter.Options.Companion.JsonPretty);
    this.dm = new DataMaker(this.updateDataText);
    this.ds = new DocStore();
    this.ds.rrjs = this.rrjs; // for convenience in the computed values.

    this.dataAsObject();
  }

  @observable data = `[
  { "a": 1,  "b": 20, "c": 3, "d": 4.5 }, 
  { "a": 21, "b": 30, "c": 33, "d": "asdf" }, 
  { "a": 31, "b": 40, "c": 333, "d": "zing" }, 
  { "a": 41, "b": 30, "c": 33, "d": "asdf" }, 
  { "a": 51, "b": 40, "c": 333, "d": "zing" }, 
  { "a": 61, "b": 30, "c": 33, "d": "asdf" }, 
  { "a": 71, "b": 40, "c": 333, "d": "zing" }, 
  { "a": 81, "b": 30, "c": 33, "d": "asdf" }, 
  { "a": 91, "b": 40, "c": 333, "d": "zing" }, 
  { "a": 101, "b": 30, "c": 33, "d": "asdf" }, 
  { "a": 111, "b": 40, "c": 333, "d": "zing" }, 
  { "a": 121, "b": 30, "c": 33, "d": "asdf" }, 
  { "a": 131, "b": 40, "c": 333, "d": "zing" }, 
  { "a": 131, "b": 30, "c": 33, "d": "asdf" }, 
  { "a": 141, "b": 40, "c": 333, "d": "zing" }, 
  { "a": 151, "b": 30, "c": 33, "d": "asdf" }, 
  { "a": 161, "b": 40, "c": 333, "d": "zing" }, 
  { "a": 171, "b": 30, "c": 33, "d": "asdf" }, 
  { "a": 181, "b": 40, "c": 333, "d": "zing" }, 
  { "a": 191, "b": 50, "c": 3333, "d": "zong" } 
]
`;  // the data AS A STRING for the test editor
  @observable cleanData = {};         // the data AS JSON for the fast editor
  @observable dataErr = '';

  @action updateData(evt) { 
    this.data = evt.target.value;
    this.dataAsObject();
  }
  @action updateDataText(txt) { 
    this.data = txt;
    this.dataAsObject();
  }


  
  @action setValue(x,y,objKey,newValue)
  {
    // this is just for the test UI.  By making the "source of truth" the text file, i keep things in sync
    // cost is that I lose update performance for this test UI.  Try another test gui for perf testing.
    if(!this.ds.hideEditor){
      this.cleanData = JSON.parse(this.rrjs.stringToJson(this.data));    
      this.cleanData[y][objKey]=newValue;
      this.data = JSON.stringify(this.cleanData);
    }
    else{
      this.cleanData[y][objKey]=newValue;
    }
  }

  cleanClone(){
    var target={};
    Object.assign(target,this.cleanData[0]);
    var keyList = Object.keys(this.cleanData[0]);
    for (var kc = 0; kc < keyList.length; kc++) {
      target[keyList[kc]]='';
    }
    return target;
  }

  @action onRowAdd(x, y, objKey) {
    if(!this.ds.hideEditor){
      this.cleanData = JSON.parse(this.rrjs.stringToJson(this.data));
      this.cleanData.splice(y + 1, 0, this.cleanClone());
      this.data = JSON.stringify(this.cleanData);
    }
    else{
      this.cleanData.splice(y + 1, 0, this.cleanClone());
    }
  }

  @action onRowCut(x, y, objKey) {
    if(!this.ds.hideEditor){
      this.cleanData = JSON.parse(this.rrjs.stringToJson(this.data));
      this.cleanData.splice(y, 1);
      this.data = JSON.stringify(this.cleanData);
    }
    else{
      this.cleanData.splice(y, 1);
    }
  }

  @action onReplaceData(newData) {
    if(!this.ds.hideEditor){
      this.cleanData = newData;
      this.data = JSON.stringify(this.cleanData);
    }
    else{
      this.cleanData = newData;
    }
  }
  

  @action onColAdd(x, y, objKey) { }// not implemented yet.  
  @action onColCut(x, y, objKey) { }// not implemented yet.
  @action onDataClear(x, y, objKey) { }// not implemented yet.
  @action onGotoPage(page) {    window.alert('please load page '+page);  }
  @action onExport() { window.alert('please export'); }
  @action onImport() { window.alert('please import'); }
  
  @action addColDefRow() {  this.ds.addColDefRow();  }

  @action cutColDefRow(x, y, objKey) {
    this.ds.colDef.splice(x, 1);
  }

  @observable curParamHelp = "";

  dataAsObject(){
    this.cleanData=[];
    this.dataErr="";
    try {
      this.cleanData = JSON.parse(this.rrjs.stringToJson(this.data));          
      if (this.cleanData && typeof this.cleanData === "object") { this.dataErr="";}
      else{this.cleanData=[];this.dataErr="Invalid JSON."}
    }
    catch (e) { 
      try{
        this.cleanData = JSON.parse(this.data);          
      }
      catch(e2){
        this.dataErr="Invalid JSON.  Keys and values need to be in quotes.";  console.log(e);
      }
    }
  };  

  goMakeL(){
    this.dataErr="Building 50K objects...  Disabling text data editor for performance.";
    this.ds.hideEditor=true;
    this.ds.showDebugStuff=true;
    var saneThis = this;
    setTimeout(function(){ saneThis.dm.makeL(); saneThis.dataErr=''; }, 100);
  }
  goMakeLA(){
    this.dataErr="Building 50K arrays...  Disabling text data editor for performance.";
    this.ds.hideEditor=true;
    this.ds.showDebugStuff=true;
    var saneThis = this;
    setTimeout(function(){ saneThis.dm.makeLA(); saneThis.dataErr=''; }, 100);
  }



  render() {

    var colListAsText=[];
    for(var cctr=0;cctr<this.ds.colDef.length;cctr++){
      colListAsText.push(<CompactObjView target={this.ds.colDef[cctr]} key={JSON.stringify(this.ds.colDef[cctr])+cctr}/>);
    }


    toJS(this.ds.jsonStyleCell);
    toJS(this.ds.jsonStyleCellOddRow);
    toJS(this.ds.jsonStyleHeaderCell);
    toJS(this.ds.jsonStyleRowHeaderCell);
    toJS(this.ds.jsonStyleData);
    toJS(this.ds.jsonStyleDataOddRow);
    toJS(this.ds.jsonStyleHeaderData);
    toJS(this.ds.jsonStyleRowHeaderData);
    toJS(this.ds.jsonStyleInput);   
    toJS(this.ds.jsonStyleSelected);


    return (
        <div style={{ overflowY: 'hidden',height:(window.innerHeight-20)+'px'}}>
          <div style={{paddingLeft:'15px',position:'absolute',top:'0px',bottom:'0px',left:'0px',width:'450px',overflow:'auto',
                       borderRight:'2px solid grey',verticalAlign:'top',backgroundColor:'#fff8ed'}}>
            <div >
              <br/>
            <div style={{ fontSize: '3em', textAlign: 'center' }}><a href='https://github.com/jason-henriksen/react-json-grid'>react-json-grid</a></div>
              <div style={{fontSize:'1.5em',textAlign:'center'}}>Easy to use, high performance, JSON Grid Editor.</div>

            <p>Mouseover each tag attribute to see it's purpose.<br />
              Click the attribute to show a description.<br />
              Shift-Click text boxes to paste in a sample value.<br/>
              Please report issues at the github page linked above.<br/><br/>  Thanks for trying it out!</p>
            <br/>
          Example Data Generators<br/>
          <button style={{width:'90px'}} onClick={this.dm.makeS}>5 objects</button>
          <button style={{width:'90px'}} onClick={this.dm.makeM}>150 objects</button>
          <button style={{width:'90px'}} onClick={this.goMakeL}>50K objects</button>
          <br/>
          <button style={{width:'90px'}} onClick={this.dm.makeSA}>5 arrays</button>
          <button style={{width:'90px'}} onClick={this.dm.makeMA}>150 arrays</button>
          <button style={{width:'90px'}} onClick={this.goMakeLA}>50K arrays</button>
          <br/>
          <button style={{width:'90px'}} onClick={this.dm.makeAInt}>int[]</button>
          <button style={{width:'90px'}} onClick={this.dm.makeAWords}>word[]</button>
          <button style={{width:'90px'}} onClick={this.dm.makeKVP}>key : value[]</button>
          <br/>
          <button style={{width:'90px'}} onClick={this.dm.makeCSV}>CSV</button>
          <button style={{width:'90px'}} onClick={this.dm.makePSV}>PSV</button>
          <button style={{width:'90px'}} onClick={this.dm.makeKVE}>key=value[]</button><br />
          <span style={{ color: 'red' }}>{this.dataErr}</span><br />
            &#123;this.data&#125;&nbsp;&nbsp;&nbsp;Use this to see that the grid and the data are in sync.<br/>
          {!this.ds.hideEditor &&            
            <textarea style={{ width: '400px', height: '75px' }} onChange={this.updateData} value={this.data} />
          }
          
          <br/>              
              <br/>Parameter UI<br/>
              <div style={{display:'inline-block',verticalAlign:'top',margin:'5px'}}>
              <ToggleFolder action={this.ds.toggleShowSizeStuff} toggleValue={this.ds.showSizeStuff} label='Sizing' help='display API for sizing' />
              { this.ds.showSizeStuff &&  
              <div style={{marginLeft:'40px'}}>
                <NumWheel action={this.ds.setBorderWidth} curValue={this.ds.propBorderWide} mouseOverValue={5} label='borderWide' help='width of the border between cells' />
                <NumWheel action={this.ds.setPadWidth} curValue={this.ds.propPadWide} label='padWide' mouseOverValue={5} help='width of the padding inside each cell' />
                <NumWheel action={this.ds.setGridWide} incr={100} curValue={this.ds.propGridWide} mouseOverValue={150} label='gridWide' help={<div>Forced width of the grid.<br />Not set by CSS because the number is needed for javascript calculations.</div>} />
                <NumWheel action={this.ds.setGridHigh} incr={100} curValue={this.ds.propGridHigh}  mouseOverValue={250} label='gridHigh' help={<div>Forced height of the grid.<br />Not set by CSS because the number is needed for javascript calculations.</div>} />
                <NumWheel action={this.ds.setRowHigh} curValue={this.ds.propRowHigh} label='rowHigh'  mouseOverValue={50} help='over-ride default row height' />
                <NumWheel action={this.ds.setRowHeaderHigh} curValue={this.ds.propRowHeaderHigh} mouseOverValue={50}  label='colHeaderHigh' help='over-ride row header height' />
                <NumWheel action={this.ds.setMinColWide} incr={5} curValue={this.ds.propMinColWide} mouseOverValue={50} label='minColWide' help='forced minimum auto grid width.  Over-ridden by column properties.' />
                <Toggle action={this.ds.toggleColHeaderHide} toggleValue={this.ds.colHeaderHide} label='colHeaderHide' help='hide/show column header.' />
                <Toggle action={this.ds.toggleGridHighCollapse} toggleValue={this.ds.gridHighCollapse} label='gridHighCollapse' help='If there are fewer rows than needed by the gridHigh setting, shrink the height of the grid.  Otherwise, use the full space.' />
                </div>
              }
              <ToggleFolder action={this.ds.toggleShowStyleStuff} toggleValue={this.ds.showStyleStuff} label='Style' help='display API for style objects' />
              {this.ds.showStyleStuff &&
                <div style={{ marginLeft: '40px' }}>
                  NOTE: enter styles in the JSX format.<br />For example:  &#123;backgroundColor:'lightblue'&#125;<br />
                  <br /><u>background style objects</u>
                  <TextParam action={this.ds.setStyleCell} curValue={this.ds.styleCell} label='styleCell' help='style for cells.' mouseOverValue="{backgroundColor:'beige'}" />
                  <TextParam action={this.ds.setStyleCellOddRow} curValue={this.ds.styleCellOddRow} label='styleCellOddRow' help='style for cells in odd numbered rows.' mouseOverValue="{backgroundColor:'beige'}" />
                  <TextParam action={this.ds.setStyleHeaderCell} curValue={this.ds.styleHeaderCell} label='styleHeaderCell' help='style for column header cells (and row headers, if row header style is not specified.)' mouseOverValue="{backgroundColor:'beige'}" />
                  <TextParam action={this.ds.setStyleRowHeaderCell} curValue={this.ds.styleRowHeaderCell} label='styleRowHeaderCell' help='style for row header cells (only visible when pivotOn is set)' mouseOverValue="{backgroundColor:'beige'}" />

                  <br /><u>data style objects</u>
                  <TextParam action={this.ds.setStyleData} curValue={this.ds.styleData} label='styleData' help='style for data in cells' mouseOverValue="{textAlign:'center',backgroundColor:'lightgreen',transform: rotate(45deg)}" />
                  <TextParam action={this.ds.setStyleDataOddRow} curValue={this.ds.styleDataOddRow} label='styleDataOddRow' help='style for data in cells in odd numbered rows.' mouseOverValue="{textAlign:'center',backgroundColor:'lightgreen',transform: rotate(45deg)}" />
                  <TextParam action={this.ds.setStyleHeaderData} curValue={this.ds.styleHeaderData} label='styleHeaderData' help='style for data in column header cells (and row headers, if row header style is not specified.)' mouseOverValue="{textAlign:'center',backgroundColor:'lightgreen',transform: rotate(45deg)}" />
                  <TextParam action={this.ds.setStyleRowHeaderData} curValue={this.ds.styleRowHeaderData} label='styleRowHeaderData' help='style for data in row header cells (only visible when pivotOn is set)' mouseOverValue="{textAlign:'center',backgroundColor:'lightgreen',transform: rotate(45deg)}" />

                  <br /><u>selection/input classes</u>
                  <TextParam action={this.ds.setStyleInput} curValue={this.ds.styleInput} label='styleInput' help='style for default cells.  cannot control border or padding.' mouseOverValue="{backgroundColor:'lightgreen'}" />
                  <TextParam action={this.ds.setStyleSelected} curValue={this.ds.styleSelected} label='styleSelected' help='style object to apply to the currently selected cell' mouseOverValue="{backgroundColor:'black',color:'white'}" />

                </div>
              }
              <ToggleFolder action={this.ds.toggleShowClassStuff} toggleValue={this.ds.showClassStuff} label='Class' help='display API for css class usage' />
              {this.ds.showClassStuff &&
                <div style={{ marginLeft: '40px' }}>
                  NOTE: here are some CSS class names to try:<br />
                  <div style={{ marginLeft: '10px' }}>BasicBeige, GreenRotate , PinkRotate , RedRotate</div>
                  <div style={{ marginLeft: '10px' }}>BackgroundBlue , BackgroundYellow</div>
                  <div style={{ marginLeft: '10px' }}>Gradient1 , Gradient2</div>

                  <br /><u>background classes</u>
                  <TextParam action={this.ds.setClassCell} curValue={this.ds.classCell} mouseOverValue='Gradient1' label='classCell' help='class name for cell container boxes.  ( for example, background color )' />
                  <TextParam action={this.ds.setClassCellOddRow} curValue={this.ds.classCellOddRow} mouseOverValue='Gradient1' label='classCellOddRow' help='class name for cell backgrounds on odd row numbers.' />
                  <TextParam action={this.ds.setClassHeaderCell} curValue={this.ds.classHeaderCell} mouseOverValue='Gradient1' label='classHeaderCell' help='classname to apply to header cells.  For example: background colors.  cannot control border or padding.' />
                  <TextParam action={this.ds.setClassRowHeaderCell} curValue={this.ds.classRowHeaderCell} mouseOverValue='Gradient1' label='classRowHeaderCell' help='style for row header cells when pivotOn is set.  cannot control border or padding.' />

                  <br /><u>data classes</u>
                  <TextParam action={this.ds.setClassData} curValue={this.ds.classData} mouseOverValue='GreenRotate' label='classData' help='class name for cell data. (for example, rotations )' />
                  <TextParam action={this.ds.setClassDataOddRow} curValue={this.ds.classDataOddRow} mouseOverValue='GreenRotate' label='classDataOddRow' help='class name for cell data on odd row numbers.' />
                  <TextParam action={this.ds.setClassHeaderData} curValue={this.ds.classHeaderData} mouseOverValue='GreenRotate' label='classHeaderData' help='classname to apply to header data. For example: text rotations where you do not want to rotate the cell itself.  cannot control border or padding.' />
                  <TextParam action={this.ds.setClassRowHeaderData} curValue={this.ds.classRowHeaderData} mouseOverValue='GreenRotate' label='classRowHeaderData' help='style for row header cells when pivotOn is set.  cannot control border or padding.' />

                  <br /><u>selection/input classes</u>
                  <TextParam action={this.ds.setClassInput} curValue={this.ds.classInput} mouseOverValue='Gradient1' label='classInput' help='class name for input cells' />
                  <TextParam action={this.ds.setClassSelected} curValue={this.ds.classSelected} mouseOverValue='Gradient1' label='classSelected' help='class name for selected cells..' />
                </div>
              }              
              <ToggleFolder action={this.ds.toggleShowEditStuff} toggleValue={this.ds.showEditStuff} label='Tools' help='display edit tools' />
              {this.ds.showEditStuff &&
                <div style={{ marginLeft: '40px' }}>
                  <Toggle action={this.ds.toggleToolsAddCut} toggleValue={this.ds.showToolsAddCut} label='showToolsAddCut' help='shows buttons to add/remove rows' />
                  <Toggle action={this.ds.toggleToolsPage} toggleValue={this.ds.showToolsPage} label='showToolsPage' help='show buttons to select different pages of data' />
                  <Toggle action={this.ds.toggleToolsImpExp} toggleValue={this.ds.showToolsImpExp} label='showToolsImpExp' help='show buttons to import or export the data' />
                  <Toggle action={this.ds.toggleToolsCustom} toggleValue={this.ds.showToolsCustom} label='showToolsCustom' help={<div>shows user supplied buttons.<br />Note that you must supply an array of components to this attribute</div>} />
                  <TextParam action={this.ds.setToolsButtonClass} curValue={this.ds.toolsButtonClass} label='toolsButtonClass' help='class to apply to tool buttons.' mouseOverValue='Gradient1' />
                  <NumWheel action={this.ds.setPageCount} curValue={this.ds.pageCount} label='pageCount' help={<div>when using the page tools, this sets the number of pages to have available. The value shows in Alt-Text for the buttons.</div>} />
                  <Toggle action={this.ds.toggleEditDisabled} toggleValue={this.ds.editDisabled} label='editDisabled' help='disable all grid editing' />
                  <Toggle action={this.ds.toggleEditAsText} toggleValue={this.ds.editAsText} label='editAsText' help={<div>Converts the JSON to pipe delimited text<br />one item per line, for easy text editing.<br />Best for one dimensional arrays.</div>} />
                </div>
              }              
              <ToggleFolder action={this.ds.toggleColumnList} toggleValue={this.ds.columnList} label='Columns' help='define column meta data' />
              {this.ds.columnList &&
                <div style={{marginLeft:'10px'}}>
                  <Grid
                  data={this.ds.colDef}
                  columnList={[
                    { key: 'key', altText: 'key name (or index) of the data for this column.  You can re-order the key names to re-order the columns displayed.' },
                    { key: 'title', altText: 'text in the title bar of the column' },
                    { key: 'editDisabled', easyBool: true, altText: 'disable editing for this column' },
                    { key: 'widePct', easyFloat: true, altText: 'percent of grid width to make this column.  Too big will cause side scrolling!' },
                    { key: 'widePx', easyInt: true, altText: 'width in pixels to make this column.  Too big will cause side scrolling!' },
                    { key: 'easyBool', easyBool: true, altText: 'render this column as a check box' },
                    { key: 'easyInt', easyBool: true, altText: 'render and validate this column as an integer' },
                    { key: 'easyFloat', easyBool: true, altText: 'render and validate this column as an float' },
                    { key: 'easyDollar', easyBool: true, altText: 'render and validate this column as dollars' },
                    { key: 'easyEuro', easyBool: true, altText: 'render and validate this column as euros' },
                    { key: 'easyPound', easyBool: true, altText: 'render and validate this column as pounds' },
                    { key: 'easyDate', easyBool: true, altText: 'render and validate this column as a date' },
                    { key: 'easyDateTime', easyBool: true, altText: 'render and validate this column as a datetime' },
                    { key: 'easyMenu', altText: 'render and validate this column as a menu. supply an array of values easyMenu={[a,b,c,d]} or a pipe separated list easyMenu={"a|b|c|d"}' },
                    { key: 'altText', altText: 'provide help text when mousing over the column header' },

                    { key: 'styleCell', altText: 'provide help text when mousing over the column header' },
                    { key: 'styleData', altText: 'provide help text when mousing over the column header' },
                    { key: 'styleHeaderCell', altText: 'provide help text when mousing over the column header' },
                    { key: 'styleHeaderData', altText: 'provide help text when mousing over the column header' },


                    { key: 'classCell', altText: 'provide help text when mousing over the column header' },
                    { key: 'classData', altText: 'provide help text when mousing over the column header' },
                    { key: 'classHeaderCell', altText: 'provide help text when mousing over the column header' },
                    { key: 'classHeaderData', altText: 'provide help text when mousing over the column header' },

                    { key: 'compHeader', altText: 'provide help text when mousing over the column header' },
                    { key: 'compInput', altText: 'provide help text when mousing over the column header' },
                    { key: 'compCell', altText: 'provide help text when mousing over the column header' },
                  ]}
                  pivotOn='title'
                  showToolsAddCut
                  onRowAdd={this.addColDefRow}
                  onRowCut={this.cutColDefRow}
                  pivotRowHeaderWide={110}
                  onChange={this.ds.setColDefValue}
                  styleRowHeaderCell={{ textAlign: 'left' }}
                  styleCell={{ backgroundColor: 'white' }}
                  gridHigh={900}
                  gridWide={380}
                  gridHighCollapse
                  
                />
                </div>
              }
              <ToggleFolder action={this.ds.toggleShowPivotStuff} toggleValue={this.ds.showPivotStuff} label='Pivot' help='display data pivot' />
              {this.ds.showPivotStuff &&
                <div style={{marginLeft:'40px'}}>
                  <Toggle action={this.ds.togglePivotOn} toggleValue={this.ds.pivotOn} label='pivotOn' help='pivot the data on a key.' />
                  <NumWheel action={this.ds.setPivotRowHeaderWide} incr={25} curValue={this.ds.pivotRowHeaderWide} label='pivotRowHeaderWide' help={<div>when pivotOn is set,<br />use this to set the pixel width of the row header</div>} />
                </div>
              }
              <ToggleFolder action={this.ds.toggleShowFormatStuff} toggleValue={this.ds.showFormatStuff} label='Format' help='display API for date, time and other formatters' />
              {this.ds.showFormatStuff &&
              <div style={{marginLeft:'40px'}}>
                <TextParam action={this.ds.setFormatDate} curValue={this.ds.formatDate} label='formatDate' help='preferred date format.' />
                <TextParam action={this.ds.setFormatTime} curValue={this.ds.formatTime} label='formatTime' help='preferred time format.' />
                </div>
              }
              <ToggleFolder action={this.ds.toggleShowDebugStuff} toggleValue={this.ds.showDebugStuff} label='Debug' help='grid tools to help you debug your grid usage.' />
              { this.ds.showDebugStuff &&  
              <div style={{marginLeft:'40px'}}>
                <Toggle action={this.ds.toggleOutline} toggleValue={this.ds.showOutline} label='Show test outline' help='Not grid related.  Just shows an outline around the container holding the Grid.' />
                <Toggle action={this.ds.toggleDebugGridMath} toggleValue={this.ds.debugGridMath} label='debugGridMath' help='Look at the logs to see what the grid thinks sizes should be.  Used to debug external CSS issues.' />
                <Toggle action={this.ds.toggleEditor} toggleValue={this.ds.hideEditor} label='Hide text editor' help='Not grid related.  Keeping the data text editor in sync with the grid costs more performance than the grid does.  When running large data test, this editor is disabled.' />
                ( The Example Data text editor<br/> has much worse performance than react-json-grid.<br/>Use "Hide text editor" to disable it<br/> while doing performance tests. )
              </div>}              
              <ToggleFolder action={this.ds.toggleShowKeyboardStuff} toggleValue={this.ds.showKeyboardStuff} label='Keys' help='enabled keyboard bindings.' />
                {this.ds.showKeyboardStuff &&
                <div style={{ marginLeft: '40px' }}>
                Key Bindings: <br />Arrows, PgUp, PgDn, Home, End, <br />
                Enter, Shift-Enter, Tab, Shift-Tab, , Escape<br /> 
                Ctrl-C, Ctrl-V, Ctrl-X.<br /><br />
                Multi-Select Features: <br/>Block Select via Shift-Arrow Keys and Shift-Click<br />
              </div>}

              <ToggleFolder action={this.ds.toggleShowCompStuff} toggleValue={this.ds.showCompStuff} label='Components' help='ability to use components for key items.' />
               {this.ds.showCompStuff &&
                <div style={{ marginLeft: '40px' }}>              
                <br/><u>component slots</u>
                  <TextParam action={this.ds.setClassCell}            curValue={this.ds.classCell} label='compCell' help='class name for cell container boxes.  ( for example, background color )' />
                  <TextParam action={this.ds.setClassHeaderCell}      curValue={this.ds.classHeaderCell} label='compHeader' help='classname to apply to header cells.  For example: background colors.  cannot control border or padding.' />
                  <TextParam action={this.ds.setClassRowHeaderCell}   curValue={this.ds.classRowHeaderCell} label='compRowHeader' help='style for row header cells when pivotOn is set.  cannot control border or padding.' />              
                </div>}
              <br /><br /><br /><br /><br /><br />
            </div>
          </div>

        </div>

  <div style={{marginLeft:'25px',position:'absolute',top:'0px',bottom:'0px',left:'455px',right:'0px',overflow:'auto'}}>
          <br />
          <br />
          <br />
      <Grid style={{ outline: this.ds.outlineCSS }}
        gridHigh={this.ds.propGridHigh}
        gridWide={this.ds.propGridWide}      
        editDisabled={this.ds.editDisabled}
        editAsText={this.ds.editAsText}




        rowHigh={this.ds.propRowHigh}
        colHeaderHigh={this.ds.propRowHeaderHigh}
        colHeaderHide={this.ds.colHeaderHide}
        gridHighCollapse={this.ds.gridHighCollapse}
        borderWide={this.ds.propBorderWide}
        padWide={this.ds.propPadWide}
        data={this.cleanData}
        onChange={this.setValue}
        onRowAdd={this.onRowAdd}
        onRowCut={this.onRowCut}
        onReplaceData={this.onReplaceData}        
        onColAdd={this.onColAdd}
        onColCut={this.onColCut}
        onImport={this.onImport}
        onExport={this.onExport}
        onGotoPage={this.onGotoPage}
        pivotOn={ this.ds.pivotOn? ( Object.keys( (this.cleanData[0]||{a:5}) )[0] ) :null}
        pivotRowHeaderWide={this.ds.pivotRowHeaderWide}
        columnList={ this.ds.columnList?this.ds.colDef:null }

        showToolsAddCut={this.ds.showToolsAddCut}
        showToolsPage={this.ds.showToolsPage}
        showToolsImpExp={this.ds.showToolsImpExp}
        showToolsCustom={this.ds.showToolsCustom && <div>Some Funky Thing</div>}
        toolsButtonClass={this.ds.toolsButtonClass}
        pageCount={this.ds.pageCount}

        formatDate={this.ds.formatDate}
        formatTime={this.ds.formatTime}

        styleCell={this.ds.jsonStyleCell}        
        styleCellOddRow={this.ds.jsonStyleCellOddRow}        
        styleHeaderCell={this.ds.jsonStyleHeaderCell}
        styleRowHeaderCell={this.ds.jsonStyleRowHeaderCell}
        styleData={this.ds.jsonStyleData}        
        styleDataOddRow={this.ds.jsonStyleDataOddRow}        
        styleHeaderData={this.ds.jsonStyleHeaderData}
        styleRowHeaderData={this.ds.jsonStyleRowHeaderData}
        styleInput={this.ds.jsonStyleInput}
        styleSelected={this.ds.jsonStyleSelected} 

        classCell={this.ds.classCell}
        classData={this.ds.classData}
        classHeaderCell={this.ds.classHeaderCell}
        classHeaderData={this.ds.classHeaderData}
        classRowHeaderCell={this.ds.classRowHeaderCell}
        classRowHeaderData={this.ds.classRowHeaderData}
        classCellOddRow={this.ds.classCellOddRow}
        classDataOddRow={this.ds.classDataOddRow}
        classInput={this.ds.classInput}
        classSelected={this.ds.classSelected}

        debugGridMath={this.ds.debugGridMath}
      />
      <br/>
      <div style={{font:'20px monospace'}}>
          &lt;Grid
          {this.ds.propGridWide > -1 && <span><br />&nbsp;&nbsp;gridWide=&#123;{this.ds.propGridWide}&#125;&nbsp;&nbsp;</span>}
          {this.ds.propGridHigh > -1 && <span><br />&nbsp;&nbsp;gridHigh=&#123;{this.ds.propGridHigh}&#125;&nbsp;&nbsp;</span>}
          {this.ds.propRowHigh > -1 && <span><br />&nbsp;&nbsp;rowHigh=&#123;{this.ds.propRowHigh}&#125;&nbsp;&nbsp;</span>}
          {this.ds.editDisabled && <span><br />&nbsp;&nbsp;editDisabled=&#123;{''+this.ds.editDisabled}&#125;&nbsp;&nbsp;</span>}
          {this.ds.editAsText && <span><br />&nbsp;&nbsp;editAsText=&#123;{''+this.ds.editAsText}&#125;&nbsp;&nbsp;</span>}
          {this.ds.propRowHeaderHigh > -1 && <span><br />&nbsp;&nbsp;colHeaderHigh=&#123;{this.ds.propRowHeaderHigh}&#125;&nbsp;&nbsp;</span>}
          {this.ds.propBorderWide > -1 && <span><br />&nbsp;&nbsp;borderWide=&#123;{this.ds.propBorderWide}&#125;&nbsp;&nbsp;</span>}
          {this.ds.pivotOn && <span><br />&nbsp;&nbsp;pivotOn={ Object.keys( (this.cleanData[0]||{a:5}) )[0] }&nbsp;&nbsp;</span>}
          {this.ds.pivotRowHeaderWide > -1 && <span><br />&nbsp;&nbsp;pivotRowHeaderWide=&#123;{''+this.ds.pivotRowHeaderWide}&#125;&nbsp;&nbsp;</span>}          

          {this.ds.showToolsAddCut && <span><br />&nbsp;&nbsp;showToolsAddCut</span>}
          {this.ds.showToolsImpExp && <span><br />&nbsp;&nbsp;showToolsImpExp</span>}
          {this.ds.showToolsPage && <span><br />&nbsp;&nbsp;showToolsPage</span>}
          {this.ds.showToolsCustom && <span><br />&nbsp;&nbsp;showToolsCustom=&#123;{'<YourCustomComponent/>'}&#125;&nbsp;&nbsp;</span>}
          {this.ds.toolsButtonClass && <span><br />&nbsp;&nbsp;toolsButtonClass='{''+this.ds.toolsButtonClass}'</span>}
          {(this.ds.pageCount>0) && <span><br />&nbsp;&nbsp;pageCount=&#123;{''+this.ds.pageCount}&#125;</span>}

          {this.ds.propPadWide > -1 && <span><br />&nbsp;&nbsp;padWide=&#123;{this.ds.propPadWide}&#125;&nbsp;&nbsp;</span>}
          {this.ds.colHeaderHide && <span><br />&nbsp;&nbsp;colHeaderHide=&#123;{''+this.ds.colHeaderHide}&#125;&nbsp;&nbsp;</span>}

        {this.ds.styleCell && <span><br />&nbsp;&nbsp;styleCell=&#123;{this.ds.styleCell}&#125;</span>}
        {this.ds.styleCellOddRow && <span><br />&nbsp;&nbsp;styleCellOddRow=&#123;{this.ds.styleCellOddRow}&#125;</span>}
        {this.ds.styleHeaderCell && <span><br />&nbsp;&nbsp;styleHeaderCell=&#123;{this.ds.styleHeaderCell}&#125;</span>}
        {this.ds.styleRowHeaderCell && <span><br />&nbsp;&nbsp;styleRowHeaderCell=&#123;{this.ds.styleRowHeaderCell}&#125;</span>}

        {this.ds.styleData && <span><br />&nbsp;&nbsp;styleData=&#123;{this.ds.styleData}&#125;</span>}
        {this.ds.styleDataOddRow && <span><br />&nbsp;&nbsp;styleDataOddRow=&#123;{this.ds.styleDataOddRow}&#125;</span>}
        {this.ds.styleHeaderData && <span><br />&nbsp;&nbsp;styleHeaderData=&#123;{this.ds.styleHeaderData}&#125;</span>}
        {this.ds.styleRowHeaderData && <span><br />&nbsp;&nbsp;styleRowHeaderData=&#123;{this.ds.styleRowHeaderData}&#125;</span>}

        {this.ds.styleInput && <span><br />&nbsp;&nbsp;styleInput=&#123;{this.ds.styleInput}&#125;</span>}
        {this.ds.styleSelected && <span><br />&nbsp;&nbsp;styleSelected=&#123;{this.ds.styleSelected}&#125;</span>}



          {this.ds.classCell && <span><br />&nbsp;&nbsp;classCell='{this.ds.classCell}'</span>}
          {this.ds.classCellOddRow && <span><br />&nbsp;&nbsp;classCellOddRow='{this.ds.classCellOddRow}'</span>}
          {this.ds.classHeaderCell && <span><br />&nbsp;&nbsp;classHeaderCell='{this.ds.classHeaderCell}'</span>}
          {this.ds.classRowHeaderCell && <span><br />&nbsp;&nbsp;classRowHeaderCell='{this.ds.classRowHeaderCell}'</span>}
          {this.ds.classData && <span><br />&nbsp;&nbsp;classData='{this.ds.classData}'</span>}
          {this.ds.classDataOddRow && <span><br />&nbsp;&nbsp;classDataOddRow='{this.ds.classDataOddRow}'</span>}
          {this.ds.classHeaderData && <span><br />&nbsp;&nbsp;classHeaderData='{this.ds.classHeaderData}'</span>}
          {this.ds.classRowHeaderData && <span><br />&nbsp;&nbsp;classRowHeaderData='{this.ds.classRowHeaderData}'</span>}
          {this.ds.classInput && <span><br />&nbsp;&nbsp;classInput='{this.ds.classInput}'</span>}
          {this.ds.classSelected && <span><br />&nbsp;&nbsp;classSelected='{this.ds.classSelected}'</span>}
                  
                  
          {this.ds.formatDate && <span><br />&nbsp;&nbsp;formatDate=&#123;{this.ds.formatDate}&#125;</span>}
          {this.ds.formatTime && <span><br />&nbsp;&nbsp;formatTime=&#123;{this.ds.formatTime}&#125;</span>}
          {this.ds.gridHighCollapse && <span><br />&nbsp;&nbsp;gridHighCollapse</span>}
          {this.ds.debugGridMath && <span><br />&nbsp;&nbsp;debugGridMath</span>}                    
          {this.ds.columnList && <span><br />&nbsp;&nbsp;columnList=&#123;[{colListAsText}&nbsp;&nbsp;]&#125;</span>}          
          <br/>&nbsp;&nbsp;data=&#123;this.data&#125;
          <br/>&nbsp;&nbsp;onChange=&#123;(x,y,objKey,value)=&gt;&#123;&#125;&#125;&nbsp;&nbsp;
          
          <br />/&gt;
      </div>
    </div>
  </div>
    );
  }
}


export default DocUI;