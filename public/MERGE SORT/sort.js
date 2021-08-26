let viz = document.querySelector('#viz');//part that shows bars
let res = document.querySelector('#res');//button reset
let mer = document.querySelector('#ins');
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
    //console.log(child);
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
        // console.log(num);
        mx = Math.max(mx, num);
        array.push(num);
    }
    let w = 90 / array.length;             //90 vw width is divided to all bars 
    let add = document.createElement('div');
    add.setAttribute('class', 'bar');
    //let id_cnt = 0;
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
let set_id = async (i) => {//sets the properties of the bar according to the array 
    // console.log(array[i], ' ', mx)
    let prom = new Promise((resolve, reject) => {
        let h = (array[i] / mx) * 80;
        let el = document.querySelector(`#id${i}`);
        el.style.height = `${h}vh`;
        if (toggle) { el.innerHTML = `${array[i]}`; }


        resolve();
    })
    return prom;
}

const merge = async (arr, l, m, r) => {

    //return new Promise()


    let prom = new Promise((resolve, reject) => {
        let i = 0, j = 0, k = 0;
        let n1 = m - l + 1;
        let n2 = r - m;

        /* create temp arrays */
        let L = [];
        let R = [];

        /* Copy data to temp arrays L[] and R[] */
        for (i = 0; i < n1; i++) { L.push(arr[l + i]); }
        for (j = 0; j < n2; j++) { R.push(arr[m + 1 + j]); }

        /* Merge the temp arrays back into arr[l..r]*/
        i = 0;
        j = 0;
        k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        /* Copy the remaining elements of L[], if there are any */
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        /* Copy the remaining elements of R[], if there are any */
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
        for (let i = l; i <= r; i++) {
            set_id(i);
        }


        resolve();
    })
    return prom;
}

let MERGE_SORT = async (s, e) => {
    desc.innerHTML = "Here the array is merge sorted between 2 red bars ";
    desc.style.color = "Blue";
    for (let curr_size = 1; curr_size < array.length; curr_size = 2 * curr_size) {
        // Pick starting point of different subarrays of current size
        for (let left_start = 0; left_start < array.length - 1; left_start += 2 * curr_size) {
            // Find ending point of left subarray. mid+1 is starting
            // point of right
            let mid = Math.min(left_start + curr_size - 1, array.length - 1);

            let right_end = Math.min(left_start + 2 * curr_size - 1, array.length - 1);

            console.log(curr_size, left_start, right_end);

            await delay(left_start, 'red', sp, right_end);



            // Merge Subarrays arr[left_start...mid] & arr[mid+1...right_end]

            await merge(array, left_start, mid, right_end);

            await delay(left_start, 'white', sp, right_end);
        }
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

mer.addEventListener('click', async (evt) => {  //on click for merge sort
    evt.preventDefault();
    MERGE_SORT(0, array.length - 1);

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

