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
          <h1>SANRIT</h1>
          {/* <button class="iconButton" onClick={this.showPopup}></button> */}
        </header>
      );
   }
}
export default Header;