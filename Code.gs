//var urlHome ="https://docs.google.com/spreadsheets/d/1Tc7tRf44JR3PDcTdxNn6_J753QVLfUkNZ-BAQFdEvfM/edit#gid=0"
//var urlTicketTrack="https://docs.google.com/spreadsheets/d/1AfjrEYmy8TFLqmm7WjgHlKo9TUlN-Jh6mUHw0SQY2MI/edit#gid=767510374"
//var urlReport="https://docs.google.com/spreadsheets/d/1EpVkoPhwMjHlipo-tUwCGFnyp5Gq58HWau8HolgwE_E/edit#gid=1584419962" 
//var urlProd="https://docs.google.com/spreadsheets/d/1cp94ygKmWaKlIoyiW0I7wTKpU-J_I495iQJ5RbWAy4g/edit#gid=791862536" //productivity matrix
//var urlLink="https://docs.google.com/spreadsheets/d/1yoyoS2JoIu9JlTC1nHhRuECYSJGZwxQGzI3wcApdFmM/edit?ts=5c5228df#gid=0" //ML links A:E
//var urlTask="" //agent task
//<-https://images.pexels.com/photos/370717/pexels-photo-370717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940->

//var Route = {};
//Route.path = function(route,callback){
//  Route[route] = callback;
//}

//function doGet(e) {
//  Route.path("success",loadHome);
//
//  if(Route[e.parameters.v]){
//    return Route[e.parameters.v]();
//  } else {
//    return render("login");
//  }
//}

var urlHome ="https://docs.google.com/spreadsheets/d/1Tc7tRf44JR3PDcTdxNn6_J753QVLfUkNZ-BAQFdEvfM/edit#gid=0"
var urlTicketTrack="https://docs.google.com/spreadsheets/d/1AfjrEYmy8TFLqmm7WjgHlKo9TUlN-Jh6mUHw0SQY2MI/edit#gid=1323708620"
var urlReport="https://docs.google.com/spreadsheets/d/1EpVkoPhwMjHlipo-tUwCGFnyp5Gq58HWau8HolgwE_E/edit#gid=1584419962"
var urlProd="https://docs.google.com/spreadsheets/d/1cp94ygKmWaKlIoyiW0I7wTKpU-J_I495iQJ5RbWAy4g/edit#gid=979318273"
var urlLink="https://docs.google.com/spreadsheets/d/1yoyoS2JoIu9JlTC1nHhRuECYSJGZwxQGzI3wcApdFmM/edit?ts=5c5228df#gid=0" //ML links A:E

function doGet(e){
  if(e.parameters.v==null){
    return render("login");
  }else{
    return loadHome(e.parameter.v);
  }
}


function loadHome(parameter){

  if(authen(parameter)==true){
  var d = SpreadsheetApp.openByUrl(urlHome).getSheetByName("Details").getRange("G2").getDisplayValue().toString();
    //match parameter with associate para file name for each data
    var voucher = QRgenerate();
    var QAscore = getQA(parameter);//getQA(parameter)
    var ticDat = getTic(d,parameter);//getTic(parameter)
    var ticGraph = graphTic(parameter);
    var report= getReport(parameter);
    return render("home",{user: parameter, voucher: voucher[0], QRurl: voucher[1], links: getLink(), score: QAscore, ticDat :ticDat, ticGraph: ticGraph, report: report })
  }else{
    return render("login");
  }
}

function test(){
  var d = SpreadsheetApp.openByUrl(urlHome).getSheetByName("Home").getRange("G2").getDisplayValue().toString();
  var date = new Date
Logger.log(Utilities.formatDate(date, 'Australia/Sydney', 'dd/MM/yyyy'))
}

















