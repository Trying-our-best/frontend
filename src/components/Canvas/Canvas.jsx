import React, { useState, useEffect, Component } from "react";

import Player from "../../assets/torch.png";
import PlayerList from "../playerList/playerList";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

import Directions from "../Directions";

export default class Canvas extends Component {
  state = {
    x: 15,
    y: 15,
    torchW: 15,
    torchH: 15,
    tileW: 15,
    tileH: 15,
    location: {
      direction: null
    },
    room: {
      name: null,
      currentRoom: null,
      roomDescription: null,
      players: null,
      error_msg: null
    },
    gameMapArr: []
  };

  drawCanvas = () => {
    const ctx = this.refs.canvas.getContext("2d");
    for (let y = 0; y <= 47; y++) {
      for (let x = 0; x <= 47; x++) {
        if (this.state.gameMapArr[y * 47 + x]) {
          ctx.fillStyle = "#eee";
        } else {
          ctx.fillStyle = "#999";
        }
        ctx.fillRect(
          x * this.state.tileW,
          y * this.state.tileH,
          this.state.tileW,
          this.state.tileH
        );
      }
    }
  };

  drawTorch = (x, y, width, height) => {
    const ctx = this.refs.canvas.getContext("2d");
    //ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)

    const img = new Image();
    img.src = Player;

    ctx.drawImage(img, x, y, width, height);
  };

  verifyMovement = () => {
    axiosWithAuth()
      .post("api/adv/move/", this.state.location)
      .then(res => {
        console.log(res.data);
        let temp = 0;
        this.setState({
          ...this.state,
          room: {
            name: res.data.name,
            currentRoom: res.data.title,
            roomDescription: res.data.description,
            players: res.data.players,
            error_msg: res.data.error_msg
          }
        });
        if (res.data.error_msg === "") {
          console.log(res.data.error_msg);
          switch (this.state.location.direction) {
            case "w":
              temp = this.state.x;
              temp -= 30;
              this.setState({
                ...this.state,
                x: temp
              });
              break;
            case "e":
              temp = this.state.x;
              temp += 30;
              this.setState({
                ...this.state,
                x: temp
              });
              break;
            case "n":
              temp = this.state.y;
              temp -= 30;
              this.setState({
                ...this.state,
                y: temp
              });
              break;
            case "s":
              temp = this.state.y + 30;
              this.setState({
                ...this.state,
                y: this.state.y + 30
              });
              break;
            default:
              break;
          }
        }
      })
      .catch(err => err.res);
  };

  componentDidMount = () => {
    axiosWithAuth()
      .get("/api/adv/init/")
      .then(res => {
        let temp = 0;
        this.setState({
          ...this.state,
          room: {
            currentRoom: res.data.title,
            roomDescription: res.data.description,
            name: res.data.name,
            players: res.data.players
          }
        });
      })
      .catch(err => err.err);

    axiosWithAuth()
      .get("/api/adv/gamemap/")
      .then(res => {
        this.setState({
          ...this.state,
          gameMapArr: res.data.gameMap.flat()
        });
      });

    setInterval(() => {
      this.drawTorch(
        this.state.x,
        this.state.y,
        this.state.torchW,
        this.state.torchH
      );
    }, 1000 / 30);

    document.addEventListener("keydown", e => {
      // checking for which key is pressed
      if (e.key === "w") {
        // setting temp var to capture value of y

        // if y value - 100 is still greater than zero, do movement as normal

        // console.log(this.state.y)sss
        this.setState({
          ...this.state,
          location: {
            direction: "n"
          }
        });
        this.verifyMovement();
      } else if (e.key === "a") {
        this.setState({
          ...this.state,
          location: {
            direction: "w"
          }
        });
        this.verifyMovement();
      } else if (e.key === "s") {
        this.setState({
          ...this.state,
          location: {
            direction: "s"
          }
        });

        this.verifyMovement();
      } else if (e.key === "d") {
        this.setState({
          ...this.state,
          location: {
            direction: "e"
          }
        });
        this.verifyMovement();
      }
    });
  };

  componentDidUpdate = prevState => {
    if (this.state.gameMapArr !== prevState) {
      this.drawCanvas();
    }
  };

  render() {
    return (
      <div>
        <div>
          {this.state.room ? (
            <div className="Direction-Buttons">
              <div style={{ backgroundColor: "white" }}>
                {/* {location.direction ? <p>Last Move: {location.direction}</p> : null} */}
                <p>{this.state.room.currentRoom}</p>
                <p>{this.state.room.roomDescription}</p>
              </div>
              {/* {roomInfo.error_msg ? <p>{roomInfo.error_msg}</p> : null} */}
              <PlayerList
                players={this.state.room.players}
                current={this.state.room.name}
              />
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
        <canvas
          ref="canvas"
          id="canvas"
          width="705"
          height="705"
          style={{ border: "4px solid green" }}
        ></canvas>
      </div>
    );
  }
}
