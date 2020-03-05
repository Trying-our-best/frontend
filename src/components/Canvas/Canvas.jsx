import React, { useState, useEffect, Component } from "react"

import Player from "../../assets/torch.png"
import PlayerList from "../playerList/playerList"

import { axiosWithAuth } from "../../utils/axiosWithAuth"

import Directions from "../Directions"

export default class Canvas extends Component {
  state = {
    x: 50,
    y: 50,
    torchW: 100,
    torchH: 100,
    tileW: 40,
    tileH: 40,
    location: {
      direction: null
    },
    room: {
      name: null,
      currentRoom: null,
      roomDescription: null,
      players: null
    },
    gameMapArr: []
  }

  drawCanvas = () => {
    const ctx = this.refs.canvas.getContext("2d")
    //draw tiles that make up game map
    //beign by looping through each tile
    for (let y = 0; y < 47; y++) {
      //for each row, go left to right
      for (let x = 0; x < 47; x++) {
        //switch statement lets us choose which color to draw curent tile with
        //find value at corresponding game map index by y*mapW and add x
        // switch (this.state.gameMapArr[y * 47 + x]) {
        //   case 0:
        //     ctx.fillStyle = "#999999"
        //     break
        //   default:
        //     ctx.fillStyle = "#eeeeee"
        // }

        if (this.state.gameMapArr[y * 47 + x]) {
          ctx.fillStyle = "#eee"
        } else {
          ctx.fillStyle = "#999"
        }

        console.log("hit")
        //draw rectangle at coresponding position tile
        ctx.fillRect(
          x * this.state.tileW,
          y * this.state.tileH,
          this.state.tileW,
          this.state.tileH
        )
        break
      }
    }
  }

  drawTorch = (x, y, width, height) => {
    const ctx = this.refs.canvas.getContext("2d")
    ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)

    const img = new Image()
    img.src = Player

    ctx.drawImage(img, x, y, width, height)
  }

  componentDidMount = () => {
    axiosWithAuth()
      .get("/api/adv/init/")
      .then(res => {
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

    axiosWithAuth()
      .get("api/adv/gamemap/")
      .then(res => {
        this.setState({
          ...this.state,
          gameMapArr: res.data.gameMap.flat()
        })
      })

    this.drawCanvas()

    setInterval(() => {
      this.drawTorch(
        this.state.x,
        this.state.y,
        this.state.width,
        this.state.height
      )
    }, 1000 / 30)

    document.addEventListener("keydown", e => {
      if (e.key === "w") {
        this.state.y -= 100
        this.state.location.direction = "n"
      } else if (e.key === "a") {
        this.state.x -= 100
        this.state.location.direction = "w"
      } else if (e.key === "s") {
        this.state.y += 100
        this.state.location.direction = "s"
      } else if (e.key === "d") {
        this.state.x += 100
        this.state.location.direction = "e"
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
        })
        .catch(err => {
          return err.res
        })
    })
  }

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
          width="1040"
          height="650"
          style={{ border: "4px solid green" }}
        ></canvas>
      </div>
    )
  }
}
