//LOGIN - Authentification
function Security(userInfo){
  var ss = SpreadsheetApp.openByUrl(urlHome);
  var ws = ss.getSheetByName("Details");
  var data = ws.getRange(1,1,ws.getLastRow(),2).getValues();
  var userList = data.map(function(r){return r[0]})
  var passList = data.map(function(r){return r[1]})
  var position = userList.indexOf(userInfo.username);
  var check = false;
  if(position >-1 && (passList[position]== userInfo.password)){
      check = true;
      ws.getRange(position+1, 3).setValue(check);
  }
  
  var res = [check,userInfo.username]
  return res;
}

function authen(parameter){
  var ss = SpreadsheetApp.openByUrl(urlHome);
  var ws = ss.getSheetByName("Details");
  var data = ws.getRange(1,1,ws.getLastRow(),3).getValues();
  var userList = data.map(function(r){return r[0]})
  var authenList = data.map(function(r){return r[2]})
  var position = userList.indexOf(parameter.toString());
  ws.getRange(position+1, 3).clearContent();
  
  return authenList[position];
}

//HOMEPAGE
//QR
function QRgenerate(){
  var ss = SpreadsheetApp.openByUrl(urlHome);
  var ws = ss.getSheetByName("Home");
  var nric = ws.getRange("$B$3").getValue();
  var QRurl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + nric + '&amp;size=60x60';
  return [nric,QRurl];
}
//Announcement
//Update

//TICKET
//Add
function addTic(timestamp, ticketNum, file){
  var ss = SpreadsheetApp.openByUrl(urlTicketTrack);//CHANGE TO TICKET TRACKER - URLTICKET
  var ws = ss.getSheetByName(file);
  var row= ws.getLastRow()+1
  ws.getRange(row, 1).setValue(timestamp);
  ws.getRange(row, 2).setValue(ticketNum);
}

  function uniqueTic(ticketNum, file){
//  ticketNum="123"
//  file="z"
    var ss = SpreadsheetApp.openByUrl(urlTicketTrack);//CHANGE TO TICKET TRACKER - URLTICKET
    var ws = ss.getSheetByName(file);
    var ticketList = ws.getRange(2,2,ws.getLastRow(),1).getValues().map(function(r){return r[0]});
    return ticketList.indexOf(Number(ticketNum))
  }
//Delete
function deleteR(ticket,file){
  var ss = SpreadsheetApp.openByUrl(urlTicketTrack);//url=urlTicketTrack
  var ws = ss.getSheetByName(file);
  var ticketList = ws.getRange(2,2,ws.getLastRow(),1).getValues().map(function(r){return r[0]});
  var position;
//  ticket=[10,11,12];
  for(var i=0; i<ticket.length;i++){
    ws.deleteRow(ticketList.indexOf(Number(ticket[i]))+2)
    ticketList = ws.getRange(2,2,ws.getLastRow(),1).getValues().map(function(r){return r[0]});
  }
}

//Load
function getTic(date, user){
//  user="Minh Pham";
//  date = '22/08/2020'
  var ticDat={}
  
  //table data
  var trackerS = SpreadsheetApp.openByUrl(urlTicketTrack);
  var s = trackerS.getSheetByName(user);
  ticDat.table = s.getRange(2,1,s.getLastRow()-1,2).getDisplayValues().filter(function(item){return (item[0].toString()==date.toString())});
Logger.log(ticDat.table)
  return ticDat.table
}

//Graph data
function graphTic(user){
user="Jaspreet Kaur"
  //graph data
  var ticGraph={}
  var graphS = SpreadsheetApp.openByUrl(urlHome);
  var ws = graphS.getSheetByName("DATA");
  ticGraph.timeline = ws.getRange("M2").getDataRegion().getDisplayValues().filter(function(item){return (item[0]==user||item[0]=="Date")});//Graph area timeline ( [0]Date =Label + [1]TicNum =Data )
  
  var topName = ws.getRange(3,13,5,1).getValues().map(function(r){return r[0]});
  var topNum = ws.getRange(3,20,5,1).getValues().map(function(r){return r[0]});
  ticGraph.top=[topName,topNum]
  Logger.log(ticGraph)
  return ticGraph
}

//ML LINKS
function getLink(){
  var ss = SpreadsheetApp.openByUrl(urlHome);//url=ticketTrackerUrl
  var ws = ss.getSheetByName("Link");
  var links={}
  links.tool = ws.getRange("A2").getDataRegion().getValues();
  links.site = ws.getRange("D2").getDataRegion().getValues();
  links.guide = ws.getRange("G2").getDataRegion().getValues();
  return links;
}

//QA
function getQA(user){
//user="Minh Pham"
  var ss = SpreadsheetApp.openByUrl(urlHome);//url=ticketTrackerUrl
  var ws = ss.getSheetByName("DATA");
  var score='';

  var sscore = ws.getRange("A1").getDataRegion().getValues().filter(function(item){return item[0]==user});
  
for(var i=0;i<sscore.length;i++){
sscore[i].shift();
 score += ('<tr><td>'+sscore[i].join('</td><td>')+'</td></tr>')
}
console.log(score)
  return score;
}

//MONTHLY REPORT
function getReport(user){
//user="Minh Pham";
  var report={}
  var sheet = SpreadsheetApp.openByUrl(urlHome);
  
  //attendance data
  var reportS = SpreadsheetApp.openByUrl(urlReport);
  var attendanceS = reportS.getSheetByName("Attendance");
  var attendance = attendanceS.getRange(2,1,attendanceS.getLastRow()-1,13).getDisplayValues().filter(function(item){return (item[0]==user)});
  attendance[0].shift();
  report.attendance = attendance[0];
  
  //qa data
  var qaS = sheet.getSheetByName("QA-DATA");
  var qaV = qaS.getRange(3,1,qaS.getLastRow()-2,13).getDisplayValues().filter(function(item){return (item[0]==user)})
  var qaC = qaS.getRange(3,14,qaS.getLastRow()-2,13).getDisplayValues().filter(function(item){return (item[0]==user)})
  var qaE = qaS.getRange(3,27,qaS.getLastRow()-2,13).getDisplayValues().filter(function(item){return (item[0]==user)})
  qaV[0].shift();
  qaC[0].shift();
  qaE[0].shift();
  report.qa = [qaV[0],qaC[0],qaE[0]]
  
  //productivity data
  var proS = sheet.getSheetByName("TICKET-DATA");
  var touches = proS.getRange(2,1,proS.getLastRow()-1,14).getValues().filter(function(item){return (item[0]==user&&item[1]=="Touches")})
  var solved = proS.getRange(2,1,proS.getLastRow()-1,14).getValues().filter(function(item){return (item[0]==user&&item[1]=="Solved")})
  touches[0].shift()
  touches[0].shift()
  solved[0].shift()
  solved[0].shift()
  report.ticket = [touches[0],solved[0]]
  
  //csat data
  var csatS = sheet.getSheetByName("CSAT-DATA");
  var csatV = csatS.getRange(3,1,csatS.getLastRow()-2,13).getDisplayValues().filter(function(item){return (item[0]==user)});
  var csatC = csatS.getRange(3,14,csatS.getLastRow()-2,13).getDisplayValues().filter(function(item){return (item[0]==user)});
  csatV[0].shift();
  csatC[0].shift();
  report.csat = [csatV[0],csatC[0]]
  Logger.log(report)
  return report;
}








