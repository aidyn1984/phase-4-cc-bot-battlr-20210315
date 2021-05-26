import React, { Component } from "react";
import BotCard from '../components/BotCard'

class BotCollection extends Component {
  
  createBots = () => {
    return this.props.bots.map(bot => {
      return (
        <BotCard 
        key={bot.id}
        bot={bot}
        onClick={this.props.addToBotArmy}
        deleteBot={this.props.deleteBot}
        />
      )
    })
  }

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.createBots()}
          Collection of all bots
        </div>
      </div>
    );
  }
}

export default BotCollection;
