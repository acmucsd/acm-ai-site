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
const fetchData = async (url: string): Promise<void> => {
  try {
    const response = await axios.get(url);
    const rows = response.data.values;
    const people: Person[] = [];

    if (rows && rows.length > 0) {
      const header = rows[0]; 

      rows.slice(1).forEach((row: string[]) => {
        const person: Person = {
          section: row[0] || '',
          role: row[1] || '',
          name: row[2] || '',
          major: row[3] || '',
          bio: row[4] || '',
          picture: row[5] || "/logo512.png", 
          socials: {
            website: row[6] || '',
            github: row[7] || '',
            linkedin: row[8] || '',
          }
        };
        
        switch (person.section) {
          case 'dev':
            dev.push(person);
            break;
          case 'operations':
            operations.push(person);
            break;
          case 'marketing':
            marketing.push(person);
            break;
          case 'socials':
            socials.push(person);
            break;
          case 'directors':
            directors.push(person);
            break;
          default:
            break;
        }
      });
    }

  } catch (error) {
    console.error("Error fetching or processing Google Sheets data:", error);
  }
};

fetchData(csvUrl);
export { dev, marketing, directors, operations, socials };
