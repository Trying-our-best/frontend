import React, { Component } from "react";

import Player from "../../assets/torch.png";
import PlayerList from "../playerList/playerList";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

export default class Canvas extends Component {
  state = {
    x: 15,
    y: 15,
    playerX: null,
    playerY: null,
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
    const img = new Image();
    img.src = Player;
    console.log("playerX", this.state.playerX);
    console.log("playerY", this.state.playerY);
    ctx.drawImage(
      img,
      this.state.playerX * 30 + 15, //0 * 15 * 2 +15= 15      =15
      this.state.playerY * 30 + 15, //1 * 15 * 2 + 15= 45     =30
      width,
      height
    );
  };

  verifyMovement = () => {
    axiosWithAuth()
      .post("api/adv/move/", this.state.location)
      .then(res => {
        let temp = 0;
        this.setState({ 
          ...this.state,
          playerX: res.data.x,
          playerY: res.data.y,
          room: {
            name: res.data.name,
            currentRoom: res.data.title,
            roomDescription: res.data.description,
            players: res.data.players,
            error_msg: res.data.error_msg
          }
        });
        if (res.data.error_msg === "") {
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
        this.setState({
          ...this.state,
          playerX: res.data.x,
          playerY: res.data.y,
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

    document.addEventListener("keydown", e => {
      // checking for which key is pressed
      if (e.key === "w") {
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
    if (
      this.state.playerX !== prevState.playerX ||
      this.state.playerY !== prevState.playerY
    ) {
      this.drawTorch(
        this.state.x,
        this.state.y,
        this.state.torchW,
        this.state.torchH
      );
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
