import React from 'react';

class Header extends React.Component {

  showPopup = () =>
  {
    this.props.changeState({key: "showImportPopup", value: true})
    this.props.changeState({key: "showPopup", value: true})
  }

   render() {
      return (
        <header>
          <div className="funktionsLeiste">
            Funktionsleiste
            <div>NvFiles selected: {this.props.selection.nvView.length}</div>
            <div>PdFiles selected: {this.props.selection.pdView.length}</div>
          </div>
          <button className="importButton" onClick={this.showPopup}><span className="icon"></span>Importieren</button>
        </header>
      );
   }
}
export default Header;