import React from "react"

class ImportPopup extends React.Component {

    closePopup = () =>
    {
			this.props.changeState({key: "showComparePopup", value: false});
			this.props.changeState({key: "showPopup", value: false});
    }

    render() {
       return (
            <div className={`popup ${this.props.showComparePopup ? "active" : "hidden"}`}>
							<div className="closePopup" onClick={this.closePopup}></div>
							<div className="container">
								ComparePopup
							</div>
            </div> 
        );
    }
 }
 export default ImportPopup;