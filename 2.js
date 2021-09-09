var a = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];

function bubblesort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                swapped = true;
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        if (swapped !== true) break;
    }
    return arr
}
console.log(a);
console.log('----------------------------------------------');
console.log(bubblesort(a));