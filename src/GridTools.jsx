import React from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';

import PlaylistRemoveIcon from 'mdi-react/PlaylistRemoveIcon';
import PlaylistPlusIcon from 'mdi-react/PlaylistPlusIcon';

import PackageUpIcon from 'mdi-react/PackageUpIcon';
import PackageDownIcon from 'mdi-react/PackageDownIcon';

import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';


@observer class GridTools extends React.Component {
  constructor(props) { super(props); autoBind(this); }


  @action addRow(){
    // JJHNOTE: pivot support needed.  Will reuse column add/cut when that is built.
    this.props.GridStore.onRowAdd(this.props.GridStore.cursor.x, this.props.GridStore.cursor.y, 
                                  this.props.GridStore.keyList[this.props.GridStore.cursor.x]);
  }
  @action cutRow() {
    // JJHNOTE: pivot support needed.  Will reuse column add/cut when that is built.
    this.props.GridStore.onRowCut(this.props.GridStore.cursor.x, this.props.GridStore.cursor.y,
                                  this.props.GridStore.keyList[this.props.GridStore.cursor.x]);
  }
  
  render(){
    var ui = this.props.uiMath;
    
    return(          
        <div>      
          {this.props.showToolsAddCut &&
            <div style={{display:'inline-block',marginRight:'15px'}}>
            <button onClick={this.addRow}><PlaylistPlusIcon/></button>
            <button onClick={this.cutRow}><PlaylistRemoveIcon/></button>
            </div>
          }
          {this.props.showToolsImpExp &&
              <div style={{ display: 'inline-block', marginRight: '15px' }}>
              <button onClick={this.addRow}><PackageUpIcon /></button>
              <button onClick={this.cutRow}><PackageDownIcon /></button>
              </div>
          }
          {this.props.showToolsPage &&
              <div style={{ display: 'inline-block', marginRight: '15px' }}>
                <button onClick={this.addRow}><ChevronLeftIcon /></button>
                <button onClick={this.addRow}><ChevronLeftIcon /></button>
                <input style={{ verticalAlign:'top',display: 'inline-block', minWidth: '40px', maxWidth: '40px', height: '26px', textAlign: 'center' }} value={(this.props.curPage || 0)} onChange={this.onChange} />
                <button onClick={this.cutRow}><ChevronRightIcon /></button>
                <button onClick={this.cutRow}><ChevronRightIcon /></button>
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