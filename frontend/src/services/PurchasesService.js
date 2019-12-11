import axios from "axios";
import { createGraphData, createItemsData, createSuppliersData } from "./utils";

export function getPurchasesInfo() {
  return axios.get("/api/jasmin/purchases").then(res => {
    console.log(res);

    const open = res.data.open;
    let invoiced = res.data.invoiced;

    const graphData = createGraphData("Purchases", invoiced);

    const itemsData = createItemsData("Items", invoiced);

    const suppliersData = createSuppliersData("Suppliers", invoiced);

    console.log(suppliersData);

    const totalOpenValue = open.reduce((a, b) => a + b.amount, 0);
    const totalReceiptValue = invoiced.reduce((a, b) => a + b.amount, 0);

    return {
      open,
      invoiced,
      totalOpenValue,
      totalReceiptValue,
      graphData,
      itemsData,
      suppliersData
    };
  });
}
