import React from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';

import PlaylistRemoveIcon from 'mdi-react/PlaylistRemoveIcon';
import PlaylistPlusIcon from 'mdi-react/PlaylistPlusIcon';

import PackageUpIcon from 'mdi-react/PackageUpIcon';
import PackageDownIcon from 'mdi-react/PackageDownIcon';

import FirstIcon from 'mdi-react/ArrowCollapseLeftIcon';
import LeftIcon from 'mdi-react/ArrowLeftIcon';
import RightIcon from 'mdi-react/ArrowRightIcon';
import LastIcon from 'mdi-react/ArrowCollapseRightIcon';

import ReactTooltip from 'react-tooltip';



@observer class GridTools extends React.Component {
  constructor(props) { super(props); autoBind(this); }


  @observable curPage=1;

  @action addRow(){
    this.props.GridStore.onRowAdd(this.props.GridStore.cursor.x, this.props.GridStore.cursor.y, 
                                  this.props.GridStore.keyList[this.props.GridStore.cursor.x]);
  }
  @action cutRow() {
    this.props.GridStore.onRowCut(this.props.GridStore.cursor.x, this.props.GridStore.cursor.y,
                                  this.props.GridStore.keyList[this.props.GridStore.cursor.x]);
  }

  @action onImport(){this.props.GridStore.onImport()}
  @action onExport(){this.props.GridStore.onExport()}
  
  @action onPageFirst(){this.props.onGotoPage(0);}
  @action onPagePrev(){ this.curPage--; if(this.curPage<1){this.curPage=1;}; this.props.onGotoPage(this.curPage); }
  @action onPageNext(){ var maxPage = (this.props.pageCount||1); this.curPage++; if(this.curPage>=maxPage){this.curPage=maxPage;}; this.props.onGotoPage(this.curPage); }
  @action onPageLast(){ var maxPage = (this.props.pageCount||1); this.curPage=maxPage; this.props.onGotoPage(this.curPage);}

  @action onChange(evt){ 
    var tst = evt.target.value;  
    if(!evt.target.value){this.curPage='';return;} 
    this.curPage = (Number(tst)||1);
    if(this.curPage<0) this.curPage=1;
    if(this.curPage>(this.props.pageCount||1)){this.curPage=(this.props.pageCount||1)};
    this.props.onGotoPage(this.curPage)
  }

  render(){
    var ui = this.props.uiMath;
    if(this.props.editDisabled){
      return '';
    }
    
    return(          
        <div>      
          {this.props.showToolsAddCut &&
            <div style={{display:'inline-block',marginRight:'15px',minWidth:'95px'}}>
            <a data-tip data-for='btnAddRow'  style={{display:'inline-block'}}>
              <button onClick={this.addRow} className={this.props.toolsButtonClass} style={{boxSizing:'content-box',verticalAlign:'center',height:'24px',maxHeight:'24px'}}><PlaylistPlusIcon/></button>
              <ReactTooltip id='btnAddRow' place='bottom'>Add Row</ReactTooltip>
            </a>
            <a data-tip data-for='btnDelRow' style={{display:'inline-block'}}>
              <button onClick={this.cutRow} className={this.props.toolsButtonClass} style={{boxSizing:'content-box',verticalAlign:'center',height:'24px',maxHeight:'24px'}}><PlaylistRemoveIcon/></button>
              <ReactTooltip id='btnDelRow' place='bottom'>Delete Row</ReactTooltip>
            </a>
            </div>
          }
          {this.props.showToolsImpExp &&
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
              <a data-tip data-for='btnGridImport'>
                <button onClick={this.onImport} className={this.props.toolsButtonClass} style={{boxSizing:'content-box',verticalAlign:'center',height:'24px',maxHeight:'24px'}}><PackageUpIcon /></button>
                <ReactTooltip id='btnGridImport' place='bottom'>Replace Grid with Uploaded JSON</ReactTooltip>
              </a>
                <a data-tip data-for='btnGridExport'>
                <button onClick={this.onExport} className={this.props.toolsButtonClass} style={{boxSizing:'content-box',verticalAlign:'center',height:'24px',maxHeight:'24px'}}><PackageDownIcon /></button>
                <ReactTooltip id='btnGridExport' place='bottom'>Download Grid to JSON file</ReactTooltip>
              </a>
            </div>
          }
          {this.props.showToolsPage &&
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
              <a data-tip data-for='btnGridPageFirst'>
                  <button onClick={this.onPageFirst} className={this.props.toolsButtonClass} style={{boxSizing:'content-box',verticalAlign:'center',height:'24px',maxHeight:'24px'}}><FirstIcon /></button>
                  <ReactTooltip id='btnGridPageFirst' place='bottom'>Goto Page 1 of {(this.props.pageCount||1)}</ReactTooltip>
              </a>
              <a data-tip data-for='btnGridPagePrev'>
                  <button onClick={this.onPagePrev} className={this.props.toolsButtonClass} style={{boxSizing:'content-box',verticalAlign:'center',height:'24px',maxHeight:'24px'}}><LeftIcon /></button>
                  <ReactTooltip id='btnGridPagePrev' place='bottom'>Goto Page {Math.max(this.curPage-1,1)} of {(this.props.pageCount||1)}</ReactTooltip>
              </a>
              <input style={{ verticalAlign:'top',display: 'inline-block', minWidth: '40px', boxSizing:'content-box',maxWidth: '40px', height: '24px', textAlign: 'center' }} value={(this.curPage)} onChange={this.onChange} />
              <a data-tip data-for='btnGridPageNext'>
                  <button onClick={this.onPageNext} className={this.props.toolsButtonClass} style={{boxSizing:'content-box',verticalAlign:'center',height:'24px',maxHeight:'24px'}}><RightIcon /></button>
                  <ReactTooltip id='btnGridPageNext' place='bottom'>Goto Page {Math.min(this.curPage+1,((this.props.pageCount||1)))} of {(this.props.pageCount||1)}</ReactTooltip>
              </a>
              <a data-tip data-for='btnGridPageLast'>
                  <button onClick={this.onPageLast} className={this.props.toolsButtonClass} style={{boxSizing:'content-box',verticalAlign:'center',height:'24px',maxHeight:'24px'}}><LastIcon /></button>
                  <ReactTooltip id='btnGridPageLast' place='bottom'>Goto Page {(this.props.pageCount||1)} of {(this.props.pageCount||1)}</ReactTooltip>
              </a>
            </div>
          }
          {this.props.showToolsCustom &&
              <div style={{ display: 'inline-block', marginRight: '15px'}}>
                {this.props.showToolsCustom}
              </div>
          }
        </div>        
    );
  }
}

export default GridTools;