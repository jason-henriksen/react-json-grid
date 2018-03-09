import React from 'react';
import { toJS,observable,action,computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';
import Grid from '../Grid';
import rrjsTool from 'really-relaxed-json';


import Toggle from './Toggle';
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
  
  @observable showTools = false;
  @action toggleTools() { this.showTools = !this.showTools; }

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

  @observable columnList = false;
  @action toggleColumnList() { this.columnList = !this.columnList; }



  @observable styleHeader = '';
  @action setHeaderStyle(evt) { this.styleHeader = evt.target.value; }
  @observable styleCell = '';
  @action setCellStyle(evt) { this.styleCell = evt.target.value; }
  @observable styleInput = '';
  @action setInputStyle(evt) { this.styleInput = evt.target.value; }



  @observable colDef = 
      [
        {  
          key: 'a', 
          title:'col A',
        editDisabled: '',

          widePct: '',
          widePx: '',

          easyBool:'',
          easyInt: '',
          easyFloat: '',
          easyMoney: '',
          easyDate: '',
          easyAltText: '',

          styleHeader: '',
          styleInput: '',          
          styleCell: '',
          
          compHeader: '',
          compInput: '',
          compCell: '',
        },       
        {
          key: 'b', 
          title: 'col B',
          editDisabled: '',

          widePct: '',
          widePx: '',

          easyBool: '',
          easyInt: '',
          easyFloat: '',
          easyMoney: '',
          easyDate: '',
          easyAltText: '',

          styleHeader: '',
          styleInput: '',
          styleCell: '',

          compHeader: '',
          compInput: '',
          compCell: '',
        },
        {
          key: 'c',
          title: 'col C',
          editDisabled: '',

          widePct: '',
          widePx: '',

          easyBool: '',
          easyInt: '',
          easyFloat: '',
          easyMoney: '',
          easyDate: '',
          easyAltText: '',

          styleHeader: '',
          styleInput: '',
          styleCell: '',

          compHeader: '',
          compInput: '',
          compCell: '',
        },
        {
          key: 'd',
          title: 'col D',
          editDisabled: '',

          widePct: '',
          widePx: '',

          easyBool: '',
          easyInt: '',
          easyFloat: '',
          easyMoney: '',
          easyDate: '',
          easyAltText: '',

          styleHeader: '',
          styleInput: '',
          styleCell: '',

          compHeader: '',
          compInput: '',
          compCell: '',
        }
    
                      ]
  @action setColDefValue(x, y, objKey, newValue) {
    console.log('changing def '+objKey+' ' +newValue);
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
    console.log(x,y,objKey,newValue);
    var cleanData = JSON.parse(this.rrjs.stringToJson(this.data));    
    cleanData[y][objKey]=newValue;
    this.data = JSON.stringify(cleanData);
  }

  @action setToolAction(x, y, objKey, tool) {
    // this is just for the test UI.  By making the "source of truth" the text file, i keep things in sync
    // cost is that I lose update performance for this test UI.  Try another test gui for perf testing.
    console.log(x, y, objKey, tool);
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
          <div style={{width:'450px',display:'inline-block',
                borderRight:'2px solid grey',verticalAlign:'top',overflowY:'scroll',height:'100%'}}>
            <div >
              <br/>Parameter UI<br/>
              <div style={{display:'inline-block',verticalAlign:'top',margin:'5px'}}>
                <Toggle action={this.toggleOutline} toggleValue={this.showOutline} label='Show test outline' help='Not grid related.  Just shows an outline around the container holding the Grid.' />
                <Toggle action={this.toggleColHeaderHide} toggleValue={this.colHeaderHide} label='colHeaderHide' help='hide/show column header.' />
                <Toggle action={this.togglePivotOn} toggleValue={this.pivotOn} label='pivotOn' help='pivot the data on a key.' />
                <Toggle action={this.toggleColumnList} toggleValue={this.columnList} label='columnList' help='define column info.' />
                <Toggle action={this.toggleTools} toggleValue={this.showTools} label='showTools' help='show button bar, validations, add/remove rows' />
                <NumWheel action={this.setBorderWidth} curValue={this.propBorderWide} label='borderWide' help='width of the border between cells' />
                <NumWheel action={this.setPadWidth} curValue={this.propPadWide} label='padWide' help='width of the padding inside each cell' />
                <NumWheel action={this.setRowHigh} curValue={this.propRowHigh} label='rowHigh' help='over-ride default row height' />
                <NumWheel action={this.setRowHeaderHigh} curValue={this.propRowHeaderHigh} label='colHeaderHigh' help='over-ride row header height' />
                <NumWheel action={this.setMinColWide} incr={5} curValue={this.propMinColWide} label='minColWide' help='forced minimum auto grid width.  Over-ridden by column properties.' />
                <NumWheel action={this.setGridWide} incr={100} curValue={this.propGridWide} label='gridWide' help={<div>Forced width of the grid.<br/>Not set by CSS because the number is needed for javascript calculations.</div>} />
                <NumWheel action={this.setGridHigh} incr={100} curValue={this.propGridHigh} label='gridHigh' help={<div>Forced height of the grid.<br/>Not set by CSS because the number is needed for javascript calculations.</div>} />
                <TextParam action={this.setHeaderStyle} curValue={this.styleHeader} label='styleHeader' help='style for header cells.  cannot control border or padding.' />
                <TextParam action={this.setInputStyle} curValue={this.styleInput} label='styleInput' help='style for default cells.  cannot control border or padding.' />
                <TextParam action={this.setCellStyle} curValue={this.styleCell} label='styleCell' help='style for default input cells.  cannot control border or padding.' />
              </div>
            </div>
          {this.columnList &&
          <div>
            <br/>Column Configuration<br/>
            <Grid 
              data={this.colDef} 
                columnList={[
                  { key: 'editDisabled', easyBool: true }, 
                  { key: 'easyBool', easyBool: true },
                  { key: 'easyInt', easyBool: true },
                  { key: 'easyFloat', easyBool: true },
                  { key: 'easyMoney', easyBool: true },
                  { key: 'easyDate', easyBool: true },
                  { key: 'easyMenu', easyBool: true },
                  { key: 'easyAltText'  },
                ]}
              pivotOn='title' 
              onChange={this.setColDefValue}
              gridHigh={600}
              gridWide={425}
            />
          </div>
          }
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

  <div style={{marginLeft:'30px',display:'inline-block'}}>
          <br />
          <br />
          <br />
      <Grid style={{outline:this.outlineCSS}}
        gridHigh={this.propGridHigh}
        gridWide={this.propGridWide}      
        styleHeader={this.jsonHeaderStyleObject}
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
        columnList={ this.columnList?this.colDef:null }
        showTools={this.showTools}
      />
      <br/>
      <br />
      <div style={{font:'20px monospace'}}>
          &lt;Grid
          {this.propGridWide > -1 && <span>&nbsp;&nbsp;gridWide=&#123;{this.propGridWide}&#125;&nbsp;&nbsp;</span>}
          {this.propGridHigh > -1 && <span>&nbsp;&nbsp;gridHigh=&#123;{this.propGridHigh}&#125;&nbsp;&nbsp;</span>}
          {this.propRowHigh > -1 && <span>&nbsp;&nbsp;rowHigh=&#123;{this.propRowHigh}&#125;&nbsp;&nbsp;</span>}
          {this.propRowHeaderHigh > -1 && <span>&nbsp;&nbsp;colHeaderHigh=&#123;{this.propRowHeaderHigh}&#125;&nbsp;&nbsp;</span>}
          {this.propBorderWide > -1 && <span>&nbsp;&nbsp;borderWide=&#123;{this.propBorderWide}&#125;&nbsp;&nbsp;</span>}
          {this.pivotOn && <span>&nbsp;&nbsp;pivotOn={ Object.keys( (this.dataAsObject.cleanData[0]||{a:5}) )[0] }&nbsp;&nbsp;</span>}
          {this.showTools && <span>&nbsp;&nbsp;showTools=&#123;{''+this.showTools}&#125;&nbsp;&nbsp;</span>}
          {this.propPadWide > -1 && <span>&nbsp;&nbsp;padWide=&#123;{this.propPadWide}&#125;&nbsp;&nbsp;</span>}
          {this.colHeaderHide && <span>&nbsp;&nbsp;colHeaderHide=&#123;{''+this.colHeaderHide}&#125;&nbsp;&nbsp;</span>}
          {this.styleHeader && <span><br />&nbsp;&nbsp;styleHeader=&#123;{this.styleHeader}&#125;</span>}
          {this.styleInput && <span><br />&nbsp;&nbsp;styleInput=&#123;{this.styleInput}&#125;</span>}
          {this.styleCell && <span><br />&nbsp;&nbsp;styleCell=&#123;{this.styleCell}&#125;</span>}
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