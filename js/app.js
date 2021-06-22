'use strict';

//--------------------Global Variables---------------------//
const imageSectionElem = document.getElementById('image-section');
const leftImageElem = document.getElementById('left-image-image');
const leftImageh2Elem = document.getElementById('left-h2');
const middleImageElem = document.getElementById('middle-image-image');
const middleImageh2Elem = document.getElementById('middle-h2');
const rightImageElem = document.getElementById('right-image-image');
const rightImageh2Elem = document.getElementById('right-h2');
const results = document.getElementById('results');

let voteCounter = 0;

let leftImg;
let middleImg;
let rightImg;


//--------------------Constructor------------------------//
const Image = function(name, image){
 this.name = name;
 this.image = image;
 this.votes = 0;
 this.timeImageShown = 0;


 
 const imageCounter = 0;

 Image.imageArray.push(this);
}
Image.imageArray = [];


//--------------------Prototype Functions------------------//
Image.prototype.renderImages = function(imgPos, h2Pos){
    imgPos.src = this.image;
    h2Pos.textContent = this.name;
    this.timeImageShown++;
}




//--------------------Global Functions-----------------------//
function chooseImage(){
    //assign random number to images
    let leftImageIndex = Math.floor(Math.random() * Image.imageArray.length);
    leftImg = Image.imageArray[leftImageIndex];

    let middleImageIndex = Math.floor(Math.random() * Image.imageArray.length);
    middleImg = Image.imageArray[middleImageIndex];

    let rightImageIndex = Math.floor(Math.random() * Image.imageArray.length);
    rightImg = Image.imageArray[rightImageIndex];

    while(leftImg === null ||leftImg === middleImg || leftImg === rightImg|| middleImg === null || middleImg === rightImg || rightImg === null){
        let leftImageIndex = Math.floor(Math.random() * Image.imageArray.length);
        leftImg = Image.imageArray[leftImageIndex];

        let middleImageIndex = Math.floor(Math.random() * Image.imageArray.length);
        middleImg = Image.imageArray[middleImageIndex];

        let rightImageIndex = Math.floor(Math.random() * Image.imageArray.length);
        rightImg = Image.imageArray[rightImageIndex];
    }

    rightImg.renderImages(rightImageElem, rightImageh2Elem);
    middleImg.renderImages(middleImageElem, middleImageh2Elem);
    leftImg.renderImages(leftImageElem, leftImageh2Elem);

}


function showResults(){
    for(let img of Image.imageArray){
        let li = document.createElement('li');
        li.textContent = `${img.name}: ${img.votes}`;
        results.appendChild(li);

    }

}


function handleClick(e){
    let target = e.target.id;

    console.log(target)

    if(target === 'right-image-image' || target === 'middle-image-image' || target === 'left-image-image'){
        voteCounter++
        console.log(voteCounter);

        if(target === 'left-image-image'){
            leftImg.votes++;
        }else if(target === 'middle-image-image'){
            middleImg.votes++;
        }else if(target === 'right-image-image'){
            rightImg.votes++
        }
        chooseImage();
    }else{
        alert('Please choose an image');
    }

    if(voteCounter === 5){
        imageSectionElem.removeEventListener('click', handleClick);
        showResults();
    }

}



//---------------------Event Listeners----------------------//
imageSectionElem.addEventListener('click', handleClick);



//----------------------Call Functions----------------------//
new Image('Bag', './img/bag.jpg');
new Image('Banana', './img/bag.jpg');
new Image('Bathroom', './img/bathroom.jpg');
new Image('Boots', './img/boots.jpg');
new Image('Breakfast', './img/breakfast.jpg');
new Image('BubbleGum', './img/bubblegum.jpg');
new Image('Chair', './img/chair.jpg');
new Image('Cthulhu', './img/cthulhu.jpg');
new Image('Dog-Duck', './img/dog-duck.jpg');
new Image('Dragon', './img/dragon.jpg');
new Image('Pen', './img/pen.jpg');
new Image('Pet Sweep', './img/pet-sweep.jpg');
new Image('Scissors', './img/scissors.jpg');
new Image('Shark', './img/shark.jpg');
new Image('Sweep', './img/sweep.png');
new Image('Tauntaun', './img/tauntaun.jpg');
new Image('Unicorn', './img/unicorn.jpg');
new Image('Water-Can', './img/water-can.jpg');
new Image('Wine Glass', './img/wine-glass.jpg');


chooseImage();