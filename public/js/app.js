console.log("client side javascript is loaded!")

// eg to fetch data and display it on console in js 
// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
//gets displayed in console of developers tools

//for waeather forecast js endpoint
// fetch('http://localhost:3000/weather?address=Mysore').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data)
//         }
//     })
// })

const weatherform=document.getElementById('myform')
const searchloc=document.getElementById('inputloc')
const msg1=document.getElementById('msg1')
const msg2=document.getElementById('msg2')
msg2.style.visibility='hidden'

//to add text to element selected
// msg1.textContent='from js'

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const loc=searchloc.value
    //add the fetch function here
    msg1.textContent="Loading...."
    msg2.style.visibility='visible'
    msg2.textContent=" "
    
    fetch(`http://localhost:3000/weather?address=${loc}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            // console.log(data.error)
            msg1.textContent=data.error
            msg2.style.visibility='visible'
            msg2.textContent=":("
        }
        else{
            // console.log(data.forecast,data.location,data.country,data.state,data.address)
            // const l=data.location+", "+data.country+", "+data.state+", "+data.address
            msg1.textContent=data.location
            msg2.style.visibility='visible'
            msg2.textContent=data.forecast
        }
    })
})

    console.log("Testing")
    console.log(loc)
})