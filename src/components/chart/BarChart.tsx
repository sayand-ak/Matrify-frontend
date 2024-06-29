import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js/auto';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


interface BarChartProps {
    type: string[];
    data: number[];
    param: string;
}

const BarChart = ({ type, data, param }: BarChartProps) => {

    const chartData = {
        type: "bar",
        labels: type,
        datasets: [
            {
                label: 'Number of users',
                data: data,
                backgroundColor: '#E1B77B',
                borderColor: '#daa351',
                borderWidth: 0,
                barPercentage: 1,
                borderRadius: 2,
                
                
            },
        ],
    };

    // Chart.js options
    const chartOptions: ChartOptions<'bar'> = {
        scales: {
            x: {
                type: "category",
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#848387',
                    font: {
                        size: 10, 
                        weight: 'bold', 
                    }
                },
                title: {
                    display: true,
                    text: param
                }
            },
            y: {
                type: "linear",
                stacked: true,
                ticks: {
                    color: '#848383',
                    font: {
                        size: 11, 
                        weight: 'bold', 
                    }
                },
                title: {
                    display: true,
                    text: 'Number of users',
                    color: '#848383',
                    font: {
                        size: 10, 
                    }
                }
            }
        }
    };

    return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
