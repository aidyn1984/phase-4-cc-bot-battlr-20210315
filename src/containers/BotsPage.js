import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from "./YourBotArmy";

class BotsPage extends Component {
  
  state = {
    bots: [],
    myColletion: [],
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

    const myBot = this.state.myColletion.find(bot => {
     return bot.id === clickedBot.id
    })
    if (!myBot) {
      this.setState({
        myColletion: [...this.state.myColletion, clickedBot]
      })
    }
  }

  removeFromCollection = (clickedBot) => {

    const updatedArmy = this.state.myColletion.filter(bot => {
      return bot.id !== clickedBot.id
    })

    this.setState({
      myColletion: [...updatedArmy]
    })
  }

  deleteBot = (clickedBot) => {

    const bots = this.state.bots.filter(bot => bot.id !== clickedBot.id)
    
    const myColletion = this.state.myColletion.filter(bot => {
      bot.id !== clickedBot.id
    })

    this.setState({
      bots,
      myColletion: myColletion
    })

    fetch(`http://localhost:6001/bots/${clickedBot.id}` , {
      method: "DELETE"
    })
  }

  render() {
    return ( 
      <div>
        <YourBotArmy
          myColletion={this.state.myColletion}
          removeFromCollection={this.removeFromCollection}
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