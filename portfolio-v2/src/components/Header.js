import React, { Component } from 'react';
import '../App.css';
// import '../Scripts.js'



class Header extends Component{
    componentDidMount() {
        this.updateCanvas();
    }
    draw (time, scale, ctx, noiseScale, noise, timeGain, colors) {
        time += timeGain;
        this.refs.canvas.width = window.innerWidth;
        this.refs.canvas.height = window.innerHeight;
        for(y=0; y<Math.ceil(this.refs.canvas.height/scale); y++) {
        for(x=0; x<Math.ceil(this.refs.canvas.width/scale); x++) {
        ctx.fillStyle = colors[ ~~(noise.noise3D(x/noiseScale,y/noiseScale,time)*3)+2 ];
        ctx.fillRect(x*scale, y*scale, scale, scale);
        }
        }
        window.requestAnimationFrame(draw);
        }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
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
        
       
        this.draw(time, scale, ctx, noiseScale, noise, timeGain, colors);
    }
  
  render(){
    return (
        <div id="header">
        <canvas ref='canvas'></canvas>
        
       
        <h1 className='title'>NATHAN SIMMONS</h1>
        </div>
        
    );
  
  }
    
}
 
export default Header;