const plus=document.querySelector(".add")
const notes=document.querySelector(".window")
let flag=true;
var ticket_color_selector="green";


plus.addEventListener('click',function()
{
    
    
    if(flag)
        {
            plus.style.color="blue";
            notes.style.display="flex"
            flag=false;
        }
        else
        {
            plus.style.color="black";
            notes.style.display="none";
            flag=true;
        }
})

const note1=document.querySelector(".notes");
const body1=document.querySelector(".stick");
const main=document.querySelector(".body");
const textarea1=document.querySelector("#textarea");

function new_notes(ticket_color,user_text,taskid12)
{
   const ticket=document.createElement("div")
   ticket.setAttribute("class","note1")
   ticket.innerHTML=`
   
    <div class="notes">
    <div class="pad">
    <div class="ncolor" style="background-color: ${ticket_color};"></div>
    <div class="no">TaskId - ${taskid12}</div>
    <div class="text">${user_text} </div>
    <div class="lock">
        <i class="fa-solid fa-lock"></i>
    </div> 
    </div>
    </div>`

   removal(ticket);
   handlelock(ticket);
   body1.appendChild(ticket);
}

notes.addEventListener(`keydown`,function(e)
{
    if(e.key===`Enter`)
        {
            var user_input=textarea1.value;
            var taskid=shortid();
            new_notes(ticket_color_selector,user_input,taskid);
            textarea1.value=""
            notes.style.display="none";
        }
})

const allcolor=document.querySelectorAll(".color");

for(let i=0;i<allcolor.length;i++)
    {
        allcolor[i].addEventListener("click",()=>
        {
            for(let j=0;j<allcolor.length;j++)
                {
                    allcolor[j].classList.remove("active");
                    allcolor[j].style.borderColor = 'black';
                    allcolor[j].style.borderWidth='0.1px';
                }
           
           allcolor[i].classList.add("active");
           allcolor[i].style.borderColor = 'blue';
           allcolor[i].style.borderWidth='2.7px';
            ticket_color_selector=allcolor[i].classList[0];
           
        })
    }
const delbut = document.querySelector(".remove-btn")
var flag1=true;
delbut.addEventListener("click",()=>
{
    if(flag1)
        {
            alert("Delete Mode is Activate");
            delbut.style.color='red';
            flag1=false;
            

        }
        else{
            alert("Delete Mode is De-Activate");
            delbut.style.color="black";
            flag1="true";
        }
})

function removal (ticket)
{
    ticket.addEventListener('click',()=>
    {
        if(flag1==false)
            {
                ticket.remove()
            }
    })
}
function handlelock(ticket)
{
    const lock=ticket.querySelector(".lock")
    const lockicon=lock.children[0];
    const textarea2=ticket.querySelector(".text")
    lockicon.addEventListener("click",()=>
        {
            if(lockicon.classList.contains("fa-lock")) 
                {
                    lockicon.classList.remove("fa-lock")
                    lockicon.classList.add("fa-lock-open");
                    textarea2.setAttribute("contenteditable","true");
                } 
                else{
                    lockicon.classList.remove("fa-lock-open")
                    lockicon.classList.add("fa-lock");
                    textarea2.setAttribute("contenteditable","false")
                }
        })
}
