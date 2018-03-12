import React from 'react';
import autoBind from 'react-autobind';


class CompactObjView extends React.Component {
  constructor(props) { super(props); autoBind(this); }


  render() {
    var items=[];
    var keyList = Object.keys( this.props.target );
    for(var ctr=0;ctr<keyList.length;ctr++){
      if (this.props.target[keyList[ctr]]){
        items.push(<span key={keyList[ctr]}>{keyList[ctr] + "='" + this.props.target[keyList[ctr]]+"' "}</span>)
      }
    }

    return (
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&#123;{items}&#125;,</div>
    );
  }
}


export default CompactObjView;