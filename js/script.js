let slide = document.querySelectorAll('.slider-team');
// slide[0].style.marginLeft = -770 + 'px';

// function slideRight() {
//     document.querySelector('.slider-right-arrow').addEventListener('click', event => {
//         for (let i = 0; i < slide.length; i++) {
//             slide[0].style.marginLeft = -770 + 'px'; 
//         }
//     });
// }

//=========================sort======================================
// function compareNumeric(a, b) {
//     if (a > b) return 1;
//     if (a == b) return 0;
//     if (a < b) return -1;
// }

// let arr = [ 2, -3, 1, 25, -451, 48, 10, 321, 1, 4, 0, 32, 8 ];

// arr.sort(compareNumeric);

// console.log(arr);

// //=============================================================
// Binary search

// function binarySearch (arr, searchItem) {
//     let low = 0;
//     let high = arr.length - 1;
//     let mid;
//     let guess;

//     while (low <= high) {
//         mid = Math.floor((low + high) / 2);
//         guess = arr[mid];

//         if (guess === searchItem) {
//             return 'Index: ' + mid;
//         } else if (guess > searchItem) {
//             high = mid - 1;
//         } else {
//             low = mid + 1;
//         }
//     }

//     return 'Not found';
// }

// console.log(binarySearch(arr, 10));


//=============================================================
// Selection sort

// let arr = [2, -5, 104, 33, 101, -222, 145, 0, 4231, 9];
// console.log(arr);

// function findSmallest(arr) {
//     let minElement = arr[0];
//     let minIndex;

//     for (let i = 1; i < arr.length; i++) {
//         if (arr[i] < minElement) {
//             minElement = arr[i];
//             minIndex = i;
//             console.log(minIndex);
//         }
//     }

//     return minIndex;
// }

// function selectionSort(arr) {
//     let sortedArr = [];
//     let arrLength = arr.length;

//     for (let i = 0; i < arrLength; i++) {
//         let minIndex = findSmallest(arr);
//         sortedArr.push(arr.splice(minIndex, 1)[0]);
//         console.log(sortedArr)
//     }

//     return sortedArr;
// }

// console.log(selectionSort(arr))


// Recursion=======================================

// function countItem(item) {
//     console.log(item);
//     if (item <= 0) {
//         return;
//     }
//     countItem(item - 1);
// }

// countItem(4);

// function factorial(n) {
//     if (n == 1) {
//         return 1;
//     } else {
//         return n * factorial(n - 1);
//     }
// }

// console.log(factorial(5));

//  Divide and conquer====================================

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function divideAndConquer(arr) {
//     if (arr.length == 0) {
//         return 0;
//     } else {
//         return arr[0] + divideAndConquer(arr.slice(1))
//     }
// }

// console.log(divideAndConquer(arr));

// Quicksort===================================
// let arr = [10, -1, 20, 2, 5, -74, 120, -5, 0, 34, 22];

// const quickSort = (arr) => {
//     if (arr.length < 2) {
//       return arr;
//     }
//     const pivot = arr[0];
//     const keysAreLessPivot = arr.slice(1).filter(key => key <= pivot);
//     const keysAreMorePivot = arr.slice(1).filter(key => key > pivot);
//     return [...quickSort(keysAreLessPivot), pivot, ...quickSort(keysAreMorePivot)];
//   };
  
//   console.log(quickSort(arr)); // [2, 3, 5, 10]


// let arr = [2, 3, 4];
// function multi(arr) {
//     let result = [];
//     let item;
//     let a;
//     let b;
//     for (let i = 0; i < arr.length; i++) {
//         a = arr[i];
//         for (let j = 0; j < arr.length; j++) {
//             b = arr[j];
//             item = (a *= b);
//         }
//         result.push(item);
//     }
//     return result;
// }
// console.log(multi(arr));


// let phoneBook = {
//     "Jenny": 8675309,
//     "emergency": 911,
// };

// console.log(phoneBook.Jenny);

// Поиск в ширину
// const personIsSeller = name => name[name.length - 1] === 'm';

// const graph = {};
// graph.you = ['alice', 'bob', 'claire'];
// graph.bob = ['anuj', 'peggy'];
// graph.alice = ['peggy'];
// graph.claire = ['thom', 'jonny'];
// graph.anuj = [];
// graph.peggy = [];
// graph.thom = [];
// graph.jonny = [];

// const search = (name) => {
//     let searchQueue = [];
//     searchQueue = searchQueue.concat(graph[name]);
//     // This array is how you keep track of which people you've searched before.
//     const searched = [];
//     while (searchQueue.length) {
//         console.log(searchQueue);
//         const person = searchQueue.shift();
//         console.log(person);
//         // Only search this person if you haven't already searched them
//         if (searched.indexOf(person) === -1) {
//             if (personIsSeller(person)) {
//                 console.log(`${person} is a mango seller!`);
//                 return true;
//             }
//             searchQueue = searchQueue.concat(graph[person]);
//             // Mark this person as searched
//             searched.push(person);
//         }
//     }
//     return false;
// };

// search('you');

// Алгоритм Дейкстры

let graph = {};
graph.start = {};
graph.start.a = 6;
graph.start.b = 2;

graph.a = {};
graph.a.fin = 1;

graph.b = {};
graph.b.a = 3;
graph.b.fin = 5;

graph.fin = {};

// Код создания таблицы стоимостей costs:
let costs = {};
costs.a = 6;
costs.b = 2;
costs.fin = Infinity;

// Код создания хеш-таблицы родителей:
let parents = {};
parents.a = 'start';
parents.b = 'start';
parents.fin = null;

// массив для отслеживания всех уже обработанных узлов
let processed = [];


const findLowestCostNode = (itCosts) => {
    let lowestCost = Infinity;
    let lowestCostNode = null;

    Object.keys(itCosts).forEach((node) => {
        const cost = itCosts[node];
        // If it's the lowest cost so far and hasn't been processed yet...
        if (cost < lowestCost && (processed.indexOf(node) === -1)) {
            // ... set it as the new lowest-cost node.
            lowestCost = cost;
            lowestCostNode = node;
        }
    });
    return lowestCostNode;
};

let node = findLowestCostNode(costs);

while (node !== null) {
    const cost = costs[node];
    // Go through all the neighbors of this node
    const neighbors = graph[node];
    Object.keys(neighbors).forEach((n) => {
        const newCost = cost + neighbors[n];
        // If it's cheaper to get to this neighbor by going through this node
        if (costs[n] > newCost) {
            // ... update the cost for this node
            costs[n] = newCost;
            // This node becomes the new parent for this neighbor.
            parents[n] = node;
        }
    });

    // Mark the node as processed
    processed = processed.concat(node);

    // Find the next node to process, and loop
    node = findLowestCostNode(costs);
}

console.log('Cost from the start to each node:');
console.log(costs); // { a: 5, b: 2, fin: 6 }