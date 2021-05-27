import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from "./YourBotArmy";

class BotsPage extends Component {
  
  state = {
    bots: [],
    myArmyCollection: [],
  }

  componentDidMount() {
    this.fetchBots()
  }

  fetchBots = () => {
    fetch('http://localhost:6001/bots')
      .then(response => response.json())
      .then(bots => this.setState({bots}))
  }

  addToBotArmy = (clickedBot) => {

    const thatOneBot = this.state.myArmyCollection.find(bot => {
     return bot.id === clickedBot.id
    })
    if (!thatOneBot) {
      this.setState({
        myArmyCollection: [...this.state.myArmyCollection, clickedBot]
      })
    }
  }

  removeFromBotArmy = (clickedBot) => {

    const updatedArmy = this.state.myArmyCollection.filter(bot => {
      return bot.id !== clickedBot.id
    })

    this.setState({
      myArmyCollection: [...updatedArmy]
    })
  }

  deleteBot = (clickedBot) => {

    const bots = this.state.bots.filter(bot => bot.id !== clickedBot.id)
    
    const myArmyCollection = this.state.myArmyCollection.filter(bot => {
      bot.id !== clickedBot.id
    })

    this.setState({
      bots,
      myArmyCollection: myArmyCollection
    })

    fetch(`http://localhost:6001/bots/${clickedBot.id}` , {
      method: "DELETE"
    })
  }

  render() {
    return ( 
      <div>
        <YourBotArmy
          myArmyCollection={this.state.myArmyCollection}
          removeFromBotArmy={this.removeFromBotArmy}
          deleteBot={this.deleteBot}
        />
        <BotCollection 
          bots={this.state.bots} 
          addToBotArmy={this.addToBotArmy}
          deleteBot={this.deleteBot}
        />
      </div>
    )  
  }
}

export default BotsPage;