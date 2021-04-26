import React from 'react';
import dateFormat from 'dateformat';
import compareButtonIcon from "../img/compareButtonIcon.png";
import leftArrowButton from "../img/left-arrow.png";
import rightArrowButton from "../img/right-arrow.png";
import downArrowButton from "../img/down-arrow.png";
import {roundTo} from "../util";

class CompareView extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: null,
      isShowMoreFailure: false,
      isShowMoreItem: false,
      gesamtBetragNv: 0,
      gesamtBetragPd: 0,
      gesamtBetragDiff: 0,
      gesamtFailureBetragNv: 0,
      gesamtFailureBetragPd: 0,
      gesamtFailureBetragDiff: 0,
      gesamtItemsBetragNv: 0,
      gesamtItemsBetragPd: 0
    }
  }

  dateToString = (date) => {
    return dateFormat(date, "dd.mm.yyyy HH:MM:ss")
  }

  selectItem = (id) => {
    let selectedItem = id ? this.props.documents.find(item => item._id == id) : null;
    let gesamtBetragNv = 0;
    let gesamtBetragPd = 0;
    let gesamtBetragDiff = 0;
    let gesamtFailureBetragNv = 0;
    let gesamtFailureBetragPd = 0;
    let gesamtFailureBetragDiff = 0;
    let gesamtItemsBetragNv = 0;
    let gesamtItemsBetragPd = 0;

    for (let item in selectedItem.compare)
    {
      gesamtBetragNv += "nvFile" in selectedItem.compare[item] ? selectedItem.compare[item].nvFile : 0;
      gesamtBetragPd += "pdFile" in selectedItem.compare[item] ? selectedItem.compare[item].pdFile : 0;
      gesamtBetragDiff += this.diffItems(selectedItem.compare[item].nvFile, selectedItem.compare[item].pdFile);

      if (selectedItem.compare[item].pdFile !== selectedItem.compare[item].nvFile)
      {
        gesamtFailureBetragNv += "nvFile" in selectedItem.compare[item] ? selectedItem.compare[item].nvFile : 0;
        gesamtFailureBetragPd += "pdFile" in selectedItem.compare[item] ? selectedItem.compare[item].pdFile : 0;
        gesamtFailureBetragDiff += this.diffItems(selectedItem.compare[item].nvFile, selectedItem.compare[item].pdFile);
      }
      else
      {
        gesamtItemsBetragNv += "nvFile" in selectedItem.compare[item] ? selectedItem.compare[item].nvFile : 0;
        gesamtItemsBetragPd += "pdFile" in selectedItem.compare[item] ? selectedItem.compare[item].pdFile : 0;
      }
    }

    this.setState({
      selectedItem,
      gesamtBetragNv,
      gesamtBetragPd,
      gesamtBetragDiff,
      gesamtFailureBetragNv,
      gesamtFailureBetragPd,
      gesamtFailureBetragDiff,
      gesamtItemsBetragNv,
      gesamtItemsBetragPd})
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
      <React.Fragment>
        <div className={`compareContainer ${this.state.isShowMoreFailure ? "showMore" : ""}`}>
          <div className="showMoreButton" onClick={() => this.setState({isShowMoreFailure: !this.state.isShowMoreFailure})}>
            <div className="expandHeader">
              <div><img src={rightArrowButton} /></div>
              <div></div>
              <div>{roundTo(this.state.gesamtFailureBetragNv, 2)}€</div>
              <div>{roundTo(this.state.gesamtFailureBetragPd, 2)}€</div>
              <div>{roundTo(this.state.gesamtFailureBetragDiff, 2)}€</div>
            </div>
            <div className="compareHeader">
              <div><img src={downArrowButton} /></div>
              <div>Belegnr</div>
              <div>NV</div>
              <div>PD</div>
              <div>Diff</div>
            </div>
          </div>
          <div className="showMoreContainer failureContainer">
            {failureItems}
          </div>
        </div>
      </React.Fragment>
    )

    let itemContainer = (
      <div className={`compareContainer ${this.state.isShowMoreItem ? "showMore" : ""}`}>
        <div className="showMoreButton" onClick={() => this.setState({isShowMoreItem: !this.state.isShowMoreItem})}>
          <div className="expandHeader">
            <div><img src={rightArrowButton} /></div>
            <div></div>
            <div>{roundTo(this.state.gesamtItemsBetragNv, 2)}€</div>
            <div>{roundTo(this.state.gesamtItemsBetragPd, 2)}€</div>
            <div>-</div>
          </div>
          <div className="compareHeader">
            <div><img src={downArrowButton} /></div>
            <div>Belegnr</div>
            <div>NV</div>
            <div>PD</div>
            <div></div>
          </div>
        </div>
        <div className="showMoreContainer itemContainer">
          {items}
        </div>
      </div>
    )

    return [failureContainer, itemContainer];
  }

  render = () => {
    return (
      <div id={this.props.id} className={`view ${this.state.selectedItem ? "itemSelected" : ""}`}>
        {this.props.documents.map(value => (
          <div key={value._id} className="documentEntry">
            <div className="checkbox">
              <input checked={this.props.isInSelection(value._id)} onChange={() => this.props.changeSelection(value)} type="checkbox" id={`checkbox-${value._id}`}/>
              <label htmlFor={`checkbox-${value._id}`}></label>
            </div>
            <div className="comparedFilename clickable" onClick={() => this.selectItem(value._id)}>{value.compare.comparedFiles[0]} <img src={compareButtonIcon}/> {value.compare.comparedFiles[1]}</div>
            <div>{this.dateToString(value.date)}</div>
          </div>
        ))}
        <div className={`lookupView ${!this.state.selectedItem ? "hidden" : ""}`}>
          <div className="back clickable" onClick={() => this.setState({selectedItem: null})}><img src={leftArrowButton} /> Zurück</div>
          {this.renderCompareView()}
        </div>
        <div className={`gesamtBetrag ${!this.state.selectedItem ? "hidden" : ""}`}>
          <div className="label">Gesamtbetrag</div>
          <div className="summe">{roundTo(this.state.gesamtBetragNv, 2)}€</div>
          <div className="summe">{roundTo(this.state.gesamtBetragPd, 2)}€</div>
          <div className="sume">{roundTo(this.state.gesamtBetragDiff, 2)}€</div>
        </div>
      </div>
    )
  }
}

export default CompareView;