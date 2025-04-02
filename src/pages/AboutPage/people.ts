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

const csvUrl = process.env["REACT_APP_BOARD_BIOS"] as string;
const fetchData = async (): Promise<Record<string, Person[]>>=> {
  try {
    const response = await axios.get(csvUrl);
    const rows = response.data.values;

    const teams: Record<string, Person[]> = {
      directors: [],
      operations: [],
      dev: [],
      marketing: [],
      socials: [],
      staff: [],
    };

    if (rows && rows.length > 1) {
      rows.slice(1).forEach((row: string[]) => {
        const person: Person = {
          section: row[0] || '',
          role: row[1] || '',
          name: row[2] || '',
          major: row[3] || '',
          bio: row[4] || '',
          picture: row[5] || "/logo512.png", 
          socials: {
            github: row[6] || '',
            linkedin: row[7] || '',
            website: row[8] || '',
          }
        };
        
        if (teams[person.section]) {
          teams[person.section].push(person);
        }
      });
    }

    return teams;
  } catch (error) {
    console.error("Error fetching or processing Google Sheets data:", error);
    return {
      directors: [],
      operations: [],
      dev: [],
      marketing: [],
      socials: [],
      staff: [],
    };
  }
};

export { fetchData };