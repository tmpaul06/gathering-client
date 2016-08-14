import React from 'react';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Star {
  constructor(width, height) {
    let sign = Math.random() > 0.5 ? 1 : -1;
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.vx = Math.random() / 15 * sign;
    this.vy = Math.random() / 15 * sign;
    this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    this.radius = Math.floor(Math.random() * 20) + 5;
  }

  draw(ctx, nextStar) {
    ctx.beginPath();
    ctx.strokeStyle = '#a5a5a5';
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(nextStar.x, this.y);
    ctx.lineTo(nextStar.x, nextStar.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
  }
}

export default class Background extends React.Component {
  componentDidMount() {
    let canvas = this.refs.canvas;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.createStars(canvas, 20);
    this.updateStars(canvas, canvas.width, canvas.height);
  }
  render() {
    return (<canvas width="640" height="260" ref='canvas'/>);
  }
  createStars(canvas, N) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(255, 255, 255)';
    let width = canvas.width, height = canvas.height;
    this.stars = [];
    for(let i = 0; i < N; i++) {
      let star = new Star(width, height);
      this.stars.push(star);
    }
  }
  updateStars(canvas, w, h) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 0.75;
    let stars = this.stars || [];
    let len = stars.length;
    // For each star, compute new position based on velocity
    for(let i = 0; i < len; i++) {
      let star = stars[i];
      star.x += star.vx;
      star.y += star.vy;
      star.draw(ctx, stars[i + 1] ? stars[i + 1] : {
        x: 0,
        y: 0
      });
      if (star.x > w) {
        star.x = 0;
        //star.vx = -star.vx;
      } else if (star.x < 0) {
        star.x = 0;
        star.vx = -star.vx;
      }
      if (star.y > h) {
        //star.vy = -star.vy;
        star.y = 0;
      } else if (star.y < 0) {
        star.y = 0;
        star.vy = -star.vy;
      }
    }
    setTimeout(() => {
      this.updateStars(canvas, w, h);
    }, 1000 / 60);
  }
};