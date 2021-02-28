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

    console.log(pdView, nvView);

    if (pdView &&
        nvView &&
        Object.keys(this.props.selection.pdView).length == 1 && 
        Object.keys(this.props.selection.nvView).length == 1)
    {
      return <button onClick={this.props.compareFiles}>Vergleichen</button>
    }
  }

  render() {
    return (
      <header>
        <div className="funktionsLeiste">
          {this.compareButton()}
        </div>
        <button className="importButton" onClick={this.showPopup}><span className="icon"></span>Importieren</button>
      </header>
    );
  }
}
export default Header;