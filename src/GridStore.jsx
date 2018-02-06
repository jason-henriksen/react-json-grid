import { observable, computed, action } from 'mobx';

class GridStore {           // Just a class.  Nothing fancy here.
  constructor() { 
    console.log('here');
  }

  @observable cursor = {x:0,y:0};
}

export default GridStore;


