import React from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';
import ReactTooltip from 'react-tooltip';
import isEmpty from './util/isEmpty';



@observer class GridHeader extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  render(){

    var header=[];
    var marginOffset=0;
    var ui = this.props.uiMath;


    
    if (!this.props.colHeaderHide && !ui.forceColHeaderHide) {     // provide a header row.
      for(var ctr=0;ctr<ui.colHeaderKeyList.length;ctr++){

        var keyName = ui.colHeaderKeyList[ctr]; // what key am I on?
        var colTitle = keyName;
        var curColWide=ui.autoColWide;
        var gridColLocalStyle={};
        var helpComp=null;
        if(this.props.GridStore.colDefListByKey[keyName]){ // is there a colDef that uses this key?
          if (this.props.pivotOn || this.props.pivotOn === 0) {
            //== Pivot, With ColDefs
            if(ctr>0){
              if (this.props.GridStore.colDefListByKey[ this.props.GridStore.keyList[ctr-1] ].altText) { 
                helpComp = this.props.GridStore.colDefListByKey[ this.props.GridStore.keyList[ctr-1] ].altText; 
              }
            }
            var targetCol = 0;
            for (var tctr = 0; tctr < ui.colHeaderKeyList.length; tctr++) {
              if (''+ui.colHeaderKeyList[tctr] === ''+this.props.pivotOn) { targetCol = tctr; }// this is the header index matching the pivotOn key, offset by 1 due to leading '/'
            }
            colTitle = ''+this.props.GridStore.getDataRespectingPivotAtLocation(this.props.data, ctr - 1, targetCol - 1);// both -1 are to account for the '/' in the header row.
//            console.log(ctr, targetCol,colTitle);
          }
          else{
            //== NonPivot, With ColDefs
            gridColLocalStyle = (this.props.GridStore.colDefListByKey[keyName].styleHeader || {});
            if (this.props.GridStore.colDefListByKey[keyName].widePx) {        // width by px
              curColWide = this.props.GridStore.colDefListByKey[keyName].widePx;
            }
            else if (this.props.GridStore.colDefListByKey[keyName].widePct) {  // width by pct
              curColWide = ui.rowWide * (this.props.GridStore.colDefListByKey[keyName].widePct / 100);
            }

            colTitle = ''+this.props.GridStore.colDefListByKey[keyName].title || keyName; // if there is a title for the colDef use it, or just stick with thekey
            if (this.props.GridStore.colDefListByKey[keyName].altText) { 
              // handle alt text.  Note that the 'text' could be a component.  regular header
              helpComp = this.props.GridStore.colDefListByKey[keyName].altText; 
            }
          }
        }
        else{ 
          if (this.props.pivotOn || this.props.pivotOn === 0) {
            // no column defs, Pivot On
            if(ctr>=0){
              // find the index of the colDefListByKey item for the pivotOn target:
              var targetCol=0;
              for(var tctr=0;tctr<ui.colHeaderKeyList.length;tctr++){
                if(ui.colHeaderKeyList[tctr]===''+this.props.pivotOn){ // string conversion so that array indexes match
                  targetCol = tctr; // this is the header index matching the pivotOn key, offset by 1 due to leading '/'
                }
              }
              colTitle = ''+this.props.GridStore.getDataRespectingPivotAtLocation(this.props.data,ctr-1,targetCol-1);// both -1 are to account for the '/' in the header row.
            }
          }
          else{
            // no column defs, Pivot OFF
            if (this.props.GridStore.colDefListByKey && this.props.GridStore.colDefListByKey[keyName] && this.props.GridStore.colDefListByKey[keyName].altText) { 
              helpComp = this.props.GridStore.colDefListByKey[keyName].altText; 
            }
          }
        }

        // NOTE: check for header components here.
        if (ctr === 0 && (this.props.pivotOn || this.props.pivotOn === 0) && ui.pivotRowHeaderWide) {
          curColWide = Number(ui.pivotRowHeaderWide);
        }

        var classNameHeaderColData='';
        var classNameHeaderColCell='';
        if(this.props.GridStore.colDefListByKey && this.props.GridStore.colDefListByKey[keyName]){
          if(this.props.GridStore.colDefListByKey[keyName].forceColWide){
            curColWide = this.props.GridStore.colDefListByKey[keyName].forceColWide;
          }
          if(!this.props.pivotOn && this.props.pivotOn!==0){
            classNameHeaderColData = this.props.GridStore.colDefListByKey[keyName].classHeaderData||'';
            classNameHeaderColCell = this.props.GridStore.colDefListByKey[keyName].classHeaderCell||'';
          }
        }

        var defaultStyleCell ={};
        if(isEmpty(this.props.GridStore.styleHeaderCell) && isEmpty(this.props.GridStore.classHeaderCell)){
          defaultStyleCell = {backgroundColor: '#F3F3F3',textAlign:'center'};
        }        
        defaultStyleCell= {...defaultStyleCell,...this.props.GridStore.styleHeaderCell};

        header.push(  
          <a data-tip data-for={'dataTip' + ctr} key={ctr}              // default, may be over ridden by styleHeader. Order matters.
          >
                        <div  key={'k'+ctr}  className={this.props.GridStore.classHeaderCell+' '+classNameHeaderColCell}
                          style={{
                            ...defaultStyleCell,            // user specified global header styles.
                            ...gridColLocalStyle,           // user specified per-column header styles.
                            width: curColWide+'px',              // everything from here down cannot be over-ridden by the user.
                            maxWidth: curColWide + 'px',           // everything from here down cannot be over-ridden by the user.
                            minWidth: curColWide + 'px',           // everything from here down cannot be over-ridden by the user.
                            borderStyle: 'solid',
                            borderWidth:ui.borderWide,
                            padding: ui.padWide+'px',
                            display:'inline-block', 
                            marginLeft:marginOffset,
                            overflow:'hidden',
                            boxSizing: 'content-box',
                            height:ui.colHeaderHigh+'px',
                            maxHeight:ui.colHeaderHigh+'px'}}>
                          <div className={this.props.GridStore.classHeaderData+' '+classNameHeaderColData} style={this.props.GridStore.styleHeaderData}>
                          {colTitle}
                          </div>
                          { helpComp &&  // only render this if helpComp is defined
                            <ReactTooltip id={'dataTip' + ctr} >
                              {helpComp}
                            </ReactTooltip>
                          }
                        </div>
                      </a>);
        marginOffset=-1*ui.borderWide;
      }
    }
    else{  // header is hidden so provide a top border line.  The 2x borderWide extra width is needed because this is a top only border
      if(!ui.forceColHeaderHide){
        header.push(<div style={{
          key:'headerLine',
          ...this.props.styleHeader,
          width: ui.rowWide + (2 * ui.borderWide),
          minWidth: ui.rowWide + (2 * ui.borderWide),
          width: ui.rowWide + (2 * ui.borderWide),
          borderTopStyle: 'solid', borderTopWidth: ui.borderWide, height: '0px' }} />);
      }
    }
  
    return(          
      <div style={{padding:'0px',margin:'0px',maxHeight:''+ui.headerUsage+'px',minHeight:''+ui.headerUsage+'px',height:''+ui.headerUsage+'px'}}>
        {header}
      </div>
    );
  }
}

export default GridHeader;