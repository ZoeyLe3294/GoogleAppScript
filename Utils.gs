function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


function render(file,argObject){
  var tmp = HtmlService.createTemplateFromFile(file);
  if(argObject){
    var keys = Object.keys(argObject);
    keys.forEach(function(key){
      tmp[key] = argObject[key];    
    })
    
  }
  return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function getScriptURL(href,qs) {
//qs="?v=success"
  Logger.log(href + qs);
  return url + qs ;
}
