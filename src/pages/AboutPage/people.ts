import Papa from "papaparse";
import axios from 'axios';

export interface Socials {
  readonly website?: string;
  readonly github?: string;
  readonly linkedin?: string;
}

export interface Person {
  readonly section: string;
  readonly role: string;
  readonly name: string;
  readonly major: string;
  readonly bio: string;
  picture?: string;
  readonly socials?: Socials;
}

const directors: Person[] = [];
const operations: Person[] = [];
const dev: Person[] = [];
const marketing: Person[] = [];
const socials: Person[] = [];

const csvUrl = process.env["REACT_APP_BOARD_BIOS"] as string;

const processCSVData = (data: string): void => {
  Papa.parse(data, {
      header: true,
      complete: () => {},
      error: (error: any) => {
          console.log('Error parsing CSV data:', error);
      }
  });
};

const fetchData = async (url: string): Promise<void> => {
  try {
      const response = await axios.get<string>(url, { responseType: 'text' });
      processCSVData(response.data);
      
  } catch (error) {
      console.log("Error fetching or processing CSV data: " + error);
  }
};

fetchData(csvUrl);

const processCSVFile = (filePath: string): void => {
  fetch(filePath, { credentials: 'omit' })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(csvData => {
      Papa.parse<Person>(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          dev.length = 0;
          operations.length = 0;
          marketing.length = 0; 
          socials.length = 0;
          directors.length = 0;

          results.data.forEach(row => {
            if (row.picture === "") {
              row.picture = "/logo512.png";
            }

            if (row.section === 'dev') {
              dev.push(row);
            } else if (row.section === 'operations') {
              operations.push(row);
            } else if (row.section === 'marketing') {
              marketing.push(row);
            } else if (row.section === 'socials') {
              socials.push(row);
            } else if (row.section === 'directors') {
              directors.push(row);
            }
          });
        },
        error: (error: any) => {
          console.error('Error parsing CSV:', error);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching CSV file:', error);
    });
};

processCSVFile("/bios.csv");
export { dev, marketing, directors, operations, socials };