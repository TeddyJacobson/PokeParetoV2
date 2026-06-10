import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    plugins,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
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
    plugins: {
        tooltip: {
            callbacks: {
                title: () => "",
                label: (tooltipItem) => {
                    let raw = tooltipItem.raw
                    return `${raw.name} | (${raw.x},${raw.y})`
                }
            }
        }
    }
};

const data = {
    datasets: [
        {
            label: 'Example',
            data: [{ x: 100, y: 100, name: "A" }, { x: 200, y: 200, name: "B" }, { x: 200, y: 200, name: "C" }],
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(0, 0, 0)',
        },
    ],
};


export function LineGraph() {
    return <Line options={options} data={data} />
}