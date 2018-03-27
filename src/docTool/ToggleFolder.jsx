import React from 'react';
import autoBind from 'react-autobind';
import FolderOpen from 'mdi-react/FolderOpenIcon';
import FolderClose from 'mdi-react/FolderIcon';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';



@observer class ToggleFolder extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  render() {    
  
    return (
    <div>      
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={this.props.action}>
        <div style={{verticalAlign:'middle',display: 'inline-block',fontSize:'22px',marginTop:'2px'}}  >
          {this.props.toggleValue?<FolderOpen/>:<FolderClose/>}
        </div>
          <div style={{ display: 'inline-block', minWidth: '175px',color:'black', font: '22px monospace', cursor: 'help', fontWeight: 'bold' }}>&nbsp;{this.props.label}</div>
      </div>
    </div >      
    );
  }
}


export default ToggleFolder;