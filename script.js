const canvas = document.querySelector('canvas');
const context = document.getContext('2d');
const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

let player = new Player(canvas.width / 2, canvas.height / 2, context);