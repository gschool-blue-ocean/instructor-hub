import style from '../../../styles/StudentStatsRight.module.css'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {useState} from 'react'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatusRight = () => { 

  const [teckSkill, setTeckSkill] = useState([1, 3, 4, 2])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // if we want multiple options then we can display true here
        // positiomn: 'bottom',
        //align:'center',
      },
      title: {
        display: true,
        text: 'Progress Over time',
        font: {size: 15},
      },
    },
    scales: {
      x:{
        grid:{
          display: false,
        }
      },
    }
  };

  const labels = ['month 1', 'month 2', 'month 3', 'month 4'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Fake progress',
        data: teckSkill,
        borderColor: 'blue',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4, 
        // pointRadius: 1, 
      },
    ],
  };
  
  return (
    <div className={style.container}>
      <div className={style.graphCon}>
        <Line className={style.graph}  options={options} data={data} />
      </div>
      <div className={style.avrgScoreCon}>
        <div>
          <span>Project Average</span>
          <span>50%</span>
        </div>
        <div>
          <span>Assesment Average</span>
          <span>50%</span>
        </div>
        <div>
          <span>Softskills Average</span>
          <span>50%</span>
        </div>
      </div>
    </div>
  )
}

export default StatusRight
