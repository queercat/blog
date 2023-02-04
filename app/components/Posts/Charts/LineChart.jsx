import styles from "./LineChart.module.css"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

export default function LineChart(props) {
    let options = {responive: true};

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );  

    ChartJS.defaults.color = "#fff";

    return (
        <Line className={styles.chart} options={options} data={props.data} />
    )
}