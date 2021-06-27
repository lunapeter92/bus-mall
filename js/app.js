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

const imgNameArray = [];
const imgVoteArray = [];


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

// Image.prototype.reinstatiateImages = function(name, image, votes, timeImageShown){
//     let newImage = new Image(name, image);
//     newImage.votes = votes;
//     newImage.timeImageShown = timeImageShown;

// }


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



function createChart(){
    //imageNameArray
    //imageVoteArray

    for(let img of Image.imageArray){
        imgNameArray.push(img.name);
        imgVoteArray.push(img.votes);
    }

    var ctx = document.getElementById('resultsChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgNameArray,
            datasets: [{
                label: '# of Votes',
                data: imgVoteArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function showResults(){
    for(let img of Image.imageArray){
        let li = document.createElement('li');
        li.textContent = `${img.name}: ${img.votes}`;
        li.className = 'results-list'
        results.appendChild(li);

    }

}

function saveResults(){
    let results = Image.imageArray;
    let stringifyResults = JSON.stringify(results);

    localStorage.setItem('results', stringifyResults);
}

function getResults(){
    let getResults = localStorage.getItem('results');
    if(getResults){
        let parsedResults = JSON.parse(getResults);

        for(let result of parsedResults){
            let votes = result.votes;
            let timeImageShown = result.timeImageShown;
            let name = result.name;
            let image = result.image;
            // Image.prototype.reinstatiateImages(name, image, votes, timeImageShown);
            for(let img of Image.imageArray){
                if(img.name === name){
                    img.votes = votes;
                    img.timeImageShown = timeImageShown;
                }
            }
        }
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
        saveResults();
    }else{
        alert('Please choose an image');
    }

    if(voteCounter === 25){
        imageSectionElem.removeEventListener('click', handleClick);
        // saveResults();
        showResults();
        createChart();
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
getResults();