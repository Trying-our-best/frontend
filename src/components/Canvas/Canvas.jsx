import React, { useState, useEffect, Component } from 'react';

import Player from '../../assets/torch.png'

export default class Canvas extends Component {

    state = {
        x: 50,
        y: 50,
        width: 100,
        height: 100
    }

    drawTorch = (x, y, width, height) => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

        const img = new Image();
        img.src = Player;
        console.log('check');

        ctx.drawImage(img, x, y, width, height);
    }

    componentDidMount = () => {

        setInterval(() => {
            this.drawTorch(this.state.x, this.state.y, this.state.width, this.state.height);
        }, 1000 / 60);

        document.addEventListener('keydown', (e) => {

            if(e.key === 'w') {
                this.state.y -= 100

            } else if(e.key === 'a') {
                this.state.x -= 100

            } else if (e.key === 's') {
                this.state.y += 100

            } else if (e.key === 'd') {
                this.state.x += 100

            }
        })
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" id="canvas" width="1040" height="650"></canvas>
            </div>
         );
    }
}
