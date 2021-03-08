import React from 'react';
import dateFormat from 'dateformat';
import compareButtonIcon from "../img/compareButtonIcon.png";

class CompareView extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: null,
      isShowMore: false,
      gesamtBetragNv: 0,
      gesamtBetragPd: 0,
      gesamtBetragDiff: 0
    }
  }

  dateToString = (date) => {
    return dateFormat(date, "dd.mm.yyyy hh:mm:ss")
  }

  selectItem = (id) => {
    let selectedItem = id ? this.props.documents.find(item => item._id == id) : null;
    let gesamtBetragNv = 0;
    let gesamtBetragPd = 0;
    let gesamtBetragDiff = 0;

    for (let item in selectedItem.compare)
    {
      gesamtBetragNv += "nvFile" in selectedItem.compare[item] ? selectedItem.compare[item].nvFile : 0;
      gesamtBetragPd += "pdFile" in selectedItem.compare[item] ? selectedItem.compare[item].pdFile : 0;
      gesamtBetragDiff += this.diffItems(selectedItem.compare[item].nvFile, selectedItem.compare[item].pdFile);
    }

    this.setState({
      selectedItem,
      gesamtBetragNv,
      gesamtBetragPd,
      gesamtBetragDiff})
  }

  diffItems = (nvBetrag = 0, pdBetrag = 0) => 
  {
    return Math.abs(nvBetrag - pdBetrag);
  }

  prepareCompareMap = () => {
    let selectedItem = this.state.selectedItem;
    let failureItems = [];
    let items = [];

    if (selectedItem)
    {
      for (let item in selectedItem.compare)
      {
        if (item !== "comparedFiles")
        {
          if (selectedItem.compare[item].pdFile === selectedItem.compare[item].nvFile)
          {
            items.push(
              <div className="compareItem">
                <div className="belegnr">{item}</div>
                <div className="nvFileCompare">{selectedItem.compare[item].nvFile}</div>
                <div className="pdFileCompare">{selectedItem.compare[item].pdFile}</div>
                <div className="diffCompare"></div>
              </div>)
          }
          else
          {
            failureItems.push(
              <div className="compareItem">
                <div className="belegnr">{item}</div>
                <div className="nvFileCompare">{selectedItem.compare[item].nvFile}</div>
                <div className="pdFileCompare">{selectedItem.compare[item].pdFile}</div>
                <div className="diffCompare">{this.diffItems(selectedItem.compare[item].nvFile, selectedItem.compare[item].pdFile)}</div>
              </div>)
          }
        }
      }
    }

    return [failureItems, items];
  }

  renderCompareView = () => {
    let [failureItems, items] = this.prepareCompareMap();

    let failureContainer = (
      <div>
        <div className="compareHeader">
          <div>Belegnr</div>
          <div>NV</div>
          <div>PD</div>
          <div>Diff</div>
        </div>
        <div className="failureContainer">{failureItems}</div>
      </div>
    )

    let itemContainer = (
      <div className={`itemContainer ${this.state.isShowMore ? "" : "hidden"}`}>{items}</div>
    )

    return [failureContainer, itemContainer];
  }

  render = () => {
    return (
      <div id={this.props.id} className="view">
        {this.props.documents.map(value => (
          <div className="documentEntry">
            <div className="checkbox">
              <input checked={this.props.isInSelection(value._id)} onChange={() => this.props.changeSelection(value)} type="checkbox" id={`checkbox-${value._id}`}/>
              <label htmlFor={`checkbox-${value._id}`}></label>
            </div>
            <div className="comparedFilename">{value.compare.comparedFiles[0]} <img src={compareButtonIcon}/> {value.compare.comparedFiles[1]}</div>
            <div key={value._id} onClick={() => this.selectItem(value._id)}>{this.dateToString(value.date)}</div>
          </div>
        ))}
        <div className={`lookupView ${!this.state.selectedItem ? "hidden" : ""}`}>
          <div className="flexContainer">
            <div onClick={() => this.setState({selectedItem: null})}>&lt; Back</div>
            <div onClick={() => this.setState({isShowMore: !this.state.isShowMore})}>Show More ...</div>
          </div>
          {this.renderCompareView()}
        </div>
        <div className={`gesamtBetrag ${!this.state.selectedItem ? "hidden" : ""}`}>
          <div className="label">Gesamtbetrag</div>
          <div className="summe">{this.state.gesamtBetragNv} €</div>
          <div className="summe">{this.state.gesamtBetragPd} €</div>
          <div className="sume">{this.state.gesamtBetragDiff} €</div>
        </div>
      </div>
    )
  }
}

export default CompareView;