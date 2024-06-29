import { Doughnut } from 'react-chartjs-2';
import { Chart, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

interface PieChartProps {
    subscriptionType: string[];
    total: number[];
}

const PieChart = ({ subscriptionType, total }: PieChartProps) => {

    const chartData = {
        labels: subscriptionType,
        datasets: [
            {
                label: 'Payment type rate',
                data: total,
                backgroundColor: ['#E2B77B', '#C8CFA0', '#C0D6E8'], 
                borderColor: ['#E2B77B', '#C8CFA0', '#C0D6E8'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions: ChartOptions<'doughnut'> = {
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
                    }
                }
            },
            tooltip: {
                enabled: true,
            },
        }
    };
    
    return (
        <Doughnut data={chartData} options={chartOptions} />
    );
};

export default PieChart;
