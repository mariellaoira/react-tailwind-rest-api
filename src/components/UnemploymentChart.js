import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import axios from 'axios';

const UnemploymentChart = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=demo'
                );

                let result = response.data.data;
                let values = Object.values(result);

                console.log(values);

                setData(values);

            } catch (error) {
                console.error('Error fetching data:', error);
            }


        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <div style={{ width: '100%', height: '100%' }}>
                <LineChart
                    width={1140}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </ResponsiveContainer>
    );
};

export default UnemploymentChart;
