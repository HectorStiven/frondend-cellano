import React, { useEffect, useState } from "react";
import { Chart } from 'primereact/chart';
import { Grid } from '@mui/material';
import { Title } from "../Titulo/Titulo";

export const GraficaUnoPlana = ({ titulo }: any) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Libros',
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <Grid container justifyContent="center" >
            <Grid size={{ xs: 12 }} >
                <Title title={titulo || ""} />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <Chart type="bar" data={chartData} options={chartOptions} />
            </Grid>
        </Grid>
    )
}
