const fs = require("fs");
const papa = require("papaparse");
const axios = require('axios');

const csvUrl = 'https://docs.google.com/spreadsheets/u/3/d/e/2PACX-1vQwZzdPyMYxxJF-9FZMLxis3Raq3ZqhWO28kEFhbO6HYtPqV7YvcX8h0GYmr35Is9tCHjCwA06RkoRr/pub?output=csv';
const outputPath = "output.csv";

const fetchData = async(url, outputPath) => {
    try {
        const response = await axios.get(url, { responseType: 'text' });

        papa.parse(response.data, {
            header: false,
            complete: (results) => {
                const filteredRows = results.data.filter(row => (row[0] == 'AI' && row[2] !== ''));
                //const filteredRows = results.data;

                const csv = papa.unparse(filteredRows);
                fs.writeFileSync(outputPath, csv, 'utf-8');

                console.log("Data written to " + outputPath);
            },
            error: (error) => {
                console.log("Error parsing CSV data: " + error);
            }
        });
    } catch (error) {
        console.log("Error fetching or converting CSV data: " + error);
    }
}

fetchData(csvUrl, outputPath);