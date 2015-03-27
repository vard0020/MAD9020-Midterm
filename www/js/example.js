var app = {
  init: function(){
    document.querySelector("[data-role=listview]").addEventListener("click", app.edit);
    document.getElementById("btnCancel").addEventListener("click", app.cancel);
    document.getElementById("btnSave").addEventListener("click", app.save);
  },
  cancel: function(ev){
    document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
  },
  save: function(ev){
    document.querySelector("[data-role=modal]").style.display="none";
    document.querySelector("[data-role=overlay]").style.display="none";
  },
  edit: function(ev){
    ev.stopPropagation();
    
    document.querySelector("[data-role=modal]").style.display="block";
    document.querySelector("[data-role=overlay]").style.display="block";
    
    var item = ev.target.getAttribute("data-ref");
    var itemVal = ev.target.innerHTML;
    document.getElementById("list").value = item;
    /**************
    Or the really long labourious difficult confusing annoying wasting time way....
    for(var i=0; i< document.querySelectorAll("#list option").length; i++){
      if(document.querySelectorAll("#list option")[i].value == item){
        document.querySelectorAll("#list option")[i].setAttribute("selected", "selected");
      }else{
        document.querySelectorAll("#list option")[i].removeAttribute("selected");
      }
    }
    ****************/
    
    document.querySelector("[data-role=modal] h3").innerHTML = "Editing " + itemVal;
  }
}

document.addEventListener("DOMContentLoaded", app.init);
