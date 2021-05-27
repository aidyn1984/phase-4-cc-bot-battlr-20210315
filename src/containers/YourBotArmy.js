import React, { Component } from "react";
import BotCard from "../components/BotCard";

class YourBotArmy extends Component {
  
  createArmyCards = () => {
    return this.props.myArmyCollection.map(bot => {
      return (
        <BotCard
          key={bot.id}
          bot={bot}
          onClickBot={this.props.removeFromBotArmy}
          deleteBot={this.props.deleteBot}
        />
      )
    })
  }

  render() {
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            {this.createArmyCards()}
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;