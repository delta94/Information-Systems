import React from "react";
import LineChart from "../../components/LineChart/LineChart";
import { getPurchasesInfo } from "../../services/PurchasesService";
import { getData } from "../../utils/data_generator";
import BarChart from "../../components/BarChart/BarChart";
import { useSelector } from "react-redux";

class Purchases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),
      openPurchases: [], // keeps the sourceDocs of the purchases whose receipt was created
      receiptPurchases: [],
      totalOpenValue: 0,
      totalReceiptValue: 0,
      dataGraph: {},
      graphLoaded: false
    };
  }

  componentDidMount() {
    // const {
    //   purchases,
    // } = useSelector((reduxState) => reduxState.purchases);

    getPurchasesInfo().then(result => {
      this.setState({
        openPurchases: result.open,
        receiptPurchases: result.invoiced,
        totalOpenValue: result.totalOpenValue,
        totalReceiptValue: result.totalReceiptValue,
        dataGraph: result.graphData,
        itemData: result.itemsData,
        suppliersData: result.suppliersData,
        graphLoaded: true
      });
    });
  }

  render() {
    return (
      <>
        <div>Total Open Value: {this.state.totalOpenValue}</div>
        <div>Total Receipt Value: {this.state.totalReceiptValue}</div>
        {this.state.graphLoaded && (
          <>
            <div className="main chart-wrapper">
              <LineChart
                data={[this.state.dataGraph]}
                title="Purchases"
                color="#3E517A"
              ></LineChart>
            </div>

            <div className="main chart-wrapper">
              <BarChart
                data={this.state.itemData}
                title="Purchases"
                color="#3E517A"
              ></BarChart>
            </div>

            <div className="main chart-wrapper">
              <BarChart
                data={this.state.suppliersData}
                title="Purchases"
                color="#3E517A"
              ></BarChart>
            </div>
          </>
        )}
      </>
    );
  }
}

export default Purchases;
