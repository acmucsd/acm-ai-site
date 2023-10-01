import csv 

csv_path = "bios.csv"
ts_path = "people.ts"
ai_logo = "https://i.imgur.com/YqHEpJx.png"

header_mapping = {
    "section" : "section",
    "role": "role",
    "name": "name",
    "major": "major",
    "bio": "bio",
    "picture": "picture",
    "github": "github",
    "linkedin": "linkedin",
    "website": "website",
}

directors = []
operations = []
dev = []
marketing = []
socials = []
skipped = []
people = { 
    "directors": directors, 
    "operations" : operations, 
    "dev" : dev, 
    "marketing" : marketing, 
    "socials" : socials
}

def generate_person_list(name, items):
    ts_string = f"export const {name}: Person[] = [\n"
    for item in items:
        ts_string += f'  {str(item)},\n'
    ts_string += '];\n\n'
    return ts_string   


with open(csv_path, encoding="utf-8") as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter=",")
    for row in csv_reader:
        
        person = {
            "role": row[header_mapping["role"]],
            "name": row[header_mapping["name"]],
            "major": row[header_mapping["major"]],
            "bio": row[header_mapping["bio"]],
            "picture": row[header_mapping["picture"]],
            "socials": {
                "github": row[header_mapping["github"]],
                "linkedin": row[header_mapping["linkedin"]],
                "website": row[header_mapping["website"]],
            }
        }
        # data cleaning
        if not person["bio"]:
            skipped.append(person["name"])
            continue
        if not person["picture"]:
            person["picture"] = ai_logo
        if person["socials"]["github"] and "github.com" not in person["socials"]["github"]:
            person["socials"]["github"] = "https://github.com/" + person["socials"]["github"]

        # add to teams
        if row["section"] == "directors":
            directors.append(person)
        elif row["section"] == "operations":
            operations.append(person)
        elif row["section"] == "dev":
            dev.append(person)
        elif row["section"] == "marketing":
            marketing.append(person)
        elif row["section"] == "socials":
            socials.append(person)

with open(ts_path, mode='w') as ts_file:
    ts_header = """export interface Socials {
  readonly website?: string;
  readonly github?: string;
  readonly linkedin?: string;
}

export interface Person {
  readonly role: string;
  readonly name: string;
  readonly major: string;
  readonly bio: string;
  readonly picture?: string;
  readonly socials?: Socials;
}
"""
    ts_file.write(ts_header)

    for name, value in people.items():
        ts_list = generate_person_list(name, value)
        ts_file.write(ts_list)

print(f"Typescript file '{ts_path}' generated successfully")
print(f"The following people were skipped due to lack of bio: {skipped}")