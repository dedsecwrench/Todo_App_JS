window.onload = function(){
var show = document.getElementById("showww");
const addListBtn = document.getElementById("addBtn");
var back = document.getElementById("bcc");
var addText = document.getElementById("addtext");
var container = document.getElementById("contain");
container.style.flexWrap = "wrap";
container.style.rowGap = "30px";
container.style.paddingBottom = "30px";

const tasklist = [];
const list = [];
var id = 0;
var divid = 0;
var d_id=0;
var liID = 0;
var mid = 0;

function createList(){

      let addList = addText.value;
      let div = document.createElement("div");
      let h2 = document.createElement("h2");
      let hr = document.createElement("hr");
      let del = document.createElement("button");
      let plus = document.createElement("button");
      div.setAttribute("class","Div");
      div.id = d_id++;
      del.setAttribute("id","del");
      plus.setAttribute("id","plus");
      plus.setAttribute("data-toggle","modal");
      plus.setAttribute("data-target","#addItemModal");
      let innerDiv = document.createElement("div");
      innerDiv.setAttribute("class","inDiv");
      innerDiv.id = divid++;
      console.log("indiv = ",innerDiv.id);
      let ul = document.createElement("ul");
      ul.setAttribute("id","ulId");
      del.innerHTML = `<i class="fas fa-trash-alt"></i>`;
      plus.innerHTML = `<i class="fas fa-plus"></i>`;
      h2.innerText = `${addList}`;
      div.setAttribute("class","cards");
      h2.setAttribute("class","resize")
      h2.style.overflowWrap = "break-word";
      div.appendChild(h2);
      hr.setAttribute("class","hr_style");
      div.appendChild(hr);
      div.appendChild(innerDiv);
      innerDiv.style.height ="240px";
      innerDiv.style.overflow = "auto";
      innerDiv.style.padding = "3px";
      innerDiv.appendChild(ul);
      div.appendChild(del);
      div.appendChild(plus);
      container.prepend(div);
    
      let listObj = {
        id:id++,
        Div : div,
        taskName: h2.innerText,
        ind : innerDiv,
        indList : ul,
        delbtn: del,
        plus : plus
        };

        h2.addEventListener('click',()=>{
          console.log("head clicked");
        })
        
        tasklist.push(listObj);
        console.log(listObj);

      function resetForm(){
        $('.modal').on('hidden.bs.modal', function(){
            $(this).find('form')[0].reset();
        });
    }
    resetForm();   
}

function addItem(){
  let Ddiv = tasklist[tasklist.length-1].Div;
  let c = tasklist[tasklist.length-1].id;
  let idiv = tasklist[tasklist.length-1].ind;
  let delBtn = document.getElementById("del");
  let ul = document.getElementById("ulId");
  ul.style.listStyleType = "none";

      function create(){
        var ice = idiv.getAttribute("id");
        let c = tasklist[tasklist.length-1].id;

        if(c == ice){
          const itemText = document.getElementById("additemtext").value;
          let li = document.createElement("li");
          var markbtn = document.createElement("button");
          markbtn.setAttribute("class","mkbtn");
          markbtn.innerHTML = `<span id="mk-text"> mark done </span>`;
          li.setAttribute("class","li-id");
          li.id = "l" + mid++;
          li.innerHTML = `${itemText} &nbsp;`;
          li.appendChild(markbtn);
          ul.prepend(li);

          let lObj = {
            liID : liID++,
            li : li,
            mk : markbtn
          }
          
          list.push(lObj);
  
         var mkbtn = list[list.length-1].mk;
         mkbtn.addEventListener('click',(e)=>{
            let l = document.querySelector(".li-id");
            let il = l.getAttribute("id")
              let el = e.target;
              let cur = el.parentNode.parentNode;
              console.log(cur.id);
              let cur_id = cur.id;
              mkbtn.remove();
              $("#"+cur_id).removeClass("li-id");
              $("#"+cur_id).addClass("cut");
              });
      }
         
   }   
   let add = document.getElementById("additembtn");
   add.setAttribute("data-dismiss","modal");
   add.setAttribute("aria-label","Close");
   add.addEventListener("click",(e)=>{
      create();
       });

          function delDiv(){
           var d = Ddiv.getAttribute("id");
             if(d == c){
             Ddiv.remove();
             console.log("delete clicked");
             }
          }

   delBtn.addEventListener("click",()=>{
      delDiv();
   })
}

function singleDiv(){
  let top_con = document.querySelector(".container_1");
  let Ddiv = tasklist[tasklist.length-1].Div;
  let h = document.querySelector(".resize");
  let T_name = tasklist[tasklist.length-1].taskName;
  let c = tasklist[tasklist.length-1].id;
  let p = tasklist[tasklist.length-1].plus;
  let inn = document.querySelector(".inDiv");
  
    h.addEventListener('click',(e)=>{
      let d = Ddiv.getAttribute("id");
      if(d == c){
       let h1 = document.getElementById("h-one");
       top_con.style.visibility = "hidden"; 
       h1.style.setProperty("--color","1px solid white");
       h1.innerHTML = `${T_name}`;
       h1.style.visibility = "visible";
      
       back.innerHTML = `
       <div class="top_back"> 
       <button class="back_btn">
         <i class="fas fa-arrow-left"></i></button>
         &nbsp; Back
         </div>
       `;
       h1.after(back);

         let bck = document.querySelector(".back_btn");
         bck.addEventListener('click',()=>{
         top_con.style.visibility = "visible"; 
         let h1 = document.getElementById("h-one");
         let top = document.querySelector(".top_back");
         h1.style.visibility = "hidden";
         top.style.display = "none";

              let el = e.target;
              let cur = el.parentNode;
            $(cur).removeClass("center_card"); 
            $(cur).addClass("cards"); 
            $(cur.children[3]).show();
            p.style.position = "relative";
            p.style.left = "90px";
            $(".m_inDiv").addClass("inDiv");
            $(".inDiv").removeClass("m_inDiv");
            $(".cards").show();
         })
        let el = e.target;
        let cur = el.parentNode;
        $(".cards").not(cur).hide();
        $(cur).show();  
        $(cur).removeClass("cards"); 
        $(cur).addClass("center_card");
        $(cur.children[3]).hide();
        p.style.position = "relative";
        p.style.left = "180px";
        $(".inDiv").addClass("m_inDiv");
        $(".m_inDiv").removeClass("inDiv");
        
      }
    })
}

addListBtn.addEventListener('click',()=>{
    createList();
    addItem();
    singleDiv();
    noItem();
});

function noItem(){
  if(container.innerHTML !== ""){
    show.style.visibility = "hidden";
  }
}

}

