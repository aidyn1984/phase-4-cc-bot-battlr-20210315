import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from "./YourBotArmy";

class BotsPage extends Component {
  
  // state = {
  //   bots: [],
  //   myColletion: [],
  // }

  constructor(props) {
    super(props);
    this.state = {
      bots: [],
      myColletion: [],
    }
  }

  componentDidMount() {
    this.fetchBots()
  }
  fetchBots = () => {
    fetch('http://localhost:6001/bots')
      .then(response => response.json())
      .then(bots => this.setState({bots}))
  }

  addToBotArmy = (clickRobot) => {

    const myBot = this.state.myColletion.find(bot => {
     return bot.id === clickRobot.id
    })
    if (!myBot) {
      this.setState({
        myColletion: [...this.state.myColletion, clickRobot]
      })
    }
  }

  // removeFromCollection = (clickRobot) => {

  //   // const updatedArray = this.state.myColletion.filter(bot => {
  //     // return bot.id !== clickRobot.id
   
  // }

  deleteBot = (clickRobot) => {

    const bots = this.state.bots.filter(bot => bot.id !== clickRobot.id)
    
    const myColletion = this.state.myColletion.filter(bot => {
      bot.id !== clickRobot.id
    })

    this.setState({
      bots,
      myColletion: myColletion
    })

    fetch(`http://localhost:6001/bots/${clickRobot.id}` , {
      method: "DELETE"
    })
  }

  render() {
    return ( 
      <div>
        <YourBotArmy
          myColletion={this.state.myColletion}
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