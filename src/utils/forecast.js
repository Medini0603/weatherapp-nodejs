const request=require('postman-request')
const apikey="I1tQAgLJa91zGJmyacMbjOHaZ0S8xLx6"

const forecast=(key,callback)=>{
    //in call back its (err,data)  so give undefined in appropriate places
    const url=`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apikey}`
    request({url:url,json:true},(err,resp)=>{
        if(err){
            callback("unable to connect to weather api!",undefined)
        }
        else if(resp.body.Code==="400"){
            callback("Location does not exist!",undefined)
        }

        else{
            weather=resp.body[0]
            callback(undefined,'Its currently '+weather.Temperature.Metric.Value+' degree celcius'+ ' and weather feels like '+weather.WeatherText)
        }
    })

}

module.exports=forecast