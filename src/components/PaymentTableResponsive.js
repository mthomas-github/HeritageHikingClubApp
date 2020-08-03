import React from "react";
import { Table, TableWrapper, Row, Cell, Rows } from "react-native-table-component";
import { StyleSheet } from "react-native";

// Table header items
const head = [
  "Date",
  "Amount",
  "Paid",
];

// Table data rows
const data = [
  ["Now", "$100.00", "false"],
  ["11/1/2020", "$100.00", "false"],
  ["12/1/2020", "$100.00", "false"],
  ["01/1/2021", "$100.00", "false"],
];

// Component for displaying a table of stock data in a responsive manner.
export const PaymentTableResponsive = props => {
  let obj = props.data;
  var data = [];
  var dataSet = [];
  obj.forEach((val, index) => {
    if (obj[index] !== null) {
      for (var i in obj[index]) {
        data.push(obj[index][i]);
      }
      dataSet.push(data);
      data = [];
    }
  })
  console.log("...java Script Array... \n" + JSON.stringify(dataSet));
  return (
    <>
      <Table borderStyle={styles.border} style={styles.table}>
        {/* Header row */}
        <Row
          data={props.headers ? props.headers : head}
          style={styles.head}
          textStyle={styles.text}
        />
        {/* <Rows data={out} /> */}
        {/* Data rows */}
        {/* {
          out.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {
                rowData.map((cellData, cellIndex) => (              
                  <Cell key={cellIndex} data={cellData.date} textStyle={styles.text} />
                ))
              }
            </TableWrapper>
          ))
        } */}
      </Table>
    </>
  );
};

const styles = StyleSheet.create({
  // text: { margin: 6 },
  // head: { height: 40, backgroundColor: "#f1f8ff" },
  // row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  border: { borderWidth: 0.5, borderColor: "#c8e1ff" },
  table: { marginTop: 10, marginBottom: 10 },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
});