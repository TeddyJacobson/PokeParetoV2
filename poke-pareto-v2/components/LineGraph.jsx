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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const options = {
    scales: {
        x: {
            type: 'linear', 
            title: {
                display: true,
                text: "Stat A"
            },
            min: 0,         
            max: 255,       
        },
        y: {
            type: 'linear',
            title: {
                display: true,
                text: "Stat B"
            },
            min: 0,
            max: 255,
        },
    },
};

const data = {
    datasets: [
        {
            label: 'Pareto Frontier',
            data: [{x:100, y:100}, {x:200, y:200}],
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(0, 0, 0)',
        },
    ],
};


export function LineGraph() {
    return <Line options={options} data={data} />
}