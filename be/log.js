import fs from 'fs';
const log = {
    debug: function(func,data){
        writeLog('debug',func,data);
    },
    info: function(func,data){
        writeLog('info',func,data);
    },
    warn: function(func,data){
        writeLog('warning',func,data);
    },
    error: function(func,data){
        writeLog('ERROR',func,data);
    }
}


function getTime(){
    var date=new Date();
    var h=date.getHours()<10?"0"+date.getHours():date.getHours();
    var m=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
    var s=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    var ms=date.getMilliseconds()<100?date.getMilliseconds()<10?"00"+date.getMilliseconds():"0"+date.getMilliseconds():date.getMilliseconds();
    var time=h+":"+m+":"+s+":"+ms;
    return time;
}
function writeLog(type,func,data){
    var time=getTime();
    if(typeof data!="string"){data=JSON.stringify(data);}
    if(func!=""){func="-"+func;}
    fs.appendFile('./'+type+'.log', time+"\t"+type+func+"\t"+type+".log"+"\t"+data+ '\n', 'utf-8', function(err){
        if (err) {
            return console.log(err);
        }
    })
    fs.appendFile('./main.log', time+"\t"+type+func+"\t"+type+".log"+"\t"+data+ '\n', 'utf-8', function(err){
        if (err) {
            return console.log(err);
        }
    })
}

export default log