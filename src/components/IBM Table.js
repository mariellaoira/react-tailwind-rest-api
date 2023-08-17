import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function IBMTable() {

    const TIME_SERIES_HEAD = ["Month", "Open", "Low", "High", "Close", "Volume", "Status"];
    const [timeSeries, setTimeSeries] = useState([]);

    useEffect(() => {
        const apiKey = 'demo';
        const symbol = 'IBM';
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;

        axios.get(apiUrl)
            .then(response => {
                const data = response.data['Monthly Time Series'];

                // Filter the timeSeries for the years 2022 and 2023
                const dataArray = Object.entries(data).filter(([date, _]) => {
                    const year = new Date(date).getFullYear();
                    return year === 2022 || year === 2023;
                });

                // Sort the filtered data by date (ascending order)
                dataArray.sort((a, b) => a[0].localeCompare(b[0]));

                // Convert the sorted array back to an object
                const sortedTimeSeries = Object.fromEntries(dataArray);

                setTimeSeries(sortedTimeSeries);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    try {
        return (
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                {TIME_SERIES_HEAD.map((head) => (
                                    <th key={head} scope="col" className="bg-gray-100 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>

                            {Object.entries(timeSeries).map(([date, entry]) => {
                                const closePrice = parseFloat(entry['4. close']);
                                const openPrice = parseFloat(entry['1. open']);
                                const isHigher = closePrice > openPrice;

                                return (
                                    <tr key={date} className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{entry['1. open']}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{entry['3. low']}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"> {entry['2. high']}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{entry['4. close']}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{parseInt(entry['5. volume']).toLocaleString()}</td>
                                        <td className="h-px w-px whitespace-nowrap">
                                            <div className="px-6 py-3">
                                                {isHigher ? (
                                                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                        </svg>
                                                        UP
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-green-200">
                                                        <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                                        </svg>
                                                        DOWN
                                                    </span>
                                                )}


                                            </div>
                                        </td>
                                    </tr>

                                );
                            })}


                            {Object.entries(timeSeries).map(([date, entry]) => (


                                <tr key={date} className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{entry['1. open']}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{entry['3. low']}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"> {entry['2. high']}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{entry['4. close']}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{parseInt(entry['5. volume']).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } catch (error) {
        // Handle the error and provide a fallback UI
        return (
            <div>
                An error occurred: {error.message}
            </div>
        );
    }
}

export default IBMTable;