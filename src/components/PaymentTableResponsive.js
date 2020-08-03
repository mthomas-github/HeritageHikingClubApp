import React from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { StyleSheet } from "react-native";
import { AppActionButtonColor, AppTextColor } from "../AppSettings";


export const PaymentTableResponsive = props => {
  return (
    <>
      <Table borderStyle={styles.border} style={styles.table}>
        {/* Header row */}
        <Row
          data={props.headers}
          style={styles.head}
          textStyle={styles.headText}
        />
        {/* Data rows */}
        <Rows data={props.rowData} style={styles.row} textStyle={styles.textData}/>
      </Table>
    </>
  );
};

const styles = StyleSheet.create({
  border: { borderWidth: 0.5 },
  table: { marginTop: 10, marginBottom: 10 },
  head: { height: 40 },
  textData: { margin: 6, color: AppTextColor, fontWeight: '500', textAlign: 'center' },
  headText: { color: AppTextColor, fontWeight: '700', textAlign: 'center' },
  row: { flexDirection: 'row' },
  payButton: { alignSelf: 'center', backgroundColor: AppActionButtonColor, paddingLeft: 40, paddingRight: 40},
});