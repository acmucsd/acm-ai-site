import axios from 'axios';

export interface Socials {
  readonly website?: string;
  readonly github?: string;
  readonly linkedin?: string;
}

export interface Person {
  readonly year: string;
  readonly team: string;
  readonly role: string;
  readonly name: string;
  readonly major: string;
  readonly gradYear: string;
  picture?: string;
  readonly socials?: Socials;
}

const sheetYears = [
  "24-25",
  "23-24",
  "22-23",
  "21-22",
  "20-21",
]

const KEY = process.env.REACT_APP_BOARD_SHEET_KEY as string;
const SHEET_ID = process.env.REACT_APP_BOARD_SHEET_ID as string;
const BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";

const fetchData = async (): Promise<Record<string, Person[]>>=> {
  const years: Record<string, Person[]> = {
    YR_24_25: [],
    YR_23_24: [],
    YR_22_23: [],
    YR_21_22: [],
    YR_20_21: [],
  };

  for (let year of sheetYears) {
    try {
      const response = 
          await axios.get(`${BASE_URL}/${SHEET_ID}/values/${year}?key=${KEY}`);
      const rows = response.data.values;

      let team = '', role = '', picture = '', github = '', website = '', 
          major = '', linkedin = '';

      if (rows && rows.length > 0) {  
        rows.slice(1).forEach((row: string[]) => {
          // Account for different sheet formatting over different years
          switch (year) {
            case '24-25':
              major = row[13] 
              picture = row[20]; 
              website = row[12]; 
              github = row[10]; 
              linkedin = row[11]; 
              break;
            case '23-24':
              major = row[13] 
              picture = row[20]; 
              website = row[12]; 
              github = row[10]; 
              linkedin = row[11]; 
              break;
            case '22-23':
              major = row[13];
              picture = row[21];
              website = row[13];
              github = row[11];
              linkedin = row[12];
              break;
            case '21-22':
              major = row[15]
              website = row[14];
              picture = row[22];
              github = row[12];
              linkedin = row[13];
              break;
            case '20-21':
              major = row[10]
              website = '';
              picture = '';
              github = row[9];
              linkedin = '';
              break;
          }

          if (!row[1] && !row[2]) {
            team = row[0];
          }
          if (!row[1]) {
            role = row[0];
          }

          const person: Person = {
            year: year,
            team: team || row[0],
            role: row[1] || role,
            name: row[2] || '',
            major: major || '',
            gradYear: row[14] || '',
            picture: picture?.startsWith("https://cdn.discordapp.com/") ? 
                "/logo512.png" : picture || "/logo512.png", 
            socials: {
              github: github ? (github.includes('https://')
                  ? github
                  : github.includes("github.com")
                  ? (`https://${github}`)
                  : (`https://github.com/${github}`))
                  : '',
              linkedin: linkedin ? (linkedin.includes('https://')
                  ? linkedin 
                  : (`https://${linkedin}`))
                  : '',
              website: website || '',
            }
          }

          if ((person.team === "AI" || person.team === "ACM AI") && person.name) {
              switch (year) {
                case '24-25': 
                  if (!years["YR_24_25"].find(element => element.name === person.name)) {
                      years["YR_24_25"].push(person);
                      break;
                  }
                case '23-24': 
                  if (!years["YR_23_24"].find(element => element.name === person.name)) {
                    years["YR_23_24"].push(person);
                    break;
                  }
                case '22-23':
                  if (!years["YR_22_23"].find(element => element.name === person.name)) {
                    years["YR_22_23"].push(person);
                    break;
                  }
                case '21-22':
                  if (!years["YR_21_22"].find(element => element.name === person.name)) {
                    years["YR_21_22"].push(person);
                    break;
                  }
                case '20-21':
                  if (!years["YR_20_21"].find(element => element.name === person.name)) {
                    years["YR_20_21"].push(person);
                    break;
                  }
                default:
                  break;
              }
            }
        });
      }
    } catch (error) {
      console.error("Error fetching or processing Google Sheets data:", error);
      return {
        YR_20_21: [], 
        YR_21_22: [], 
        YR_22_23: [], 
        YR_23_24: [],
      };
    }
  }
  return years;
};

export { fetchData }