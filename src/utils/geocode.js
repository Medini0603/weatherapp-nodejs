const request=require('postman-request')
const apikey="I1tQAgLJa91zGJmyacMbjOHaZ0S8xLx6"
const locationkey=(address,callback)=>{
    // encodeURIcomponent to encode address if it has special address
    const url=`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=`+encodeURIComponent(address)+`&offset=1`
    request({url:url,json:true},(err,resp)=>{
        if(err){
            // callback(data,error)----> this is the pattern we are using so use udefined in appropriate places
            callback('Unable to connect to location services!',undefined)
        }
        else if(resp.body.length===0){
            callback('Unable to connect to location,Try another search',undefined)
        }

        else{
            callback(undefined,{
                key: resp.body[0].Key,
                city:resp.body[0].EnglishName,
                country: resp.body[0].Country.EnglishName,
                state: resp.body[0].AdministrativeArea.EnglishName
            })
        }
    })
}

module.exports=locationkey