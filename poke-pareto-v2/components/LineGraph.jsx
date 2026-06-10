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


export function LineGraph(props) {
    const options = {
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: props.stat1
                },
                min: 0,
                max: 300,
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: props.stat2
                },
                min: 0,
                max: 300,
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
                label: 'Pareto Frontier',
                data: props.winners,
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgb(0, 0, 0)',
            },
        ],
    };

    return <Line options={options} data={data} />
}