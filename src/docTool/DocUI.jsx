import React from 'react';
import { toJS,observable,action,computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';
import Grid from '../Grid';
import rrjsTool from 'really-relaxed-json';


import Toggle from './Toggle';
import ToggleFolder from './ToggleFolder';
import NumWheel from './NumWheel';
import TextParam from './TextParam';
import CompactObjView from './CompactObjView';

import DataNoiseMed from '../../stories/dataNoiseMedium.js'
import DataNoiseSmall from '../../stories/dataNoiseSmall.js'
import DataNoiseGiant from '../../stories/dataNoiseGiant.js'


@observer class DocUI extends React.Component {
  constructor(props) { 
    super(props); autoBind(this); 
    this.rrjs = rrjsTool.createParser();
    this.printer = new rrjsTool.PrettyPrinter( rrjsTool.PrettyPrinter.Options.Companion.JsonPretty);
  }

  @observable showOutline = false;
  @action toggleOutline() { this.showOutline = !this.showOutline; }
  
  @observable showToolsAddCut = false;
  @action toggleToolsAddCut() { this.showToolsAddCut = !this.showToolsAddCut; }

  @observable showToolsPage = false;
  @action toggleToolsPage() { this.showToolsPage = !this.showToolsPage; }

  @observable showToolsCustom = false;
  @action toggleToolsCustom() { this.showToolsCustom = !this.showToolsCustom; }

  @observable editDisabled = false;
  @action toggleEditDisabled() { this.editDisabled = !this.editDisabled; }
  
  @observable propBorderWide = -1;
  @action setBorderWidth(val) { this.propBorderWide = val; }

  @observable propPadWide = -1;
  @action setPadWidth(val) { this.propPadWide = val; }
  
  @observable propGridWide = -1;
  @action setGridWide(val) { this.propGridWide = val; }
  
  @observable propGridHigh = -1;
  @action setGridHigh(val) { this.propGridHigh = val; }

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



  @observable styleHeader = '';
  @action setHeaderStyle(evt) { this.styleHeader = evt.target.value; }
  @observable styleRowHeader = '';
  @action setRowHeaderStyle(evt) { this.styleRowHeader = evt.target.value; }
  @observable styleCell = '';
  @action setCellStyle(evt) { this.styleCell = evt.target.value; }
  @observable styleInput = '';
  @action setInputStyle(evt) { this.styleInput = evt.target.value; }

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
  
  

  @observable data = DataNoiseSmall;
  @action updateData(evt) { this.data = evt.target.value;}
  @action makeS() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<5;ctr++){res+='{r:'+(5-ctr)+',a:5,b:6,c:8,d:90},';}
    res = res.substring(0, res.length-1);res+=']';
    this.data=res;
  }
  @action makeM() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<150;ctr++){res+='{r:'+(150-ctr)+',a:5,b:6,c:8,d:90},';}
    res = res.substring(0, res.length-1);res+=']';
    this.data=res;
  }
  @action makeL() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<50000;ctr++){res+='{"r":'+(50000-ctr)+',"a":5,"b":6,"c":8,"d":90},';}
    res = res.substring(0, res.length-1);res+=']';
    this.data=res;
  }
  @action makeSA() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<5;ctr++){res+='[1'+ctr+','+(2*ctr)+',3,4,5],';}
    res = res.substring(0, res.length-1);res+=']';
    this.data=res;
  }  
  @action makeMA() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<150;ctr++){res+='[1'+ctr+','+(2*ctr)+',3,4,5],';}
    res = res.substring(0, res.length-1);res+=']';
    this.data=res;
  }  
  @action makeLA() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<50000;ctr++){res+='[1'+ctr+','+(2*ctr)+',3,4,5],';}
    res = res.substring(0, res.length-1);res+=']';
    this.data=res;
  }  

  @action setValue(x,y,objKey,newValue)
  {
    // this is just for the test UI.  By making the "source of truth" the text file, i keep things in sync
    // cost is that I lose update performance for this test UI.  Try another test gui for perf testing.
    var cleanData = JSON.parse(this.rrjs.stringToJson(this.data));    
    cleanData[y][objKey]=newValue;
    this.data = JSON.stringify(cleanData);
  }

  @action setToolAction(x, y, objKey, tool) {
    // this is just for the test UI.  By making the "source of truth" the text file, i keep things in sync
    // cost is that I lose update performance for this test UI.  Try another test gui for perf testing.
    var cleanData = JSON.parse(this.rrjs.stringToJson(this.data));
    if("ADDROW"===tool){
      cleanData.splice(y+1, 0, {});
    }
    if ("CUTROW" === tool) {
      cleanData.splice(y, 1);
    }
    
    this.data = JSON.stringify(cleanData);
  }
  


  @observable curParamHelp = "";

  @computed get dataAsObject(){
    var res={};
    res.cleanData=[];
    res.dataErr="";
    try {
      res.cleanData = JSON.parse(this.rrjs.stringToJson(this.data));          
      if (res.cleanData && typeof res.cleanData === "object") { res.dataErr="";}
      else{res.cleanData=[];res.dataErr="Invalid JSON."}
    }
    catch (e) { 
      try{
      res.cleanData = JSON.parse(this.data);          
      }
      catch(e2){
        res.dataErr="Invalid JSON.  Keys and values need to be in quotes.";  console.log(e);
      }
    }

    return res;
  };  

  @computed get outlineCSS() {
    if (this.showOutline) { return '2px green dashed';}
    else{return '';}
  }

  @computed get jsonHeaderStyleObject(){
    var res={}
    if(!this.styleHeader){ return res; }
    try {
      res = JSON.parse(this.rrjs.stringToJson(this.styleHeader));
    } catch(e) {
      res={backgroundColor:'red',err:'invalid JSX Style'};
    }
    return res;
  }
  @computed get jsonRowHeaderStyleObject(){
    var res={}
    if(!this.styleRowHeader){ return res; }
    try {
      res = JSON.parse(this.rrjs.stringToJson(this.styleRowHeader));
    } catch(e) {
      res={backgroundColor:'red',err:'invalid JSX Style'};
    }
    return res;
  }
  
  @computed get jsonInputStyleObject(){
    var res={}
    if(!this.styleInput){ return res; }
    try {
      res = JSON.parse(this.rrjs.stringToJson(this.styleInput));
    } catch(e) {
      res={backgroundColor:'red',err:'invalid JSX Style'};
    }
    return res;
  }
  @computed get jsonCellStyleObject(){
    var res={}
    if(!this.styleCell){ return res; }
    try {
      res = JSON.parse(this.rrjs.stringToJson(this.styleCell));
    } catch(e) {
      res={backgroundColor:'red',err:'invalid JSX Style'};
    }
    return res;
  }




  render() {

    var colListAsText=[];
    for(var cctr=0;cctr<this.colDef.length;cctr++){
      colListAsText.push(<CompactObjView target={this.colDef[cctr]} key={JSON.stringify(this.colDef[cctr])+cctr}/>);
    }

    return (
        <div style={{ overflowY: 'hidden',height:(window.innerHeight-20)+'px'}}>
          <div style={{marginLeft:'30px',position:'absolute',top:'0px',bottom:'0px',left:'0px',width:'475px',overflow:'auto',
                       borderRight:'2px solid grey',verticalAlign:'top'}}>
            <div >
              <br/>Parameter UI<br/>
              <div style={{display:'inline-block',verticalAlign:'top',margin:'5px'}}>
              <ToggleFolder action={this.toggleShowSizeStuff} toggleValue={this.showSizeStuff} label='Size Features' help='display API for sizing' />
              { this.showSizeStuff &&  
              <div>
                <Toggle action={this.toggleOutline} toggleValue={this.showOutline} label='Show test outline' help='Not grid related.  Just shows an outline around the container holding the Grid.' />
                <Toggle action={this.toggleColHeaderHide} toggleValue={this.colHeaderHide} label='colHeaderHide' help='hide/show column header.' />
                <NumWheel action={this.setBorderWidth} curValue={this.propBorderWide} label='borderWide' help='width of the border between cells' />
                <NumWheel action={this.setPadWidth} curValue={this.propPadWide} label='padWide' help='width of the padding inside each cell' />
                <NumWheel action={this.setGridWide} incr={100} curValue={this.propGridWide} label='gridWide' help={<div>Forced width of the grid.<br />Not set by CSS because the number is needed for javascript calculations.</div>} />
                <NumWheel action={this.setGridHigh} incr={100} curValue={this.propGridHigh} label='gridHigh' help={<div>Forced height of the grid.<br />Not set by CSS because the number is needed for javascript calculations.</div>} />
                <NumWheel action={this.setRowHigh} curValue={this.propRowHigh} label='rowHigh' help='over-ride default row height' />
                <NumWheel action={this.setRowHeaderHigh} curValue={this.propRowHeaderHigh} label='colHeaderHigh' help='over-ride row header height' />
                <NumWheel action={this.setMinColWide} incr={5} curValue={this.propMinColWide} label='minColWide' help='forced minimum auto grid width.  Over-ridden by column properties.' />
                </div>
              }

              <ToggleFolder action={this.toggleColumnList} toggleValue={this.columnList} label='Column Definition Features' help='define column meta data' />
              {this.columnList &&
                <div>
                <Grid
                  data={this.colDef}
                  columnList={[
                    { key: 'key', altText: 'key name (or index) of the data for this column' },
                    { key: 'title', altText: 'text in the title bar of the column' },
                    { key: 'editDisabled', easyBool: true, altText: 'disable editing for this column' },
                    { key: 'widePct', easyFloat: true, altText: 'percent of grid width to make this column.  Too big will cause side scrolling!' },
                    { key: 'widePx', easyInt: true, altText: 'width in pixels to make this column.  Too big will cause side scrolling!' },
                    { key: 'easyBool', easyBool: true, altText: 'render this column as a check box' },
                    { key: 'easyInt', easyBool: true, altText: 'render and validate this column as an integer' },
                    { key: 'easyFloat', easyBool: true, altText: 'render and validate this column as an float' },
                    { key: 'easyMoneyDollar', easyBool: true, altText: 'render and validate this column as dollars' },
                    { key: 'easyMoneyEuro', easyBool: true, altText: 'render and validate this column as euros' },
                    { key: 'easyMoneyPound', easyBool: true, altText: 'render and validate this column as pounds' },
                    { key: 'easyDate', easyBool: true, altText: 'render and validate this column as a date' },
                    { key: 'easyDateTime', easyBool: true, altText: 'render and validate this column as a datetime' },
                    { key: 'easyMenu', altText: 'render and validate this column as a menu' },
                    { key: 'altText', altText: 'provide help text when mousing over the column header' },
                  ]}
                  pivotOn='title'
                  pivotRowHeaderWide={125}
                  onChange={this.setColDefValue}
                  styleRowHeader={{ textAlign: 'left' }}
                  gridHigh={600}
                  gridWide={425}
                />
                </div>
              }

              <ToggleFolder action={this.toggleShowEditStuff} toggleValue={this.showEditStuff} label='Edit/Tools Features' help='display edit tools' />
              {this.showEditStuff &&
                <div>
                  <Toggle action={this.toggleToolsAddCut} toggleValue={this.showToolsAddCut} label='showToolsAddCut' help='shows buttons to add/remove rows' />
                  <Toggle action={this.toggleToolsPage} toggleValue={this.showToolsPage} label='showToolsPage' help='show buttons to select different pages of data' />
                  <Toggle action={this.toggleToolsCustom} toggleValue={this.showToolsCustom} label='showToolsCustom' help={<div>shows user supplied buttons.<br />Note that you must supply an array of components to this attribute</div>} />
                  <Toggle action={this.toggleEditDisabled} toggleValue={this.editDisabled} label='editDisabled' help='disable all grid editing' />
                </div>
              }
              <ToggleFolder action={this.toggleShowPivotStuff} toggleValue={this.showPivotStuff} label='Pivot Features' help='display data pivot' />
              {this.showPivotStuff &&
                <div>
                  <Toggle action={this.togglePivotOn} toggleValue={this.pivotOn} label='pivotOn' help='pivot the data on a key.' />
                  <NumWheel action={this.setPivotRowHeaderWide} incr={25} curValue={this.pivotRowHeaderWide} label='pivotRowHeaderWide' help={<div>when pivotOn is set,<br />use this to set the pixel width of the row header</div>} />
                </div>
              }
              <ToggleFolder action={this.toggleShowStyleStuff} toggleValue={this.showStyleStuff} label='Style Features' help='display API for style objects' />
              {this.showStyleStuff &&  
                <div>
                <TextParam action={this.setHeaderStyle} curValue={this.styleHeader} label='styleHeader' help='style for header cells.  cannot control border or padding.' />
                <TextParam action={this.setRowHeaderStyle} curValue={this.styleRowHeader} label='styleRowHeader' help='style for row header cells when pivotOn is set.  cannot control border or padding.' />
                <TextParam action={this.setInputStyle} curValue={this.styleInput} label='styleInput' help='style for default cells.  cannot control border or padding.' />
                <TextParam action={this.setCellStyle} curValue={this.styleCell} label='styleCell' help='style for default input cells.  cannot control border or padding.' />
                </div>
              }
              <ToggleFolder action={this.toggleShowClassStuff} toggleValue={this.showClassStuff} label='Class Features' help='display API for css class usage' />
              {this.showClassStuff &&
                <div>
                <TextParam action={this.setHeaderStyle} curValue={this.styleHeader} label='classHeader' help='style for header cells.  cannot control border or padding.' />
                <TextParam action={this.setRowHeaderStyle} curValue={this.styleRowHeader} label='classRowHeader' help='style for row header cells when pivotOn is set.  cannot control border or padding.' />
                <TextParam action={this.setInputStyle} curValue={this.styleInput} label='classRow' help='style for default cells.  cannot control border or padding.' />
                <TextParam action={this.setCellStyle} curValue={this.styleCell} label='classRowOdd' help='style for default input cells.  cannot control border or padding.' />
                </div>
              }              
              <ToggleFolder action={this.toggleShowFormatStuff} toggleValue={this.showFormatStuff} label='Format Features' help='display API for date, time and other formatters' />
              {this.showFormatStuff &&
                <div>
                <TextParam action={this.setFormatDate} curValue={this.formatDate} label='formatDate' help='preferred date format.' />
                <TextParam action={this.setFormatTime} curValue={this.formatTime} label='formatTime' help='preferred time format.' />
                </div>
              }
              ?? Copy Paste Features ??<br/>
              ?? Multi-Select Features ??<br />
              ?? Component Examples ??<br />
              </div>
            </div>
          <br/><br/><br/>Example Data (this.data)<br/>
          <button style={{width:'90px'}} onClick={this.makeS}>5 objects</button>
          <button style={{width:'90px'}} onClick={this.makeM}>150 objects</button>
          <button style={{width:'90px'}} onClick={this.makeL}>50K objects</button>
          <br/>
          <button style={{width:'90px'}} onClick={this.makeSA}>5 arrays</button>
          <button style={{width:'90px'}} onClick={this.makeMA}>150 arrays</button>
          <button style={{width:'90px'}} onClick={this.makeLA}>50K arrays</button>
          <span style={{ color: 'red' }}>{this.dataAsObject.dataErr}</span><br />
          <textarea style={{ width: '400px', height: '75px' }} onChange={this.updateData} value={this.data} />
          

        </div>

  <div style={{marginLeft:'30px',position:'absolute',top:'0px',bottom:'0px',left:'500px',right:'0px',overflow:'auto'}}>
          <br />
          <br />
          <br />
      <Grid style={{outline:this.outlineCSS}}
        gridHigh={this.propGridHigh}
        gridWide={this.propGridWide}      
        editDisabled={this.editDisabled}
        styleHeader={this.jsonHeaderStyleObject}
        styleRowHeader={this.jsonRowHeaderStyleObject}
        styleInput={this.jsonInputStyleObject}
        styleCell={this.jsonCellStyleObject}        
        rowHigh={this.propRowHigh}
        colHeaderHigh={this.propRowHeaderHigh}
        colHeaderHide={this.colHeaderHide}
        borderWide={this.propBorderWide}
        padWide={this.propPadWide}
        data={this.dataAsObject.cleanData}
        onChange={this.setValue}
        onToolAction={this.setToolAction}
        pivotOn={ this.pivotOn? ( Object.keys( (this.dataAsObject.cleanData[0]||{a:5}) )[0] ) :null}
        pivotRowHeaderWide={this.pivotRowHeaderWide}
        columnList={ this.columnList?this.colDef:null }
        showToolsAddCut={this.showToolsAddCut}
        showToolsPage={this.showToolsPage}
        showToolsCustom={null}
        formatDate={this.formatDate}
        formatTime={this.formatTime}
      />
      <br/>
      <br />
      <br />
      <div style={{font:'20px monospace'}}>
          &lt;Grid
          {this.propGridWide > -1 && <span><br />&nbsp;&nbsp;gridWide=&#123;{this.propGridWide}&#125;&nbsp;&nbsp;</span>}
          {this.propGridHigh > -1 && <span><br />&nbsp;&nbsp;gridHigh=&#123;{this.propGridHigh}&#125;&nbsp;&nbsp;</span>}
          {this.propRowHigh > -1 && <span><br />&nbsp;&nbsp;rowHigh=&#123;{this.propRowHigh}&#125;&nbsp;&nbsp;</span>}
          {this.editDisabled && <span><br />&nbsp;&nbsp;editDisabled=&#123;{''+this.editDisabled}&#125;&nbsp;&nbsp;</span>}
          {this.propRowHeaderHigh > -1 && <span><br />&nbsp;&nbsp;colHeaderHigh=&#123;{this.propRowHeaderHigh}&#125;&nbsp;&nbsp;</span>}
          {this.propBorderWide > -1 && <span><br />&nbsp;&nbsp;borderWide=&#123;{this.propBorderWide}&#125;&nbsp;&nbsp;</span>}
          {this.pivotOn && <span><br />&nbsp;&nbsp;pivotOn={ Object.keys( (this.dataAsObject.cleanData[0]||{a:5}) )[0] }&nbsp;&nbsp;</span>}
          {this.pivotRowHeaderWide > -1 && <span><br />&nbsp;&nbsp;pivotRowHeaderWide=&#123;{''+this.pivotRowHeaderWide}&#125;&nbsp;&nbsp;</span>}
          {this.showTools && <span><br />&nbsp;&nbsp;showTools=&#123;{''+this.showTools}&#125;&nbsp;&nbsp;</span>}
          {this.propPadWide > -1 && <span><br />&nbsp;&nbsp;padWide=&#123;{this.propPadWide}&#125;&nbsp;&nbsp;</span>}
          {this.colHeaderHide && <span><br />&nbsp;&nbsp;colHeaderHide=&#123;{''+this.colHeaderHide}&#125;&nbsp;&nbsp;</span>}
          {this.styleHeader && <span><br />&nbsp;&nbsp;styleHeader=&#123;{this.styleHeader}&#125;</span>}
          {this.styleRowHeader && <span><br />&nbsp;&nbsp;styleRowHeader=&#123;{this.styleRowHeader}&#125;</span>}
          {this.styleInput && <span><br />&nbsp;&nbsp;styleInput=&#123;{this.styleInput}&#125;</span>}
          {this.styleCell && <span><br />&nbsp;&nbsp;styleCell=&#123;{this.styleCell}&#125;</span>}
          {this.formatDate && <span><br />&nbsp;&nbsp;formatDate=&#123;{this.formatDate}&#125;</span>}
          {this.formatTime && <span><br />&nbsp;&nbsp;formatTime=&#123;{this.formatTime}&#125;</span>}
          {this.columnList && <span><br />&nbsp;&nbsp;columnList=&#123;[{colListAsText}&nbsp;&nbsp;]&#125;</span>}          
          <br/>&nbsp;&nbsp;data=&#123;this.data&#125;
          <br/>&nbsp;&nbsp;onChange=&#123;(x,y,objKey,value)=&gt;&#123;&#125;&#125;&nbsp;&nbsp;
          {this.showTools && <span><br />&nbsp;&nbsp;onToolAction=&#123;(x,y,objKey,toolName)=&gt;&#123;&#125;&#125;&nbsp;&nbsp;</span>}
          <br />/&gt;
      </div>



    </div>


        </div>
    );
  }
}


export default DocUI;