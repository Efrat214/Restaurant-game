

let modal = document.getElementById('id01');
const getData = (event) => {
    event.preventDefault();
    const form = event.target; // הטופס שלחצתי עליו
    const name = form.elements.uname.value;
    const level1=getlevel();
    console.log(name,level1);
    saveData(name,level1);
    open('../game/game.html'); // HTML פתיחת דף חדש של
};
const saveData = (name,level1) => {
    localStorage.setItem('username', name);
    localStorage.setItem('level', level1);
};

onload1 = () => {
  let btn=document.getElementById("btnEnter");
  btn.addEventListener('click', function () {
    document.getElementById('id01').style.display = 'block';
});
const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', function () {
    getData(event);
});
document.querySelector(".cancelbtn").addEventListener("click",
() => { document.querySelector('.modal').style.display = 'none'; });
}
const close = document.getElementById('close');
close.addEventListener('click', function () {
   
    document.getElementById("myNav").style.width = "0%";
});
function getlevel(){
  const radioButtons = document.querySelectorAll('input[name="level"]');
      let selectelevel;
      for (const radioButton of radioButtons) {
          if (radioButton.checked) {
              selectelevel = radioButton.id;
              break;
          }
      }
    // });
    return selectelevel;
}

