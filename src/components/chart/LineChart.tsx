import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface LineChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            fill: boolean;
            borderColor: string;
            tension: number;
        }[];
    };
}

const LineChart = ({ data }: LineChartProps) => {
    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#848387',
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return <Line data={data} options={chartOptions} />;
};

export default LineChart;
