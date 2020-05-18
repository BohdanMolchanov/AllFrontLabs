let curMin = 0;
let curSec = 0;
let interval;
let goes = false;

const setNewTime = () => {
    let minString = curMin < 10 ? `0${curMin}` : curMin;
    let secString = curSec < 10 ? `0${curSec}` : curSec;
    $('#timer')
        .text(`${minString}:${secString}`);
}

const increaseTime = () => {
    curMin = curSec === 60 ? curMin + 1 : curMin;
    curSec = curSec === 60 ? 0 : curSec + 1;
    setNewTime(
    );
}

$(document).ready(() => {
    $('#go-stop').on('click', () => {
        goes = goes === false ? true : false;
        goes === true ? 
            interval = setInterval(increaseTime, 1000) :
            clearInterval(interval);
    })
    $('#reset').on('click', () => {
        clearInterval(interval);
        goes = false;
        curMin = 0;
        curSec = 0;
        $('#timer')
            .text("00:00");
    })
})
