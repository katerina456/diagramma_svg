let webBig = document.querySelector('.web-big');
let webSmall = document.querySelector('.web-small');
let rhombs = document.querySelector('.rhombs');
let lines = document.querySelectorAll('.line');


let userWeb = document.querySelector('.user-web');
let skills = document.querySelector('.skills');
let userPoints =[];

const userSkills = [{level: 4.5, skillName:'Искуственный интеллект', }, 
                    {level: 5.4, skillName:'Программирование',}, 
                    {level: 3.8, skillName:'Архитектура',}, 
                    {level: 2.6, skillName:'Управление проектами',}, 
                    {level: 6.7, skillName:'Коммуникации',}, 
                    {level: 4, skillName:'Управление персоналом',}, 
                    {level: 3.5, skillName:'Работа с информацией',}, 
                    {level: 4.5, skillName:'Инфраструктура',}, 
                    {level: 4.8, skillName:'Управление данными',}, 
                    {level: 6, skillName:'Математика',}, 
                    {level: 5.1, skillName:'Анализ данных',}
                ];


document.addEventListener("DOMContentLoaded", setWeb);


function setWeb() {
    const r = 150;
    const x0 = 200;
    const y0 = 200;
    
    webBig.setAttribute('points', setRoundPoints(x0, y0, r, true)) ;
    webSmall.setAttribute('points', setRoundPoints(x0, y0, r/2, false)) ;
    
    userWeb.setAttribute('points', setDiagramm(x0, y0, r, userSkills)) ;
    
    let rhombAll = document.querySelectorAll('.rhomb');
    
    rhombAll.forEach(rhomb => {
        rhomb.addEventListener('mouseover', (event) => {
        skills.innerHTML = '';
        let number = +rhomb.dataset.index;

        //создание точки 
        skills.innerHTML = `<circle cx="${userPoints[number].x}" cy="${userPoints[number].y}" r="5"  style="fill:rgb(28, 157, 217); stroke:rgb(255, 255, 255); stroke-width:1; "/>`   

        //сдвиг относительно точки на графике для создания прямоугольной области с пояснениями
        let ugolY = 15;
        let ugolX = 10;
        let width = 80;
        let height = 60;
        
        //создание области подписи к точке
        skills.innerHTML += `<polygon points='${userPoints[number].x},${userPoints[number].y-5} ${userPoints[number].x+ugolX},${userPoints[number].y-ugolY} 
        ${userPoints[number].x+width},${userPoints[number].y-ugolY} ${userPoints[number].x+width},${userPoints[number].y-height} 
        ${userPoints[number].x-width},${userPoints[number].y-height} ${userPoints[number].x-width},${userPoints[number].y-ugolY} 
        ${userPoints[number].x-ugolX},${userPoints[number].y-ugolY}'  style="fill:rgba(255, 255, 255, 0.7); stroke:rgb(28, 157, 217); stroke-width:1; "/>`   
        
        //создание подписи к точке
        skills.innerHTML += `<text x="${userPoints[number].x-width+5}" y="${userPoints[number].y-40}" 
        style="font:11px sans-serif; fill:rgb(102, 102, 102);">${userSkills[number].skillName}</text>`
    
        skills.innerHTML += `<text x="${userPoints[number].x-width+5}" y="${userPoints[number].y-25}" 
        style="font:12px sans-serif; fill:rgb(28, 157, 217);">Данные специалиста: ${userSkills[number].level}</text>`
        })
    
    
        rhomb.addEventListener('mouseout', () => {
            skills.innerHTML = ''
        })  
    })
}



function setRoundPoints(x0, y0, r, flag) {
    let points = ''
    let f = -90;
    
    for (let i=0; i< 11; i++) {   
        let x = x0 + r * Math.cos(f * Math.PI / 180);
        let y = y0 + r * Math.sin(f * Math.PI / 180);
        
        points += `${x},${y} `
        
        if (flag) {
        setLine(i, x0, y0, x, y);
        setRhomb(x0, y0, x, y, f, r, i);
        } 
        
        f = f + 360/11;
        if (f > 360) {
            f = f -360;
        }
    }
    return points;
}


function setLine (i, x0, y0, x, y) {
    lines[i].setAttribute('x1', x0);
    lines[i].setAttribute('y1', y0);
        
    lines[i].setAttribute('x2', x);
    lines[i].setAttribute('y2', y);
}



function setRhomb(x0, y0, x, y, f, r, index) {
    let x1 = x0 + r * Math.cos((f+360/11) * Math.PI / 180);
    let y1 = y0 + r * Math.sin((f+360/11) * Math.PI / 180);
    
    let x3 = x0 + r * Math.cos((f-360/11) * Math.PI / 180);
    let y3 = y0 + r * Math.sin((f-360/11) * Math.PI / 180);
    
    let rhomb = `${x0},${y0} ${(x1+x)/2},${(y1+y)/2} ${x},${y} ${(x3+x)/2},${(y3+y)/2}`;
    
    rhombs.innerHTML += `<polygon class='rhomb' data-index="${index}" points='${rhomb}' 
    style="fill:rgba(255, 255, 255, 0.1); stroke:rgba(255, 255, 255, 0); stroke-width:1; "/>`;
}



function setDiagramm(x0, y0, r, array) {
    let points = ''
    
    let f = -90;
    
    for (let i=0; i< 11; i++) {   
        let x = x0 + r/10*array[i].level * Math.cos(f * Math.PI / 180);
        let y = y0 + r/10*array[i].level * Math.sin(f * Math.PI / 180);
        
        addToArray(userPoints, x, y)
        
        setRhomb(x0, y0, x, y, f, r/10*array[i], i)
        
        points += `${x},${y} `
        
        f = f + 360/11;
        if (f > 360) {
            f = f -360;
        }
    }

    return points;
}



function addToArray(array, x, y) {
    let obj = {};
    obj.x = x;
    obj.y = y;
    
    array.push(obj)
}
