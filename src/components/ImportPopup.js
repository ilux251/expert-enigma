import React from "react"
import readXlsxFile from 'read-excel-file'

class ImportPopup extends React.Component {

		componentDidMount = () => 
		{
			let input = document.getElementById('inputImport');

			input.addEventListener('change', () => {
				readXlsxFile(input.files[0]).then((rows) => {
					console.log(rows);
				})
			})
		}

    closePopup = () =>
    {
			this.props.changeState({key: "showImportPopup", value: false})
			this.props.changeState({key: "showPopup", value: false})
    }

    render() {
       return (
            <div class={`popup ${this.props.showImportPopup ? "active" : "hidden"}`}>
							<div class="closePopup" onClick={this.closePopup}></div>
							<div class="container">
								<div><input id="inputImport" type="file" placeholder="Datei auswählen"/></div>
								<div><input type="text" placeholder="Datum setzen"/></div>
								<div class="buttonContainer">
									<button>NV</button>
									<button>Persönliche Dateien</button>
								</div>
							</div>
            </div>
        );
    }
 }
 export default ImportPopup;