import React, {Component} from 'react'

const getRandomInteger = () => {
  return Math.floor(Math.random()*10)
}

class Parent extends Component {
  state = {
    number1: null,
    number2: null,
    operation: null,
    inputValue: '',
    answers: [],
    seconds: 10,
    timesUp: false,
    score: 0,
    highScore: localStorage.getItem('highScore')
  }
  checkHighScore = () => {
    if (this.state.highScore > 0) {
      if (this.state.score > this.state.highScore) {
        localStorage.setItem('highScore', this.state.score)
        this.setState({
          highScore: localStorage.getItem('highScore')
        })
      };
    }
    else {
      localStorage.setItem('highScore', this.state.score);
      this.setState({
        highScore: localStorage.getItem('highScore')
      })
    }
  }
  tick = () => {
    document.getElementById('input-multiply').disabled=false;
    this.setState({
      number1: getRandomInteger(),
      number2: getRandomInteger(),
      operation: 'x',
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
      this.checkHighScore();
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
    let correctAnswer = this.state.number1+this.state.number2;

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
      operation: '+',
      inputValue: ''
    })
  }
  render() {
    return (
      <div className="App-multiply">
        <h2>{this.state.number1}{this.state.operation}{this.state.number2}</h2>
        <h2>Seconds: {this.state.seconds}</h2>
        <button onClick={this.tick}>Start</button>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="input-multiply" className="input" value={this.state.inputValue} onChange={this.handleChange} disabled={true}/>
        </form>
        <h2>Score: {this.state.score} HighScore: {localStorage.getItem('highScore')}</h2>
      </div>
    );
  }
}

export default Parent
