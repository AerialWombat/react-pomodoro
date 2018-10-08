import React, { Component } from 'react';
import './App.css';
import Timer from './Timer';
import ModeBar from './ModeBar';

class App extends Component {
  constructor() {
    super()
    this.state = {
      timerType: 'pomodoro',
      isTimerOn: false,
      timeRemaining: 1500000,
      minutes: 25,
      seconds: 0
    }

    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.tick = this.tick.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  componentDidMount() {
    Notification.requestPermission().then(function(result) {
    })
  }

  // Check if timer has not started or has been paused, if so, start timer
  handleStart() {
    if (!this.state.isTimerOn) {
      this.setState({isTimerOn: true});
      this.tick();
      this.timerID = setInterval(
        () => this.tick(), 1000
      );
    }
  }

  handlePause() {
    this.setState({isTimerOn: false});
    clearInterval(this.timerID);
  }

  handleReset() {
    this.setState({isTimerOn: false});
    clearInterval(this.timerID);
    switch (this.state.timerType){
      case 'pomodoro':
        this.setState({
          timeRemaining: 1500000,
          minutes: 25,
          seconds: 0
        });
        break;
      case 'shortbreak':
        this.setState({
          timeRemaining: 300000,
          minutes: 5,
          seconds: 0
        });
        break;
      case 'longbreak':
        this.setState({
          timeRemaining: 900000,
          minutes: 15,
          seconds: 0
        });
        break;
      default:
        return;
    }
  }

  tick() {
    const timerLeft = this.state.timeRemaining - 1000;
    const currentMin = Math.floor(this.state.timeRemaining / 60000);
    const currentSec = (this.state.timeRemaining - (currentMin * 60000)) / 1000;

    this.setState({
      timeRemaining: timerLeft,
      minutes: currentMin,
      seconds: currentSec
    })

    // Check if time remaining is 0
    if (currentMin === 0 && currentSec === 0) {
      this.setState({isTimerOn: false});
      clearInterval(this.timerID);
      new Notification('Time\'s up!');
    }

  }

  handleModeChange(event) {
    this.handlePause();

    switch (event.target.id){
      case 'pomodoro':
        this.setState({
          timeRemaining: 1500000,
          minutes: 25,
          seconds: 0
        });
        break;
      case 'shortbreak':
        this.setState({
          timeRemaining: 300000,
          minutes: 5,
          seconds: 0
        });
        break;
      case 'longbreak':
        this.setState({
          timeRemaining: 900000,
          minutes: 15,
          seconds: 0
        });
        break;
      default:
        return;
    }
    this.setState({timerType: event.target.id.toLowerCase()});
  }

  render() {
    const { minutes, seconds } = this.state;
    return (
      <div className='container'>
        <ModeBar onModeChange={this.handleModeChange}/>
        <Timer minutesRemaining={minutes} secondsRemaining={seconds} onStart={this.handleStart} onPause={this.handlePause} onReset={this.handleReset} />
      </div>
    );
  }
}

export default App;
