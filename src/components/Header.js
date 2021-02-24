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
          <button className="importButton" onClick={this.showPopup}><span className="icon"></span>Importieren</button>
        </header>
      );
   }
}
export default Header;