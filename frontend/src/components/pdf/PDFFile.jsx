import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { FaTooth } from 'react-icons/fa';

const styles = StyleSheet.create({
  container: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
  },

  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', 
    flexDirection:'row',
    padding: '10px',
    marginTop: '10px',
    width: '100%',
  },
  hr: {
    borderBottom: '1px solid #E5E7EB', // Tailwind color border-b
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
  },
  flexStart: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  textGray: {
    color: '#6B7280', // Tailwind color text-gray-500,
    fontSize: '13px',
  },
  bgGray: {
    backgroundColor: '#E5E7EB', // Tailwind color bg-gray-200
  },
});

const PDFFile = ({ data }) => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <Text>
            <FaTooth />
            DentCare
          </Text>
        </View>
        <View style={{width:"100%"}}>
        <View style={styles.flexBetween}>
          <View style={styles.flexCol}>
            <Text style={{ fontSize: '12px' }}>
              Doctor Name: {data?.doctor?.first_name} {data?.doctor?.last_name}
            </Text>
            <Text style={{ fontSize: '12px' }}>
              Doctor Email: {data?.doctor?.email}
            </Text>
            <Text style={{ fontSize: '12px' }}>
              Service: {data?.service?.name}
            </Text>
          </View>
          <View style={styles.flexCol}>
            <Text style={{ fontSize: '12px' }}>
              Patient Name: {data?.patient?.first_name} {data?.patient?.last_name}
            </Text>
            <Text style={{ fontSize: '12px' }}>
              Patient Email: {data?.patient?.email}
            </Text>
            <Text style={{ fontSize: '12px' }}>
              Payment Method: {data?.payment_method}
            </Text>
            <Text style={{ fontSize: '12px' }}>
              Payment Status: {data?.payment_status}
            </Text>
          </View>
        </View>
        </View>
        <View style={styles.hr} />
        <View style={styles.flexCenter}>
          <Text style={{ fontSize: '12px' }}>
            Appointment Date:
          </Text>
          <Text>{data.appointment_date}</Text>
        </View>
        <View style={styles.flexStart}>
          <Text style={{ fontSize: '12px' }}>
            Amount:
          </Text>
          <Text style={styles.textGray}>
            Charge: ${data.amount}
          </Text>
          <Text style={styles.textGray}>
            Extra Charge: $0
          </Text>
          <View style={styles.bgGray}>
            <Text styl={{fontSize:'13px'}}>
              Payable Amount: ${data.amount}.00
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
