import React from 'react';

class Header extends React.Component {

  showPopup = () =>
  {
    this.props.changeState({key: "showImportPopup", value: true})
    this.props.changeState({key: "showPopup", value: true})
  }

  compareButton = () =>
  {
    let {pdView, nvView} = this.props.selection;

    if (pdView &&
        nvView &&
        Object.keys(pdView).length == 1 && 
        Object.keys(nvView).length == 1)
    {
      return (
        <div className="compareData iconButton" onClick={this.props.compareFiles}>
          <span className="image"></span>
          <span className="label">Dateien <br/>vergleichen</span>
        </div>)
    }
  }

  deleteButton = () =>
  {
    let {pdView, nvView, compareView} = this.props.selection;

    if (pdView &&
        nvView &&
        compareView &&
        (Object.keys(pdView).length > 0 || 
         Object.keys(nvView).length > 0 ||
         Object.keys(compareView).length > 0))
    {
      return (
        <div className="deleteData iconButton" onClick={this.props.compareFiles}>
          <span className="image"></span>
          <span className="label">Dateien <br/>löschen</span>
        </div>)
    }
  }

  render() {
    return (
      <header>
        <div className="funktionsLeiste">
          {this.compareButton()}
          {this.deleteButton()}
        </div>
        <button className="importButton" onClick={this.showPopup}><span className="icon"></span>Importieren</button>
      </header>
    );
  }
}
export default Header;