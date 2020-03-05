import React, { useState, useEffect, Component } from 'react';

import Player from '../../assets/torch.png'
import PlayerList from '../playerList/playerList'

import { axiosWithAuth } from '../../utils/axiosWithAuth'

import Directions from '../Directions'

export default class Canvas extends Component {

    state = {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        location: {
            direction: null
        },
        room: {
            name: null,
            currentRoom: null,
            roomDescription: null,
            players: null,
        }
    }

    drawTorch = (x, y, width, height) => {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

        const img = new Image();
        img.src = Player;

        ctx.drawImage(img, x, y, width, height);
    }

    componentDidMount = () => {

        axiosWithAuth()
        .get("/api/adv/init/")
        .then(res => {
          console.log(res)
          this.setState({ 
              ...this.state, 
              room: {
                currentRoom: res.data.title,
                roomDescription: res.data.description,
                name: res.data.name,
                players: res.data.players
              }
          })
        })
        .catch(err => err.err)  

        setInterval(() => {
            this.drawTorch(this.state.x, this.state.y, this.state.width, this.state.height);
            // console.log('rerender')
        }, 1000 / 60);

        document.addEventListener('keydown', (e) => {
            let temp;
            const ctx = this.refs.canvas.getContext('2d');
            // checking for which key is pressed
            if (e.key === "w") {
              // setting temp var to capture value of y
              temp = this.state.y
              temp -= 100

              // if y value - 100 is still greater than zero, do movement as normal
              if (temp > 0) {

                // console.log(this.state.y)sss
                this.setState({
                  ...this.state,
                  y: temp,
                  location: {
                    direction: 'n'
                  }
                })
              }

            } else if (e.key === 'a') {
              // setting temp var to capture value of y
              temp = this.state.x
              temp -= 100
              
              // if x value - 100 is still greater than zero, do movement as normal
              if (temp > 0) {

                this.setState({
                  ...this.state,
                  x: temp,
                  location: {
                    direction: 'w'
                  }
                })
              }

            } else if (e.key === 's') {
              // setting temp var to capture value of y
              temp = this.state.y + 100
              // temp += 100
              // if y value - 100 is still greater than zero, do movement as normal
              if (temp < ctx.canvas.height) {
                console.log('made it')
                this.setState({
                  ...this.state,
                  y: this.state.y + 100,
                  location: {
                    direction: 's'
                  }
                })
              }



            } else if (e.key === 'd') {
              temp = this.state.x
              temp += 100
              // if x value - 100 is still greater than zero, do movement as normal
              if (temp < ctx.canvas.width) {

                this.setState({
                  ...this.state,
                  x: temp,
                  location: {
                    direction: 'e'
                  }
                })
              }
            }
            
            axiosWithAuth()
              .post("api/adv/move/", this.state.location)
              .then(res => {
                this.setState({
                    ...this.state,
                    room: {
                        name: res.data.name,
                        currentRoom: res.data.title,
                        roomDescription: res.data.description,
                        players: res.data.players
                    }
                })
                // console.log("moveNorth Res: ", res.data)
              })
              .catch(err => {
                // console.log("North Error: ", err.res)
              })
          })
        }

        
        render() {
          console.log(this.state)
        // console.log(this.state.room)
        return (

            <div>
                <div>
                    {this.state.room ? (
                    <div className="Direction-Buttons">
                        <div style={{backgroundColor: "white"}}>
                        {/* {location.direction ? <p>Last Move: {location.direction}</p> : null} */}
                        <p>{this.state.room.currentRoom}</p>
                        <p>{this.state.room.roomDescription}</p>
                        </div>
                        {/* {roomInfo.error_msg ? <p>{roomInfo.error_msg}</p> : null} */}
                        <PlayerList players={this.state.room.players} current={this.state.room.name} />

                    </div>
                    ) : (
                    <div>
                        <PlayerList
                        players={this.state.room.players}
                        current={this.state.room.name}
                        />
                        <p>{this.state.room.currentRoom}</p>
                        <p>{this.state.room.roomDescription}</p>
                    </div>
                    )}
                    </div>
                <canvas ref="canvas" id="canvas" width="1040" height="650"></canvas>
            </div>
         );
    }
}
