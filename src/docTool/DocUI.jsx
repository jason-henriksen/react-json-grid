import React from 'react';
import { observable,action,computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';
import Grid from '../index';

import DataNoiseMed from '../../stories/dataNoiseMedium.js'
import DataNoiseSmall from '../../stories/dataNoiseSmall.js'
import DataNoiseGiant from '../../stories/dataNoiseGiant.js'


@observer class DocUI extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  @observable propBorderWide = -1;
  @action plusBorderWide() { this.propBorderWide++; } // account for rounding error
  @action lessBorderWide() { this.propBorderWide--; if(this.propBorderWide<-1) this.propBorderWide=-1 } // account for rounding error

  @action updateData(evt) { this.data = evt.target.value; console.log(this.data); }

  @action makeS() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<5;ctr++){res+='{"r":'+(5-ctr)+',"a":5,"b":6,"c":8,"d":90},';}
    res = res.substring(0, res.length-1);
    res+=']';
    this.data=res;
  }
  @action makeM() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<500;ctr++){res+='{"r":'+(500-ctr)+',"a":5,"b":6,"c":8,"d":90},';}
    res = res.substring(0, res.length-1);
    res+=']';
    this.data=res;
  }
  @action makeL() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<50000;ctr++){res+='{"r":'+(50000-ctr)+',"a":5,"b":6,"c":8,"d":90},';}
    res = res.substring(0, res.length-1);
    res+=']';
    this.data=res;
  }

  @observable data = DataNoiseSmall;

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



  render() {
    return (
        <div>
          <div style={{width:'30%',display:'inline-block',verticalAlign:'top'}}>
          <h3>Parameter UI</h3>
              <div style={{width:'25%',display:'inline-block'}}>borderWidth</div>
              <button onClick={this.lessBorderWide}>-1</button>
              <button onClick={this.plusBorderWide}>+1</button>&nbsp;
              {this.propBorderWide}
          </div>
          <div style={{width:'30%',display:'inline-block',verticalAlign:'top'}}>
          <h3>Example Code</h3>
&lt;Grid <br/>
  rowHeight=&#123;22&#125; <br/>
  rowHeaderHeight=&#123;35&#125; <br/>
  gridHeight=&#123;300&#125; <br/>
{this.propBorderWide > -1 &&  <span>borderWidth=&#123;{this.propBorderWide}&#125; <br/></span>}
  data=&#123;this.data&#125; <br/>
/&gt;
        </div>          
        <div style={{width:'30%',display:'inline-block',verticalAlign:'top'}}>
          <h3>Example Data (this.data)</h3>
          <button onClick={this.makeS}>5 rows</button><button onClick={this.makeM}>500 rows</button><button onClick={this.makeL}>50K rows (slow data build, fast render afterwards)</button>
          <span style={{color:'red'}}>{this.dataAsObject.dataErr}</span><br/>
          <textarea style={{width:'99%',height:'250px'}} onChange={this.updateData} value={this.data}/>
        </div>
        <br/>
        This Grid is contained in a div with a width of 50% and a height set to 300px.  
<div style={{width:'50%',height:'300px',outline:'2px green dashed'}}>
      <Grid 
        rowHeight={22}
        rowHeaderHeight={35}
        borderWidth={this.propBorderWide}
        data={this.dataAsObject.cleanData}
      />
    </div>


        </div>
    );
  }
}


export default DocUI;