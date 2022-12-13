import React from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from './Chart.module.css'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Chart() {

    const [performanceArray] = useAppSelector(
        ({user: {performanceArray}}) => {
            return [performanceArray];
        }
    );

    const options = {
        indexAxis: 'y' as const,
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
              display:false,
          },
          title: {
            display: true,
            text: 'Guess Distribution',
          },
        },
    };
      
    const labels = ["1","2","3","4","5","6","7","8","9","10"]
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Number of Games',
            data: performanceArray,
            borderColor: 'rgb(40, 116, 166)',
            backgroundColor: 'rgba(171, 200, 218, 0.8)', 
          }
        ],
      };
  return <Bar className={styles.bar} options={options} data={data} />;
}