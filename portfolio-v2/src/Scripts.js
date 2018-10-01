
const ctx = c.getContext('2d'),
scale = 10,
noiseScale = 100,
noise = new SimplexNoise(),
timeGain = 0.0035,
colors = [
    '#69D2E7',
    '#A7DBD8',
    '#E0E4CC',
    '#F38630',
    '#FA6900'
];

let time = 0;

let draw = () => {
time += timeGain;
c.width = window.innerWidth;
c.height = window.innerHeight;
for(y=0; y<Math.ceil(c.height/scale); y++) {
for(x=0; x<Math.ceil(c.width/scale); x++) {
ctx.fillStyle = colors[ ~~(noise.noise3D(x/noiseScale,y/noiseScale,time)*3)+2 ];
ctx.fillRect(x*scale, y*scale, scale, scale);
}
}
window.requestAnimationFrame(draw);
}
draw();