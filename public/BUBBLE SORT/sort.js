let viz = document.querySelector('#viz');//part that shows bars
let res = document.querySelector('#res');//button reset
let bub = document.querySelector('#ins');
let speed = document.querySelector('#speed');
let speedValue = document.querySelector('#speedValue');//range for speed
let cls = document.querySelector('#cls');
let sp = 0;

let arraySize = 100;
let sz_disp = document.querySelector("#sizeArray");//selecting element that displays the size of array
let sz_arr = document.querySelector("#sz_array");//input for size of array 
let toggle_num = document.querySelector("#toggleNum");
let toggle = 0;
let desc = document.querySelector("#description")
//console.log(sp);
//speedValue.innerHTML = `${10}`;

let array = [];
let mx = -1;

let map_id = new Map();//to map the index of array to id of the bar element
let clear_bar = async () => {
    let child = viz.lastChild;
    console.log(child);
    for (let i = 0; i < arraySize; i++) {
        let el = document.querySelector(`#id${i}`);
        if (!el) {
            continue;
        }
        el.remove();
    }
    array.splice(0, array.length);
    //console.log(array);
    //removed all bars till here
}
let reset = () => {     //  creates bars of random height
    clear_bar();

    for (let i = 0; i < arraySize; i++) {
        let num = Math.floor(((Math.random()) * 1000) / 10);
        console.log(num);
        mx = Math.max(mx, num);
        array.push(num);
    }
    let w = 90 / array.length;             //90 vw width is divided to all bars 
    let add = document.createElement('div');
    add.setAttribute('class', 'bar');
    let id_cnt = 0;
    for (let j = 0; j < array.length; j++) {

        let add = document.createElement('div');
        add.classList.add('bar');
        add.setAttribute('id', `id${j}`);
        add.setAttribute('class', 'bar');

        map_id.set(j, `id${j}`);

        let h = (array[j] / mx) * 80;             //giving 80% of height of screen as max ht to biggest bar and relative to other bars
        add.style.height = `${h}vh`;
        add.style.width = `${w}vw`;
        if (toggle) { add.innerHTML = array[j]; }
        viz.append(add);

    }
    //console.log('map');
    // till here->created array and visualized them as bars with their id as their indices in array 
}
let delay = (id, color, delay) => {       //adds color after delay
    let prom = new Promise((resolve, reject) => {       // this promise can be awaited in async function
        setTimeout(() => {
            //console.log(id);
            let el = document.querySelector(`#${id}`);

            el.style.backgroundColor = color;

            resolve();
        }, delay)

    })
    return prom;
}
let delay2 = (id1, id2, color, delay) => {       //adds color after delay
    let prom = new Promise((resolve, reject) => {       // this promise can be awaited in async function
        setTimeout(() => {
            //console.log(id);
            let el1 = document.querySelector(`#${id1}`);
            let el2 = document.querySelector(`#${id2}`);
            el1.style.backgroundColor = color;
            el2.style.backgroundColor = color;
            resolve();
        }, delay)

    })
    return prom;
}
let set_id = (i, delay) => {//sets the properties of the 2 adjacent bars according to the array after a delay
    // console.log(array[i], ' ', mx)
    let prom = new Promise((resolve, reject) => {       // this promise can be awaited in async function
        setTimeout(() => {
            //console.log(id);
            let h = (array[i] / mx) * 80;
            let h1 = (array[i + 1] / mx) * 80;
            let el = document.querySelector(`#id${i}`);
            let el1 = document.querySelector(`#id${i + 1}`);
            // console.log(el);
            //console.log(i, ' ', h)
            el.style.height = `${h}vh`;
            el1.style.height = `${h1}vh`;
            if (toggle) { el.innerHTML = `${array[i]}`; el1.innerHTML = `${array[i + 1]}` };
            el.style.backgroundColor = 'white';
            el1.style.backgroundColor = 'white';
            resolve();
        }, delay)
    })
    return prom;

}

//swap_id(map_id.get(i), map_id.get(i - 1));  await delay(map_id.get(i), 'green', sp);
let BUBBLE_SORT = async () => {
    desc.innerHTML = "In every pass adjacent elements are compared i.e red in color.Here in every pass the element at last is at its correct posn i.e. is in blue color";
    desc.style.color = "Blue";
    for (let i = 0; i < array.length; i++) {
        // console.log(i, ' ', map.get(array[i]));
        let j = 0;
        for (j = 0; j < array.length - i - 1; j++) {
            await delay2(map_id.get(j), map_id.get(j + 1), 'red', sp);

            if (array[j] > array[j + 1]) {

                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
            await set_id(j, sp);

        }
        //let last = array.length - i - 1;
        let el = document.querySelector(`#id${j}`);
        el.style.backgroundColor = 'blue';
    }
    for (let i of array) {
        console.log(i);
    }

}

//module.exports = INSERTION_SORT();

speed.addEventListener('change', async (evt) => {  //on change for speed

    evt.preventDefault();
    console.log(speed.value);
    sp = (20 - speed.value) * 100;
    alert("You can change speed in between by simply typing the required speed")
    speedValue.innerHTML = "CHANGE SPEED";
    //reset();
    //alert('hello');
})

res.addEventListener('click', async (evt) => {  //on click for reset 
    res.innerHTML = 'CHANGE ARRAY';
    evt.preventDefault();
    reset();
    //alert('hello');
})

bub.addEventListener('click', async (evt) => {  //on click for insertion sort
    evt.preventDefault();
    BUBBLE_SORT();

    //alert('hello');
})


sz_arr.addEventListener('change', async (evt) => {// on change event listener for siz of array input
    evt.preventDefault();
    let inp = parseInt(sz_arr.value);
    if (!Number.isInteger(inp)) {
        alert('pls enter a number ');
        return;
    }
    arraySize = inp;
    //reset();
    sz_disp.innerHTML = `Size of Array `;
})

toggle_num.addEventListener('click', async (evt) => {//to togggle numbers
    evt.preventDefault();
    toggle = 1 - toggle;
    if (toggle) {
        toggle_num.style.backgroundColor = 'green';
        for (let j = 0; j < array.length; j++) {
            let add = document.querySelector(`#id${j}`);
            { add.innerHTML = array[j]; }
        }
    }
    else {
        toggle_num.style.backgroundColor = 'white';
        for (let j = 0; j < array.length; j++) {
            let add = document.querySelector(`#id${j}`);
            { add.innerHTML = ''; }
        }
    }
    //reset();
})

cls.addEventListener('click', (evt) => {
    evt.preventDefault();
    clear_bar();
    res.innerHTML = 'MAKE ARRAY';
})
