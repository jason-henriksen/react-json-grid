import React from 'react';
import { observable,action,computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';
import Grid from '../index';


import Toggle from './Toggle';
import NumWheel from './NumWheel';

import DataNoiseMed from '../../stories/dataNoiseMedium.js'
import DataNoiseSmall from '../../stories/dataNoiseSmall.js'
import DataNoiseGiant from '../../stories/dataNoiseGiant.js'


@observer class DocUI extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  @observable showOutline = false;
  @action toggleOutline() { this.showOutline = !this.showOutline; }
  
  @observable propBorderWide = -1;
  @action setBorderWidth(val) { this.propBorderWide = val; }

  @observable propGridHigh = -1;
  @action setGridHigh(val) { this.propGridHigh = val; }

  @observable propRowHigh = -1;
  @action setRowHigh(val) { this.propRowHigh = val; }

  @observable propRowHeaderHigh = -1;
  @action setRowHeaderHigh(val) { this.propRowHeaderHigh = val; }

  @observable colHeaderHide = false;
  @action toggleColHeaderHide() { this.colHeaderHide = !this.colHeaderHide; }
  

  @observable data = DataNoiseSmall;
  @action updateData(evt) { this.data = evt.target.value; console.log(this.data); }
  @action makeS() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<5;ctr++){res+='{"r":'+(5-ctr)+',"a":5,"b":6,"c":8,"d":90},';}
    res = res.substring(0, res.length-1);res+=']';this.data=res;
  }
  @action makeM() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<500;ctr++){res+='{"r":'+(500-ctr)+',"a":5,"b":6,"c":8,"d":90},';}
    res = res.substring(0, res.length-1);res+=']';this.data=res;
  }
  @action makeL() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<50000;ctr++){res+='{"r":'+(50000-ctr)+',"a":5,"b":6,"c":8,"d":90},';}
    res = res.substring(0, res.length-1);res+=']';this.data=res;
  }


  @observable curParamHelp = "";

  @computed get dataAsObject(){
    var res={};
    res.cleanData=[];
    res.dataErr="";
    try {
        res.cleanData = JSON.parse(this.data);
        if (res.cleanData && typeof res.cleanData === "object") { res.dataErr="";}
        else{res.cleanData=[];res.dataErr="Invalid JSON."}
    }
    catch (e) { res.dataErr="Invalid JSON.  Keys and values need to be in quotes.";  console.log(e);}
    return res;
  };  

  @computed get outlineCSS() {
    if (this.showOutline) { return '2px green dashed';}
    else{return '';}
  }




  render() {
    return (
        <div>
          <div style={{width:'30%',display:'inline-block',padding:'5px',verticalAlign:'top'}}>
          <h3>Parameter UI</h3>
          <Toggle action={this.toggleOutline} toggleValue={this.showOutline} label='Show test outline' help='Not grid related.  Just shows an outline around the container holding the Grid.' />
          <Toggle action={this.toggleColHeaderHide} toggleValue={this.colHeaderHide} label='colHeaderHide' help='hide/show column header.' />
          <NumWheel action={this.setBorderWidth} curValue={this.propBorderWide} label='borderWide' help='width of the border between cells' />
          <NumWheel action={this.setGridHigh} incr={100} curValue={this.propGridHigh} label='gridHeight' help='over-ride default grid height' />
          <NumWheel action={this.setRowHigh} curValue={this.propRowHigh} label='rowHeight' help='over-ride default row height' />
          <NumWheel action={this.setRowHeaderHigh} curValue={this.propRowHeaderHigh} label='colHeaderHeight' help='over-ride row header height' />
          <hr/>
              

          </div>
          <div style={{width:'30%',display:'inline-block',verticalAlign:'top'}}>
          <h3>Example Code</h3>
&lt;Grid <br/>
{this.propRowHigh > -1 && <span>rowHeight=&#123;{this.propRowHigh}&#125; <br /></span>}
{this.propRowHeaderHigh > -1 && <span>colHeaderHeight=&#123;{this.propRowHeaderHigh}&#125; <br /></span>}
{this.propGridHigh > -1 && <span>gridHeight=&#123;{this.propGridHigh}&#125;<br /></span>}
{this.propBorderWide > -1 && <span>borderWidth=&#123;{this.propBorderWide}&#125;<br/></span>}
  data=&#123;this.data&#125; <br/>
/&gt;
        </div>          
        <div style={{width:'30%',display:'inline-block',verticalAlign:'top'}}>
          <h3>Example Data (this.data)</h3>
          <button onClick={this.makeS}>5 rows</button><button onClick={this.makeM}>500 rows</button><button onClick={this.makeL}>50K rows (slow build, fast render)</button>
          <span style={{color:'red'}}>{this.dataAsObject.dataErr}</span><br/>
          <textarea style={{width:'99%',height:'150px'}} onChange={this.updateData} value={this.data}/>
        </div>
        <br/>
        This Grid is contained in a div with a width of 50% and a height set to 300px.  
<div style={{width:'50%',height:'300px',outline:this.outlineCSS}}>
      <Grid 
        rowHeight={this.propRowHigh}
        colHeaderHeight={this.propRowHeaderHigh}
        colHeaderHide={this.colHeaderHide}
        borderWidth={this.propBorderWide}
        gridHeight={this.propGridHigh}
        data={this.dataAsObject.cleanData}
      />
    </div>


        </div>
    );
  }
}


export default DocUI;