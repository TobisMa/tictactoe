import React from 'react';

function App() {
  return <TicTacToe />;
}

const PlayerOne = "X";
const PlayerTwo = "O";
const NoPlayer = " ";
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
    let f = this.state.field;
    console.log(f);

    for (let index = 0; index < 9; index += 3) {
      if (f[index] === f[index + 1] && f[index] === f[index + 2] && f[index] !== NoPlayer) {
        return f[index];
      }
    }

    for (let index = 0; index < 3; index++) {
      if (f[index] === f[index + 3] && f[index] === f[index + 6] && f[index] !== NoPlayer) {
        return f[index];
      }
    }
    // diagonals
    if (f[0] === f[4] && f[0] === f[8] && f[0] !== NoPlayer) {
      return f[0];
    }
    else if (f[2] === f[4] && f[2] === f[6] && f[2] !== NoPlayer) {
      return f[2];
    }
    return "no one";
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



export default App;
