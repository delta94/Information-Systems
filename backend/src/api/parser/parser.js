'use strict';

const moment = require('moment');
const parser = require('xml2js');
const Invoice = require('../../models/invoice');
const InvoiceProduct = require('../../models/invoiceProduct');
const Customer = require('../../models/customer');
const CustomerController = require('../../controllers/customer');

const { parseString } = parser;

function parseXML(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const parseCustomers = xml2js => {
  return Promise.all(
    xml2js.AuditFile.MasterFiles[0].Customer.map(async customer => {
      const result = await Customer.findOne({
        CustomerID: customer.CustomerID[0],
      });

      if (result === null) {
        const cust = new Customer({
          CustomerID: customer.CustomerID[0],
          CustomerTaxID: customer.CustomerTaxID[0],
          CompanyName: customer.CompanyName[0],
        });

        await cust.save();
        return true;
      }
      return false;
    }),
  );
};

const parseInvoices = xml2js => {
  return new Promise(resolve => {
    xml2js.AuditFile.SourceDocuments[0].SalesInvoices[0].Invoice.forEach(
      invoice => {
        const newInvoice = new Invoice({
          invoiceNo: invoice.InvoiceNo[0],
          invoiceType: invoice.InvoiceType[0],
          invoiceDate: invoice.InvoiceDate[0],
          netTotal: invoice.DocumentTotals[0].NetTotal[0],
          grossTotal: invoice.DocumentTotals[0].GrossTotal[0],
        });

        invoice.Line.forEach(line => {
          const newProductInvoice = new InvoiceProduct({
            productCode: line.ProductCode[0],
            productDescription: line.ProductDescription[0],
            quantity: line.Quantity[0],
            unitPrice: line.UnitPrice[0],
            date: moment(invoice.InvoiceDate[0]),
          });

          newProductInvoice.save();
          newInvoice.invoiceProducts.push(newProductInvoice);
        });

        CustomerController.getById(invoice.CustomerID[0]).then(
          customerdb => {
            newInvoice.customer = customerdb;
            newInvoice.save().then(() => resolve());
          },
        );
      },
    );
  });
};

module.exports = {
  parseXML,
  parseInvoices,
  parseCustomers,
};
