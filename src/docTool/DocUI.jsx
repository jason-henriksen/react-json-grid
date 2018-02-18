import React from 'react';
import { toJS,observable,action,computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';
import Grid from '../index';
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
  
  @observable propBorderWide = -1;
  @action setBorderWidth(val) { this.propBorderWide = val; }

  @observable propPadWide = -1;
  @action setPadWidth(val) { this.propPadWide = val; }
  
  @observable propGridHigh = -1;
  @action setGridHigh(val) { this.propGridHigh = val; }

  @observable propRowHigh = -1;
  @action setRowHigh(val) { this.propRowHigh = val; }

  @observable propRowHeaderHigh = -1;
  @action setRowHeaderHigh(val) { this.propRowHeaderHigh = val; }

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

          easyBool:true,
          easyInt: '',
          easyMoney: '',
          easyDate: '',

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
          easyMoney: '',
          easyDate: '',

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
          easyMoney: '',
          easyDate: '',

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
          easyMoney: '',
          easyDate: '',

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

  @action setValue(x,y,objKey,newValue)
  {
    console.log(x,y,objKey,newValue);
    console.log(this.data[y]);
    // this is just for the test UI.  By making the "source of truth" the text file, i keep things in sync
    // cost is that I lose update performance for this test UI.  Try another test gui for perf testing.
    var cleanData = JSON.parse(this.rrjs.stringToJson(this.data));    
    cleanData[y][objKey]=newValue;
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

    console.log("render start");

    var colListAsText=[];
    for(var cctr=0;cctr<this.colDef.length;cctr++){
      colListAsText.push(<CompactObjView target={this.colDef[cctr]} key={JSON.stringify(this.colDef[cctr])}/>);
    }

    return (
        <div>
          <div style={{width:'40%',display:'inline-block',padding:'5px',verticalAlign:'top'}}>
          <h3>Parameter UI</h3>
          <Toggle action={this.toggleOutline} toggleValue={this.showOutline} label='Show test outline' help='Not grid related.  Just shows an outline around the container holding the Grid.' />
          <Toggle action={this.toggleColHeaderHide} toggleValue={this.colHeaderHide} label='colHeaderHide' help='hide/show column header.' />
          <Toggle action={this.togglePivotOn} toggleValue={this.pivotOn} label='pivotOn' help='pivot the data on a key.' />
          <Toggle action={this.toggleColumnList} toggleValue={this.columnList} label='columnList' help='define column info.' />
          <NumWheel action={this.setBorderWidth} curValue={this.propBorderWide} label='borderWide' help='width of the border between cells' />
          <NumWheel action={this.setPadWidth} curValue={this.propPadWide} label='padWide' help='width of the padding inside each cell' />
          <NumWheel action={this.setRowHigh} curValue={this.propRowHigh} label='rowHigh' help='over-ride default row height' />
          <NumWheel action={this.setRowHeaderHigh} curValue={this.propRowHeaderHigh} label='colHeaderHigh' help='over-ride row header height' />

          <TextParam action={this.setHeaderStyle} curValue={this.styleHeader} label='styleHeader' help='style for header cells.  cannot control border or padding.' />
          <TextParam action={this.setInputStyle} curValue={this.styleInput} label='styleInput' help='style for default cells.  cannot control border or padding.' />
          <TextParam action={this.setCellStyle} curValue={this.styleCell} label='styleCell' help='style for default input cells.  cannot control border or padding.' />
          <hr/>

          {this.columnList &&
          <div>
          <h3>Column Rules</h3>
          <Grid 
            data={this.colDef} 
            columnList={[ { key:'mayEdit',easyBool:true}]}
            pivotOn='title' 
            onChange={this.setColDefValue}
          />
          </div>
          }

        </div>

  <div style={{width:'50%',height:'300px',marginLeft:'10px',outline:this.outlineCSS,display:'inline-block'}}>
          <br />
          This Grid is contained in a div with a width of 50% and a height set to 300px.  <br />
      <Grid 
        styleHeader={this.jsonHeaderStyleObject}
        styleInput={this.jsonInputStyleObject}
        styleCell={this.jsonCellStyleObject}        
        rowHigh={this.propRowHigh}
        colHeaderHigh={this.propRowHeaderHigh}
        colHeaderHide={this.colHeaderHide}
        borderWide={this.propBorderWide}
        padWide={this.propPadWide}
        gridHigh={this.propGridHigh}
        data={this.dataAsObject.cleanData}
        onChange={this.setValue}
        pivotOn={ this.pivotOn?'b':null}
        columnList={ this.columnList?this.colDef:null }
      />
      <br/>

          <h3>Example Code</h3>
          &lt;Grid <br />
          {this.propRowHigh > -1 && <span>rowHigh=&#123;{this.propRowHigh}&#125;&nbsp;&nbsp;</span>}
          {this.propRowHeaderHigh > -1 && <span>colHeaderHigh=&#123;{this.propRowHeaderHigh}&#125;&nbsp;&nbsp;</span>}
          {this.propGridHigh > -1 && <span>gridHigh=&#123;{this.propGridHigh}&#125;&nbsp;&nbsp;</span>}
          {this.propBorderWide > -1 && <span>borderWide=&#123;{this.propBorderWide}&#125;&nbsp;&nbsp;</span>}
          {this.pivotOn && <span>pivotOn='b'&nbsp;&nbsp;</span>}
          {this.propPadWide > -1 && <span>padWide=&#123;{this.propPadWide}&#125;&nbsp;&nbsp;</span>}
          {this.colHeaderHide && <span>colHeaderHide=&#123;{this.colHeaderHide}&#125;&nbsp;&nbsp;</span>}
          {this.styleHeader && <span><br />styleHeader=&#123;{this.styleHeader}&#125;</span>}
          {this.styleInput && <span><br />styleInput=&#123;{this.styleInput}&#125;</span>}
          {this.styleCell && <span><br />styleCell=&#123;{this.styleCell}&#125;</span>}
          {this.columnList && <span><br />columnList=&#123;[{colListAsText}]&#125;</span>}          
          <br/>data=&#123;this.data&#125; <br />
/&gt;

          <h3>Example Data (this.data)</h3>
          <button onClick={this.makeS}>5 rows</button>
          <button onClick={this.makeM}>150 rows</button>
          <button onClick={this.makeL}>50K rows (slow build, fast render)</button>
          <span style={{ color: 'red' }}>{this.dataAsObject.dataErr}</span><br />
          <textarea style={{ width: '99%', height: '75px' }} onChange={this.updateData} value={this.data} />

    </div>


        </div>
    );
  }
}


export default DocUI;