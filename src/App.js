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
      selection: {pdView: [],
                  nvView: []},
      currentTab: "nvView"
    }
  }

  changeState = ({key, value}) => {
    this.setState({[key]: value});
  }

  isInSelection = (target) => {
    return this.state.currentTab in this.state.selection && this.state.selection[this.state.currentTab].indexOf(target) > -1;
  }

  changeSelection = (id) => {
    let currentTab = this.state.currentTab;
    if (currentTab)
    {
      let selection = this.isInSelection(id) ? 
      this.removeItemFromList(this.state.selection[currentTab], id) : 
      this.state.selection[currentTab].push(id);
    
      this.setState({selection: {...this.state.selection,
                                selection}})
    }
  }

  removeItemFromList = (list, target) => {
    let index = list.indexOf(target);
    return index > -1 ? list.splice(index, 1) : list;
  }

  render() {
    return (
      <React.Fragment>
        <Header changeState={this.changeState} selection={this.state.selection} />
        <Main changeState={this.changeState} selection={this.state.selection} isInSelection={this.isInSelection} changeSelection={this.changeSelection} currentTab={this.state.currentTab}/>
        <ImportPopup showImportPopup={this.state.showImportPopup} changeState={this.changeState}/>
        <ComparePopup showComparePopup={this.state.showComparePopup} changeState={this.changeState}/>
        <div className={`background ${this.state.showPopup ? "active" : ""}`}></div>
      </React.Fragment>
      );
  }
}
export default App;