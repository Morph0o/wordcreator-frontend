let open = false
document.addEventListener('DOMContentLoaded',()=>{
    appendletter()
    wordtwopara()
    saveparagraph()
    fetchselect()
    selectchange()
    hide()
    let rain = document.querySelector("#center")
    rain.style.display = 'none'
})

function appendletter(){
    let addword = document.querySelector("#addletter")
    addword.addEventListener('click',renderletter)
}

function renderletter(){
   
    let x = Math.floor((Math.random() * 3) + 1)
    if(x === 3){
        fetch('http://localhost:3000/combos')
        .then(response => response.json())
        .then(letter => {
            let alpha = letter[Math.floor(Math.random()*letter.length)].content
          addletter(alpha)
        }) 
    }
    if (x === 2){
        fetch('http://localhost:3000/consonants')
        .then(response => response.json())
        .then(letter => {
            let alpha = letter[Math.floor(Math.random()*letter.length)].content
          addletter(alpha)
        })
    }if(x=== 1){
        fetch('http://localhost:3000/vowels')
        .then(response => response.json())
        .then(letter=>{
            let alpha = letter[Math.floor(Math.random()*letter.length)].content
            addletter(alpha)
        })
    }
}

function addletter(letter){
    let letterword = document.querySelector("#letterinput")
    letterword.value = letterword.value + letter
  
}

function wordtwopara(){
    let button = document.querySelector("#word")
    button.addEventListener('click',addparagraph)
}

function addparagraph(){
    let letterword = document.querySelector("#letterinput")
    let para = document.querySelector("#paragraph")
    para.value  = para.value + `${letterword.value}`
    letterword.value = " "
}
function saveparagraph(){
    let save = document.querySelector("#submit")
    save.addEventListener('click',savepara)
}
function savepara(){
    let para = document.querySelector("#paragraph")
    let text = para.value 

    fetch('http://localhost:3000/paragraphs',{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            user_id: 4,
            content: text
        })
    })
    .then(response => response.json())
    .then(para => renderselect(para))
    para.value = ""
    
}
function renderselect(para){
    let selectdiv = document.querySelector("#select")
    let option = document.createElement("option")
    option.innerText = para.content.slice(0,10) 
    option.value = para.id
    selectdiv.append(option)
    
}
function renderoption(event){

    let id = event.target.value
 
    fetch(`http://localhost:3000/paragraphs/${id}`)
    .then(response => response.json())
    .then(para => renderpara(para))
}

function selectchange(){
    let selectdiv = document.querySelector("#select")
    selectdiv.addEventListener('change',renderoption)
}

function renderpara(para){
    let paragraph = document.querySelector("#paragraph")
    paragraph.value = para.content
    debugger
}
function fetchselect(){
    fetch("http://localhost:3000/paragraphs")
    .then(response => response.json())
    .then(data => data.forEach(para => renderselect(para)))
}

function hide(){
    let rainbow = document.querySelector("#open")

    rainbow.addEventListener('click', welcome)
}

function welcome(){
    let rain = document.querySelector("#center")
     open = !open
        if (open) {
          rain.style.display = 'block'
        } else {
          rain.style.display = 'none'
        }
    }
