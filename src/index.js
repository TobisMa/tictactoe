import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const PlayerOne = "X";
const PlayerTwo = "O";
const NoPlayer = "";
const StateMsgSnippet = "Waiting for player ";


function Headline(props) {
  return <h2>{props.text}</h2>
}


class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.props = props

    this.state = {
      msg: (StateMsgSnippet + PlayerOne),
      player: PlayerOne,
      winner: NoPlayer,
      field: function() {
        let f = [];
        for (let i = 0; i < 9; i++) {
          f.push(NoPlayer);
        }
        return f;
      } ()
    };
  }

  createField() {
    let table = [];
    for (let i = 0; i < 3; i++) {
      table.push(<tr key={i}>{this.createLine(i)}</tr>);
    }
    return table;
  }

  gameUpdate(e) {
    if (e?.target?.id !== undefined && this.state.field[e.target.id] === NoPlayer && !this.gameOver()) {

      let fieldCopy = this.state.field;
      fieldCopy[e.target.id] = this.state.player;
      let playerTurn = this.getOpponentPlayer();
      
      this.setState(
        {
          player: playerTurn,
          field: fieldCopy,
        }
      );
      this.updateMsg();
    }
  }

  gameOver() {
    if (this.getWinner() === "no one") {
      for (let i = 0; i < this.state.field.length; i++) {
        if (this.state.field[i] === NoPlayer) return false;
      }
    } 
    return true;
  }

  getWinner() {
    let winner = "no one";
    let f = this.state.field;

    for (let i = 0; i < 9; i += 3) {
      if (f[i] === f[i+1] && f[i] === f[f+2] && f[i] !== NoPlayer) {
        winner = f[i];
      }
    }
    // vertical
    for (let i = 0; i < 3; i++) {
      if (f[i] === f[i+3] && f[i] === f[f+6] && f[i] !== NoPlayer) {
        winner = f[i];
      }
    }
    // diagonals
    if (f[0] === f[4] && f[0] === f[8] && f[0] !== NoPlayer) {
      winner = f[0];
    }
    else if (f[2] === f[4] && f[2] === f[6] && f[2] !== NoPlayer) {
      winner = f[2];
    }
    return winner;
  }

  updateMsg() {
    if (this.gameOver()) {
      this.setState({
        msg: "Winner is " + this.getWinner()  
      });
    } else {
      this.setState({
        msg: StateMsgSnippet + this.getOpponentPlayer()
      });
    }
  }

  getOpponentPlayer() {
    return (this.state.player === PlayerOne) ? PlayerTwo : PlayerOne;
  }

  createLine(lineNumber) {
    let line = [];
    for (let i = 0; i < 3; i++) {
      line.push(
        <td key={i} id={lineNumber * 3 + i} onClick={(e) => this.gameUpdate(e)}>
          {this.state.field[3 * lineNumber + i]}
        </td>
      );
    }
    return line;
  }

  render() {
    return (
      <div id="game">
        <Headline text={this.state.msg} />
        <table className="field">
          <tbody>
            {this.createField()}
          </tbody>
        </table>
        <button onClick={(e) => this.reset(e)} id="reset">Reset</button>
      </div>
    );
  }

  reset() {
    this.setState({
      msg: (StateMsgSnippet + PlayerOne),
      player: PlayerOne,
      winner: NoPlayer,
      field: function() {
        let f = [];
        for (let i = 0; i < 9; i++) {
          f.push(NoPlayer);
        }
        return f;
      } ()
    });
    this.gameUpdate(undefined);
  }
}


ReactDOM.render(
  <TicTacToe />,
  document.getElementById('app')
);

reportWebVitals();
