import React, { useState, useEffect, Component } from 'react';

import Player from '../../assets/torch.png'

export default class Canvas extends Component {

    state = {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        // canvas: null,
        // ctx: null
    }

    drawTorch = (x, y, width, height) => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

        const img = new Image();
        img.src = Player;
        console.log('check')

        img.onload = () => {
            ctx.drawImage(img, x, y, width, height)
        }

    }

    componentDidMount = () => {
        
        this.drawTorch(this.state.x, this.state.y, this.state.width, this.state.height);

        setInterval(() => {
            // this.move();
            this.drawTorch(this.state.x, this.state.y, this.state.width, this.state.height);
        }, 1000 / 60);

        document.addEventListener('keydown', (e) => {
            console.log(e.key)
            if(e.key === 'w') {
                console.log('test')
                // this.setState({
                //     ...this.state,
                //     y: this.state.y - 100
                // }) 
                this.state.y -= 100
                // this.moveTorch(this.state.x, this.state.y)

            } else if(e.key === 'a') {
                // this.setState({
                //     ...this.state,
                //     x: this.state.x - 100
                // })
                this.state.x -= 100
                // this.moveTorch(this.state.x, this.state.y)

            } else if (e.key === 's') {
                // this.setState({
                //     ...this.state,
                //     y: this.state.y += 100
                // })
                this.state.y += 100
                // this.moveTorch(this.state.x, this.state.y)

            } else if (e.key === 'd') {
                this.state.x += 100
                // this.setState({
                //     ...this.state,
                //     x: this.state.x + 100
                // })

                // this.moveTorch(this.state.x, this.state.y)
            }
        })
        // const canvas = this.refs.canvas
        // const ctx = this.refs.
        // console.log('render')
        // this.setState({
        //     ...this.state,
        //     canvas: document.getElementById('canvas')
        // })

        // if(this.state.canvas) {
        //     this.setState({
        //         ...this.state,
        //         ctx: this.state.canvas.getContext('2d')
        //     })
        // }

    }

    // update = () => {

    // }

    // componentWillUpdate = () => {
        
    // }
    
    
    // window.addEventListener('keydown', (e) => {
    //     if(e.key === 'w') {
    //         console.log('test')
    //         this.setState.y -= 100
    //         moveTorch(this.state.x, this.state.y)
    //     } else if(e.key === 'a') {
    //         this.setState.x -= 100
    //         moveTorch(this.state.x, this.state.y)
    //     } else if (e.key === 's') {
    //         this.setState.y += 100
    //         moveTorch(this.state.x, this.state.y)
    //     } else if (e.key === 'd') {
    //         this.setState.x += 100
    //         moveTorch(this.state.x, this.state.y)
    //     }
    // })

    // move = () => {
    //     console.log('test')
    //     if(.key === 87) {
    //         console.log('test')
    //         this.setState({
    //             ...this.state,
    //             y: this.state.y - 100
    //         })
    //         this.moveTorch(this.state.x, this.state.y)
    //     } else if(e.key === 'a') {
    //         this.setState({
    //             ...this.state,
    //             x: this.state.x - 100
    //         })
    //         this.moveTorch(this.state.x, this.state.y)
    //     } else if (e.key === 's') {
    //         this.setState({
    //             ...this.state,
    //             y: this.state.y + 100
    //         })
    //         this.moveTorch(this.state.x, this.state.y)
    //     } else if (e.key === 'd') {
    //         this.state.x += 100
    //         this.setState({
    //             ...this.state,
    //             x: this.state.x + 100
    //         })
    //         this.moveTorch(this.state.x, this.state.y)
    //     }
    // }

    render() {
        console.log('check')
        return (
            <div>
                <h1>Canvas</h1>
                <canvas ref="canvas" id="canvas" width="1040" height="650"></canvas>
            </div>
         );
    }

}


// const Canvas = () => {

//     const [ playerPosition, this.setState ] = useState({
//         // starting position
//         x: 50,
//         y: 50,
//         width: 100,
//         height: 100
//     })
//     const [ isLoading, setIsLoading ] = useState(true);

//     useEffect(() => {
//         setIsLoading(false);
//     }, []);

//     let canvas;
//     let this.state.ctx;

//     if(!isLoading) {
//         canvas = document.getElementById('canvas')
//         this.state.ctx = canvas.getContext('2d')
//     }

//     function drawTorch(x, y, width, height) {
//         const img = new Image();
//         img.src = Player;
//         console.log('check')

//         img.onload = () => {
//             this.state.ctx.drawImage(img, x, y, width, height)
//         }

//     }

//     const moveTorch = () => {
//         this.state.ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

//         drawTorch(playerPosition.x, playerPosition.y, playerPosition.width, playerPosition.height)
//     }

//     window.addEventListener('keydown', (e) => {
//         if(e.key === 'w') {
//             console.log('test')
//             playerPosition.y -= 100
//             moveTorch(playerPosition.x, playerPosition.y)
//         } else if(e.key === 'a') {
//             playerPosition.x -= 100
//             moveTorch(playerPosition.x, playerPosition.y)
//         } else if (e.key === 's') {
//             playerPosition.y += 100
//             moveTorch(playerPosition.x, playerPosition.y)
//         } else if (e.key === 'd') {
//             playerPosition.x += 100
//             moveTorch(playerPosition.x, playerPosition.y)
//         }
//     })

//     // const move = (e) => {
//     //     console.log('test')
//     //     if(e.key === 'w') {
//     //         console.log('test')
//     //         this.setState({
//     //             ...playerPosition,
//     //             y: playerPosition.y - 100
//     //         })
//     //         moveTorch(playerPosition.x, playerPosition.y)
//     //     } else if(e.key === 'a') {
//     //         this.setState({
//     //             ...playerPosition,
//     //             x: playerPosition.x - 100
//     //         })
//     //         moveTorch(playerPosition.x, playerPosition.y)
//     //     } else if (e.key === 's') {
//     //         this.setState({
//     //             ...playerPosition,
//     //             y: playerPosition.y + 100
//     //         })
//     //         moveTorch(playerPosition.x, playerPosition.y)
//     //     } else if (e.key === 'd') {
//     //         playerPosition.x += 100
//     //         this.setState({
//     //             ...playerPosition,
//     //             x: playerPosition.x + 100
//     //         })
//     //         moveTorch(playerPosition.x, playerPosition.y)
//     //     }
//     // }

//     console.log('check')
//     return (
//         <div>
//             <h1>Canvas</h1>
//             <canvas id="canvas" width="1040" height="650"></canvas>
//         </div>
//      );
// }

// export default Canvas;