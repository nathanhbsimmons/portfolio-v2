import React, { Component } from 'react';
import SimplexNoise from 'simplex-noise'
import {Canvas} from './Canvas'
import '../App.css';
// import '../Scripts.js'



class Header extends Component{
    
    componentDidMount() {
        this.init();
    }
    
   init=()=> {
    var width = window.innerWidth
    let height = window.innerHeight


    var paint = [];

    var totalPaints = (width / 50)
    var size = 20;
 
    let ctx = this.refs.canvas.getContext('2d');
    ctx.width = width;
    ctx.height = height;
        for (var i = 0; i < totalPaints; i++) {
          this.addPaint(size, paint, height, width);
        }
        setInterval(this.update, 40, paint, ctx, size, height, width);
      }
      
     drawPaint=(x, y, size, colour, ctx)=> {
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = colour;
        ctx.fill();
      }
      
     update=(paint, ctx, size, height, width)=> {
         
        for (var i = 0; i < paint.length; i++) {
          paint[i].y = paint[i].y + paint[i].v;
          if (paint[i].y > height + 60) {
            paint.splice(i, 1);
            this.addPaint(size, paint, height, width);
          }
          this.drawPaint(paint[i].x, paint[i].y, paint[i].s, paint[i].c, ctx);
        }
      }
      
     addPaint=(size, paint, height, width)=> {
        //Try 50 times
        var i = 50;
        while (i > 0) {
          size = Math.random() * size + 10;
          let x = Math.random() * width;
      
          let found = false;
      
          //Dont Allow drips ontop of each other (Overtaking drops destroy the prettyness)
          for (var j = 0; j < paint.length; j++) {
            if (x + size > paint[j].x && x - size < paint[j].x + paint[j].s) {
              found = true;
              break;
            }
      
            if (x - size < paint[j].x && x + size > paint[j].x - paint[j].s) {
              found = true;
              break;
            }
          }
      
          if (found == false) {
            paint.push({
              s: size,
              x: x,
              y: -60,
              v: Math.random() * 2 + 2,
              c: "#" + ((Math.random() * 0x313131 + 0xaaaaaa) | 0).toString(16)
            });
            i--;
            return;
          }
        }
      }
      
    
      

  
  render(){
    return (
        <div id="header">
        <Canvas>
        <canvas ref='canvas'></canvas>
        </Canvas>
        
        
       
        <h1 className='title'>NATHAN SIMMONS</h1>
        </div>
        
    );
  
  }
    
}
 
export default Header;