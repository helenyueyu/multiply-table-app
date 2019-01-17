import React, {Component} from 'react'
import './Multiply.css'

const getRandomInteger = () => {
  return Math.floor(Math.random()*10)
}

class Multiply extends Component {
  state = {
    number1: 'Multiplication',
    number2: '',
    operation: '',
    inputValue: '',
    answers: [],
    seconds: 60,
    timesUp: false,
    score: 0,
    highScore: localStorage.getItem('highScoreM')
  }
  checkHighScoreM = () => {
    if (this.state.highScore > 0) {
      if (this.state.score > this.state.highScore) {
        localStorage.setItem('highScoreM', this.state.score)
        this.setState({
          highScore: localStorage.getItem('highScoreM')
        })
      };
    }
    else {
      localStorage.setItem('highScoreM', this.state.score);
      this.setState({
        highScore: localStorage.getItem('highScoreM')
      })
    }
  }
  tick = () => {
    document.getElementById('input-multiply').disabled=false;
    this.setState({
      number1: getRandomInteger(),
      number2: getRandomInteger(),
      operation: 'x',
      seconds: 60,
      score: 0
    });
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        seconds: (prevState.seconds === 0) ? prevState.seconds : prevState.seconds - 1
      }));
    if(this.state.seconds===0) {
      clearInterval(this.interval)
      this.setState({
        number1: 'Times Up!',
        number2: '',
        operation: '',
        score: this.state.answers.filter(x => x === 'Right').length,
        answers: []
      });
      this.checkHighScoreM();
      document.getElementById('input-multiply').disabled=true;
      }
    }, 1000);
  }
  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let correctAnswer = this.state.number1*this.state.number2;

    if (parseInt(this.state.inputValue) === correctAnswer) {
      this.setState({
        answers: this.state.answers.concat(['Right'])
      }, function() {
        console.log(this.state.answers)
      })
    } else {
      this.setState({
        answers: this.state.answers.concat(['Wrong'])
      }, function() {
        console.log(this.state.answers)
      })
    }
    this.setState({
      number1: getRandomInteger(),
      number2: getRandomInteger(),
      operation: 'x',
      inputValue: ''
    })
  }
  render() {
    return (
      <div className="App-multiply">
        <h2 className="output">{this.state.number1}{this.state.operation}{this.state.number2}</h2>
        <h2 className="time">Seconds: {this.state.seconds}</h2>
        <button onClick={this.tick}>Start</button>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="input-multiply" className="input" value={this.state.inputValue} onChange={this.handleChange} disabled={true} autoComplete="off"/>
        </form>
        <h2 className="scores">Score:
          <span className="score">
            {this.state.score}
          </span> HighScore:
          <span className="highscore">
            {localStorage.getItem('highScoreM')}
          </span>
            </h2>
      </div>
    );
  }
}

export default Multiply;
