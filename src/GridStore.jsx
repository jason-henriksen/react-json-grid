import { observable, computed, action } from 'mobx';

class GridStore {           // Just a class.  Nothing fancy here.
  constructor() { 
    console.log('here');
  }

  @observable cursor = {x:0,y:0,
                        maxX:0,maxY:0,
                        selectToX:-1,selectToY:-1,
                        editX:-1,editY:-1,
                        shiftSelInProgress:false
                       };
  @observable selectedCells = [];
  @observable curEditingValue='';

  @action prepSelectionField(wide,high){
    console.log('prep selection');

    this.selectedCells = [high];
    for(var ctr=0;ctr<high;ctr++){
      this.selectedCells[ctr] = observable([wide]);
    }
    this.cursor.maxX = wide-1;
    this.cursor.maxY = high-1;
  }


  @action cellSelectSet(x,y,val){
    selectedCells[y][x]=val;
  }

  @action cellMoveKey(e)
  {
    // only worry about arrow keys:
      if(e.shiftKey){
        // was it already down?  if no, start a selection
        // note: google sheets does not allow 2 separate shift-cell-selections at a time.  It's one block+click collection , but not 2 blocks.
        if(!this.cursor.shiftSelInProgress){
          this.cursor.selectToX=this.cursor.x;
          this.cursor.selectToY=this.cursor.y;
          this.cursor.shiftSelInProgress=true;
        }
      }
      else{
        this.cursor.shiftSelInProgress = false;
      }
      if (e.keyCode == '38') {
        // up arrow
        this.cursor.y--;
        if (this.cursor.y < 0) this.cursor.y = 0;
      }
      else if (e.keyCode == '40') {
        // down arrow
        if (this.cursor.y < this.cursor.maxY) this.cursor.y++;
      }
      else if (e.keyCode == '37') {
        // left arrow
        this.cursor.x--;
        if (this.cursor.x < 0) this.cursor.x = 0;
      }
      else if (e.keyCode == '39') {
        // right arrow
        if (this.cursor.x < this.cursor.maxX) this.cursor.x++;
      }
      e.stopPropagation();
      e.preventDefault();    
  }

  @computed get selectionBounds(){
    var res={l:-1,r:-1,t:-1,b:-1};
    // block selection 
    if(this.cursor.shiftSelInProgress){
      res.l = Math.min(this.cursor.x, this.cursor.selectToX);
      res.r = Math.max(this.cursor.x, this.cursor.selectToX);
      res.t = Math.min(this.cursor.y, this.cursor.selectToY);
      res.b = Math.max(this.cursor.y, this.cursor.selectToY);
    }
    else{
      res.l = res.r = this.cursor.x;
      res.t = res.b = this.cursor.y;
    }
    // click selection

    return res;
  }

}

export default GridStore;


