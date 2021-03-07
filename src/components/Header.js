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
      return <div className="compareData" onClick={this.props.compareFiles}></div>
    }
  }

  deleteButton = () =>
  {
    let {pdView, nvView} = this.props.selection;

    if (pdView &&
        nvView &&
        Object.keys(pdView).length > 0 || 
        Object.keys(nvView).length > 0)
    {
      return <div className="deleteData" ></div>
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