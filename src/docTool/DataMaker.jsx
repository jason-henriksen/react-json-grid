import autoBind from 'react-autobind';

class DataMaker
{
  

  constructor(updateDataFunction) { 
    autoBind(this); 
    this.updateDataText = updateDataFunction; //must be specificed by the owning object before these data makers are useful.
  }

  makeS() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<5;ctr++){res+='{r:'+(5-ctr)+',a:5,b:6,c:8,d:90},';}
    res = res.substring(0, res.length-1);res+=']';
    this.updateDataText(res);
  }
  makeM() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<150;ctr++){res+='{r:'+(150-ctr)+',a:5,b:6,c:8,d:90},';}
    res = res.substring(0, res.length-1);res+=']';
    this.updateDataText(res);
  }
  makeL() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<50000;ctr++){res+='{"r":'+(50000-ctr)+',"a":5,"b":6,"c":8,"d":90},';}
    res = res.substring(0, res.length-1);res+=']';
    this.updateDataText(res);
  }
  makeSA() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<5;ctr++){res+='[1'+ctr+','+(2*ctr)+',3,4,5],';}
    res = res.substring(0, res.length-1);res+=']';
    this.updateDataText(res);
  }  
  makeMA() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<150;ctr++){res+='[1'+ctr+','+(2*ctr)+',3,4,5],';}
    res = res.substring(0, res.length-1);res+=']';
    this.updateDataText(res);
  }  
  makeLA() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<50000;ctr++){res+='[1'+ctr+','+(2*ctr)+',3,4,5],';}
    res = res.substring(0, res.length-1);res+=']';
    this.updateDataText(res);
  }  
  makeAInt() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<50;ctr++){res+=ctr+','}
    res = res.substring(0, res.length-1);res+=']';
    this.updateDataText(res);
  }  
  makeAWords() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<25;ctr++){res+='"arnold","bernard","clementine","dolores",'}
    res = res.substring(0, res.length-1);res+=']';
    this.updateDataText(res);
  }  
  makeKVP() { 
    var res = "[";  // faster to generate strings
    for(var ctr=0;ctr<50;ctr++){res+='{a:"test '+ctr+'"},'}
    res = res.substring(0, res.length-1);res+=']';
    this.updateDataText(res);
  }  
  makeCSV() { 
    var res = "Col A,Col B,Col C,Col D,Col E\n" ;  // faster to generate strings
    for(var ctr=0;ctr<50;ctr++){res+='a '+ctr+',b '+(ctr*3)+',c,d,e\n'}
    this.updateDataText(res);
  }  
  makePSV() { 
    var res = "Col A|Col B|Col C|Col D|Col E\n" ;  // faster to generate strings
    for(var ctr=0;ctr<50;ctr++){res+='a '+ctr+'|b '+(ctr*3)+'|c|d|e\n'}
    this.updateDataText(res);
  }  
  makeKVE() { 
    var res = '' ;  // faster to generate strings
    for(var ctr=0;ctr<50;ctr++){res+=''+ctr.toString(16)+'='+ctr+'\n'}
    this.updateDataText(res);
  }  

    
  
  

}

export default DataMaker;