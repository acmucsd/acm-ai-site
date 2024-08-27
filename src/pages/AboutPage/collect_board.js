const fs = require("fs");
const papa = require("papaparse");
const axios = require('axios');

const csvUrl = 'https://docs.google.com/spreadsheets/d/1yaMCG13550I3hfh1xtNqfXeBGkGtuEACN58ycn6sOpQ/pub?output=csv';
const outputPath = "../../../public/bios.csv";

const fetchData = async(url, outputPath) => {
    try {
        const response = await axios.get(url, { responseType: 'text' });

        papa.parse(response.data, {
            header: false,
            complete: (results) => {
                const filteredRows = results.data;

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