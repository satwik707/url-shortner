
const weatherform=document.querySelector("form");
const location1=document.querySelector("input");
const messageOne=document.querySelector("#message-1");
const messageTwo=document.querySelector("#message-2");

weatherform.addEventListener('submit',(event)=>
{

    event.preventDefault();  //the default behavior is to refresh the page every time the event is fired .in order to prevent this behavior we use prevent default
    messageOne.textContent='Loading your short url ';
    messageTwo.textContent='';      
    fetch('/api/url/shorten').then((response)=>{
      
      
           response.json().then((data)=>
           {
               if(data.error)
               {
                   messageOne.textContent=data.error
               }
               else{
               messageOne.textContent=data.longUrl;
               messageTwo.textContent=data.shortUrl;
               }
                
           })
        
       


})
 
})