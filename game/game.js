
let copyArr = [];
let indexRand;
let countOrder = 0;
let timing = 35;
let item;
let flagAudio = false;
let flagWrong = true;
const game = {

     nameUser: localStorage.username,
     selectedLevel: localStorage.level,
     countSuccssesScreen: 0,
     countScreen: 0,
     score: 0,
     newMax: false,
     prevMax: localStorage.maxScore,
     prevName: localStorage.username,

     fastfood: [
          { src: '../images/game/food/drinks/cold-drink.png', id: "1", data: "drinks" },
          { src: '../images/game/food/drinks/drink.png', id: "2", data: "drinks" },
          { src: '../images/game/food/drinks/frappe.png', id: "3", data: "drinks" },
          { src: '../images/game/food/drinks/ice-coffee.png', id: "4", data: "drinks" },
          { src: '../images/game/food/drinks/juice.png', id: "5", data: "drinks" },
          { src: '../images/game/food/drinks/orange-juice.png', id: "6", data: "drinks" },
          { src: '../images/game/food/drinks/smoothie.png', id: "7", data: "drinks" },
          { src: '../images/game/food/drinks/soda.png', id: "8", data: "drinks" },
          { src: '../images/game/food/drinks/water.png', id: "9", data: "drinks" },
          { src: '../images/game/food/fastfood/burger.png', id: "10", data: "fastfood" },
          { src: '../images/game/food/fastfood/burrito.png', id: "11", data: "fastfood" },
          { src: '../images/game/food/fastfood/churros.png', id: "12", data: "fastfood" },
          { src: '../images/game/food/fastfood/cuban-sandwich.png', id: "13", data: "fastfood" },
          { src: '../images/game/food/fastfood/french-fries.png', id: "14", data: "fastfood" },
          { src: '../images/game/food/fastfood/hot-dog.png', id: "15", data: "fastfood" },
          { src: '../images/game/food/fastfood/tacos.png', id: "16", data: "fastfood" },
          { src: '../images/game/food/drinks/smoothie.png', id: "17", data: "drinks" },
          { src: '../images/game/food/drinks/soda.png', id: "18", data: "drinks" },
          { src: '../images/game/food/drinks/water.png', id: "19", data: "drinks" },
          { src: '../images/game/food/cakes/cake-pop.png', id: "20", data: "cakes" },
          { src: '../images/game/food/cakes/cake-pop1.png', id: "21", data: "cakes" },
          { src: '../images/game/food/cakes/cake.png', id: "22", data: "cakes" },
          { src: '../images/game/food/cakes/cake1.png', id: "23", data: "cakes" },
          { src: '../images/game/food/cakes/cake2.png', id: "24", data: "cakes" },
          { src: '../images/game/food/cakes/cake3.png', id: "25", data: "cakes" },
          { src: '../images/game/food/cakes/donut.png', id: "26", data: "cakes" },
          { src: '../images/game/food/cakes/heart-cake.png', id: "27", data: "cakes" },
          { src: '../images/game/food/cakes/parfait.png', id: "28", data: "cakes" },
          { src: '../images/game/food/cakes/pavlova.png', id: "29", data: "cakes" },
     ],
     background: [
          { src: '../images/game/background/burger.png', id: "30" },
          { src: '../images/game/background/burger2.png', id: "31" },
     ],



     removeItems: function () {
          let amount = document.getElementById("orderItemDiv").childNodes.length;
          if (amount === 0)
               return 0;
          else {
               for (let a = amount; a > 0; a--) {
                    let tablet = document.getElementById("orderItemDiv").childNodes[a - 1];
                    tablet.remove();
               }
          }
     },
     removeOrder1: function () {

          //let item= document.getElementsByClassName('order')[0];
          game.removeItems();
          item = document.getElementById('screenDiv');
          item.childNodes[1].remove();
          if (flagWrong) {
               document.getElementById("worng").play();
          }
          this.countScreen++;
          if (this.countScreen === 3)
               game.gameOver();
     },

     //הפונקציה מפעילה את הטיימר
     timer: function () {
          timing = this.initTiming(game.selectedLevel);
          var elem = document.getElementById("myAnimation");
          var pos = 1;
          id = setInterval(frame, timing);
          function frame() {
               if (pos === timing - 1) {
                    document.getElementById("myAnimation").style.borderBottomRightRadius = '2px';
                    document.getElementById("myAnimation").style.borderTopRightRadius = '2px';
               }
               if (pos >= 0.75 * (timing))

                    document.getElementById('container').style.backgroundColor = "#ED1F24";
               if (pos >= timing) {
                    game.removeOrder1();
                    document.getElementById('myContainer').style.opacity = "0%";
                    clearInterval(id);
                    flagAudio = false;
               }
               else {
                    pos += 0.1;
                    elem.style.width = pos + '%';
               }
          }
     },


     initTiming: function (selectedLevel) {
          if (selectedLevel === 1)
               return 45;
          else
               if (selectedLevel === 2)
                    return 35;
               else
                    return 25;


     },
     temp: [],
     createFrizer: function () {
          let len = this.fastfood.length;
          copyArr = this.fastfood;
          let frizer = document.createElement('div');
          frizer.id = 'mat';
          for (let i = 0; i < 3; i++) {
               let shelf = document.createElement('div');
               shelf.id = 'shelf';
               for (let j = 0; j < 3; j++) {
                    do {
                         indexRand = this.randIndex(len);
                    } while (((copyArr[indexRand].src === "") && this.selectedLevel != 1) || (!this.isValidEasy(j, indexRand) || (copyArr[indexRand].src === "")));
                    let food = document.createElement('div');
                    let foodImg = document.createElement('img');
                    foodImg.src = copyArr[indexRand].src;
                    foodImg.id = copyArr[indexRand].id;
                    copyArr[indexRand].src = "";
                    this.temp[i + j] = foodImg;
                    food.append(foodImg);
                    // food.id=foodImg.code;
                    food.className = 'item';
                    food.draggable = true;
                    food.addEventListener("dragstart", drag = (ev) => {
                         ev.dataTransfer.setData("id", ev.target.id);
                    });
                    shelf.append(food);
               }
               frizer.append(shelf);
          }
          document.getElementsByClassName("shelfImg")[0].appendChild(frizer);
     },
     createOrder: function () {
          flagAudio = false;
          let count = 3;
          let len = this.temp.length;
          let screen = document.createElement('img');
          screen.src = '../images/game/tablet.png'
          let order = document.createElement('div');
          order.append(screen);
          order.className = 'order';
          order.id = "tabletScreen"
          let orderItemDiv = document.createElement('div');
          orderItemDiv.id = "orderItemDiv";
          for (let i = 0; i < 3; i++) {
               countOrder++;
               let orderItem = document.createElement('div');
               orderItem.className = "orderItem";
               let orderFood = document.createElement('img');
               let index = this.randIndex(len);
               orderFood.id = this.temp[index].id;
               orderFood.src = this.temp[index].src;
               orderFood.index = i;
               orderItem.id = this.temp[index].id;
               orderItem.append(orderFood);
               orderItem.addEventListener("dragover", (ev) => {
                    ev.preventDefault();
               });
               orderItem.addEventListener("drop", (ev) => {
                    ev.preventDefault();
                    if (ev.target.id === ev.dataTransfer.getData("id")) {
                         let tablet = document.getElementById("orderItemDiv").childNodes[ev.target.index];
                         tablet.firstChild.remove();
                         this.score += 3;
                         //alert(this.score)
                         countOrder--;
                         if (countOrder === 0) {
                              document.getElementById('myContainer').style.opacity = "0%";
                              item = document.getElementById('screenDiv');
                              item.style.opacity = "0%";
                              this.score += 10;
                              this.countSuccssesScreen++;
                              flagAudio = false;
                              document.getElementById("good").play();
                              flagWrong = false;

                         }
                         let points = document.getElementById("score");
                         points.textContent = this.score;
                    }
               });
               orderItemDiv.append(orderItem);
          }
          order.append(orderItemDiv);
          document.getElementById("screenDiv").appendChild(order);
          document.getElementById('myContainer').style.opacity = "100%";
          document.getElementById("win").play();
          game.timer();
     },
     randIndex: function (len) {
          let i = Math.floor(Math.random() * len);
          return i;
     },

     isValidEasy: function (i, indexRand) {
          if (i === 0)
               return copyArr[indexRand].data === "drinks";
          if (i === 1)
               return copyArr[indexRand].data === "fastfood";
          else
               if (i === 2)
                    return copyArr[indexRand].data === "cakes";

     },
     gameOver: function () {
          alert("aaaaaa");
          clearInterval(myInterval);
          if (localStorage.maxScore === null) {
               localStorage.setItem('maxScore', this.score);
               localStorage.setItem('maxScoreUsername', this.nameUser);
               localStorage.setItem('maxScoreNumOfScreen', this.countSuccssesScreen);
          }
          else
               if (this.score > localStorage.maxScore) {
                    newMax = true;
                    localStorage.setItem('maxScore', this.score);
                    localStorage.setItem('maxScoreUsername', this.nameUser);
                    localStorage.setItem('maxScoreNumOfScreen', this.countSuccssesScreen);
                    massage();
               }

     },



     nextLevel: function () {
          let btnNext = document.getElementById("nextlevel");
          btnNext.addEventListener("click", (ev) => {
               if (this.selectedLevel === 3)

                    localStorage.setItem('level', this.selectedLevel + 1);
               this.playOn();
          });
     },

     closeX1: function () {
          isOn = false;
          modal.style.display = 'none';
          inputTime.removeAttribute("disabled");
          inputName.removeAttribute("disabled");
          document.getElementsByClassName('startBtn')[0].addEventListener('click', playAgain); //כפתור התחלת משחק


     }
};

function massage() {
     let modal = document.getElementById('id01'); //הודעת ניצחון
     modal.style.display = 'block';
     let modalP1 = document.querySelector(".content-1");
     let modalP2 = document.getElementById("points");
     let modalP3 = document.getElementById("finalMove");
     // let modalP4 = document.getElementById("totalTime");
     let modalP5 = document.getElementById("broke");
     if (newMax) {
          modalP5.textContent = `כל הכבוד!!! שברת את השיא הקודם שעמד על: ${this.prevMax}`;
          if (playerName != "" && playerName !== undefined) {
               modalP5.textContent += ` והושג ע"י ${prevName}`;
          }
          modalP5.textContent += ` השיא שלך הוא: ${this.score}`;
     }
     modalP1.textContent = `כל הכבוד ${(localStorage.username) + " "}ניצחת! 🎉🎉`;
     modalP2.textContent = `עכשיו יש לך ${this.score} נקודות!!`;
     modalP3.textContent = `בשלב ${this.selectedLevel} הצלחת ${localStorage.maxScore}`;
     // modalP4.textContent = `תוך ${} שניות`;

};


const onload1 = () => {
     document.getElementById('myContainer').style.opacity = "0%";
     game.createFrizer();
     myTimer();
}

function createinstru() {
     let p1 = document.createElement("p");

}

const myInterval = setInterval(myTimer, 20000);
function myTimer() {
     game.createOrder();
};


function playOn() {
     alert(aaa);
     document.getElementById('myContainer').style.opacity = "0%";

     onload1();
}
































