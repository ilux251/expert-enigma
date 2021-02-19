import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import ImportPopup from './components/ImportPopup';
import ComparePopup from './components/ComparePopup';

class App extends React.Component {

  constructor () {
    super();

    this.state = {
      showImportPopup: false,
      showComparePopup: false,
      showPopup: false
    }
  }

  changeState = ({key, value}) => {
    this.setState({[key]: value});
}

  render() {
    return (
      <React.Fragment>
        <Header changeState={this.changeState}/>
        <Main changeState={this.changeState}/>
        <ImportPopup showImportPopup={this.state.showImportPopup} changeState={this.changeState}/>
        <ComparePopup showComparePopup={this.state.showComparePopup} changeState={this.changeState}/>
        <div class={`background ${this.state.showPopup ? "active" : ""}`}></div>
      </React.Fragment>
      );
  }
}
export default App;