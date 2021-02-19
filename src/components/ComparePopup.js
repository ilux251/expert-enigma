import React from "react"

class ImportPopup extends React.Component {

    closePopup = () =>
    {
			this.props.changeState({key: "showComparePopup", value: false});
			this.props.changeState({key: "showPopup", value: false});
    }

    render() {
       return (
            <div class={`popup ${this.props.showComparePopup ? "active" : "hidden"}`}>
							<div class="closePopup" onClick={this.closePopup}></div>
							<div class="container">
								ComparePopup
							</div>
            </div> 
        );
    }
 }
 export default ImportPopup;