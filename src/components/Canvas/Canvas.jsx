import React, { Component } from "react"

// component imports
import RoomInfo from "../RoomInfo/RoomInfo"
import PlayerList from "../playerList/playerList"
import Win from "../Win/Win"

// utils imports
import { axiosWithAuth } from "../../utils/axiosWithAuth"

// stylesheet & image imports
import "./Canvas.scss"
import Player from "../../assets/torch.png"

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
    gameMapArr: [],
    message: null
  }

  drawCanvas = () => {
    const ctx = this.refs.canvas.getContext("2d")
    for (let y = 0; y <= 47; y++) {
      for (let x = 0; x <= 47; x++) {
        if (this.state.gameMapArr[y * 47 + x]) {
          ctx.fillStyle = "#eee"
        } else {
          ctx.fillStyle = "#999"
        }
        ctx.fillRect(
          x * this.state.tileW,
          y * this.state.tileH,
          this.state.tileW,
          this.state.tileH
        )
      }
    }
  }

  drawTorch = (x, y, width, height) => {
    const ctx = this.refs.canvas.getContext("2d")
    const img = new Image()
    img.src = Player
    console.log("playerX", this.state.playerX)
    console.log("playerY", this.state.playerY)
    ctx.drawImage(
      img,
      this.state.playerX * 30 + 15, //0 * 15 * 2 +15= 15      =15
      this.state.playerY * 30 + 15, //1 * 15 * 2 + 15= 45     =30
      width,
      height
    )
  }

  verifyMovement = () => {
    axiosWithAuth()
      .post("api/adv/move/", this.state.location)
      .then(res => {
        let temp = 0
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
        })
        if (res.data.error_msg === "") {
          switch (this.state.location.direction) {
            case "w":
              temp = this.state.x
              temp -= 30
              this.setState({
                ...this.state,
                x: temp
              })
              break
            case "e":
              temp = this.state.x
              temp += 30
              this.setState({
                ...this.state,
                x: temp
              })
              break
            case "n":
              temp = this.state.y
              temp -= 30
              this.setState({
                ...this.state,
                y: temp
              })
              break
            case "s":
              temp = this.state.y + 30
              this.setState({
                ...this.state,
                y: this.state.y + 30
              })
              break
            default:
              break
          }
        } else if (res.data.message) {
          this.setState({
            ...this.state,
            message: res.data.message
          })
        }
      })
      .catch(err => err.res)
  }

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
        })
      })
      .catch(err => err.err)

    axiosWithAuth()
      .get("/api/adv/gamemap/")
      .then(res => {
        this.setState({
          ...this.state,
          gameMapArr: res.data.gameMap.flat()
        })
      })

    document.addEventListener("keydown", e => {
      // checking for which key is pressed
      if (e.key === "w") {
        this.setState({
          ...this.state,
          location: {
            direction: "n"
          }
        })
        this.verifyMovement()
      } else if (e.key === "a") {
        this.setState({
          ...this.state,
          location: {
            direction: "w"
          }
        })
        this.verifyMovement()
      } else if (e.key === "s") {
        this.setState({
          ...this.state,
          location: {
            direction: "s"
          }
        })
        this.verifyMovement()
      } else if (e.key === "d") {
        this.setState({
          ...this.state,
          location: {
            direction: "e"
          }
        })
        this.verifyMovement()
      }
    })
  }

  componentDidUpdate = prevState => {
    if (this.state.gameMapArr !== prevState) {
      this.drawCanvas()
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
      )
    }
  }

  reset = () => {
    axiosWithAuth()
      .get("/api/adv/reset")
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
        })

        window.location.reload()
      })
  }

  render() {
    return (
      <div>
        {this.state.message ? (
          <dialog open>
            <Win message={this.state.message} reset={this.reset} />
          </dialog>
        ) : (
          <dialog>
            <Win message={this.state.message} reset={this.reset} />
          </dialog>
        )}
        <div className="canvas-wrapper">
          <canvas ref="canvas" id="canvas" height="705" width="705"></canvas>
          {this.state.room ? (
            <div className="Direction-Buttons">
              <div className="game-info-wrapper">
                <PlayerList
                  players={this.state.room.players}
                  current={this.state.room.name}
                />
                <RoomInfo room={this.state.room} />
              </div>
            </div>
          ) : (
            <div>
              <div className="game-info-wrapper">
                <PlayerList
                  players={this.state.room.players}
                  current={this.state.room.name}
                />
                <RoomInfo room={this.state.room} />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
