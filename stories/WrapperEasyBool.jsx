import React from 'react';
import { toJS,observable,action,computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBind from 'react-autobind';

import EasyBool from '../src/easyTools/EasyBool';


@observer class WrapperEasyBool extends React.Component {
  constructor(props) { 
    super(props); autoBind(this); 
  }

  @observable showOutline = false;
  @action toggleOutline() { this.showOutline = !this.showOutline; }

  render(){
    return( <div><EasyBool onChange={this.toggleOutline} cellData={this.showOutline} {...this.props}/></div> );
  }

}  

export default WrapperEasyBool;