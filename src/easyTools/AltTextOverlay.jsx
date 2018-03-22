import React from 'react';
import autoBind from 'react-autobind';

import { observer } from 'mobx-react';


@observer class AltTextOverlay extends React.Component {
  constructor(props) { super(props); autoBind(this); }

  render() {
    if(this.props.GridStore.cursor.showAltX===-1 && this.props.GridStore.cursor.showAltY===-1){ return null;}
    var targetX=this.props.GridStore.cursor.showAltX;
    var targetY=this.props.GridStore.cursor.showAltY;
    var idx = targetY;
    if(-1===targetY){ idx=targetX; }

    var objKey = this.props.GridStore.keyList[idx];
    if(!this.props.GridStore.colDefListByKey[objKey]){return null;}
    var helpComp = this.props.GridStore.colDefListByKey[objKey].altText

    var offsetY = this.props.uiMath.colHeaderHigh + ( (this.props.uiMath.borderWide+this.props.uiMath.rowHighWithPad) * (targetY+1) )+2 ;
    var offsetX = this.props.uiMath.pivotRowHeaderWide || this.props.uiMath.autoColWide;

    return (
      <div style={{position:'absolute',top:offsetY+'px',left:+offsetX+'px',
                   backgroundColor:'black',color:'white',zIndex:'20',padding:'5px',zIndex:'50',
                   border:'1px solid black',
                   borderTopRightRadius:10,borderBottomRightRadius:10,borderBottomLeftRadius:10
                   }}>
        {helpComp}
      </div>
     );
  }

}


export default AltTextOverlay;