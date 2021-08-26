let viz = document.querySelector('#viz');//part that shows bars
let res = document.querySelector('#res');//button reset
let ins = document.querySelector('#ins');
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

let clear_bar = async (evt) => {
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
let delay = (id, color, delay, id2) => {       //adds color after delay
    let prom = new Promise((resolve, reject) => {       // this promise can be awaited in async function
        setTimeout(() => {
            //console.log(id);
            let el = document.querySelector(`#id${id}`);

            el.style.backgroundColor = color;
            console.log(id2);
            if (id2) {
                let el1 = document.querySelector(`#id${id2}`);
                console.log(el1);
                el1.style.backgroundColor = color;
            }
            resolve();
        }, delay)

    })
    return prom;
}
let set_id = (i) => {//sets the properties of the bar according to the array 
    // console.log(array[i], ' ', mx)
    let h = (array[i] / mx) * 80;
    let el = document.querySelector(`#id${i}`);
    // console.log(el);
    //console.log(i, ' ', h)
    el.style.height = `${h}vh`;
    if (toggle) { el.innerHTML = `${array[i]}`; }
    // el.style.backgroundColor = 'white';
}

//swap_id(map_id.get(i), map_id.get(i - 1));
let INSERTION_SORT = async () => {
    desc.innerHTML = "Here the pointer is at blue bar and the sorted space lies behind the blue bar.The green pointer finds the minimum element(red bar) and swaps it with blue bar which is its correct posn";
    desc.style.color = "Blue";
    for (let i = 0; i < array.length - 1; i++) {
        // console.log(i, ' ', map.get(array[i]));
        delay(i, 'blue', 0);
        let j = i + 1;
        let pos = i;
        while (j < array.length) {
            await delay(j, 'green', sp);
            if (array[j] < array[pos]) {
                if (pos != i) {
                    delay(pos, 'white', 0);
                }
                await delay(j, 'red', sp);
                // await delay(j, 'white', sp);
                pos = j;
            }
            if (pos != j) { await delay(j, 'white', sp); }
            ++j;
        }
        let temp = array[pos];
        array[pos] = array[i];
        array[i] = temp;
        set_id(pos);
        set_id(i);
        delay(j, 'white', 0, array.length - 1);
        delay(i, 'white', 0, array.length - 1);
        delay(i, 'white', 0, array.length - 1);
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

ins.addEventListener('click', async (evt) => {  //on click for insertion sort
    evt.preventDefault();
    INSERTION_SORT();

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

cls.addEventListener('click', async (evt) => {
    evt.preventDefault();
    clear_bar();
    res.innerHTML = 'MAKE ARRAY';
})
