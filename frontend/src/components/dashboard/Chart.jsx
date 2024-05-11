import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import {  Line } from "react-chartjs-2";

export default function Chart({ patients }) {
    const labels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const [monthlyCount, setMonthlyCount] = useState(Array(12).fill(0));

    useEffect(() => {
        const counts = Array(12).fill(0);
        patients.forEach(patient => {
            const month = parseInt(patient.created_at.substr(5, 2), 10);
            counts[month - 1]++;
        });
        setMonthlyCount(counts);
    }, [patients]);

    const data = {
        labels: labels,
        datasets: [{
            label: 'Patients',
            data: monthlyCount,
            backgroundColor: '#064FF0',
            borderColor: '#064FF0',
            tension: 0.5,
            borderWidth: 2

        }]
    };

    const options = {
      plugins: {
          title: {
              display: true,
              text: 'Monthly Patients',
              align: 'start',
              font: {
                size: 20,
                color: 'white'  
              }
          }
      }
  };
  

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}
