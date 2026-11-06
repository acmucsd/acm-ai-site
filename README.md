# acm-ai-site

Check it out @ [ai.acmucsd.com](https://ai.acmucsd.com)


This is the source code behind the website for ACM AI at UC San Diego. ACM AI is an inclusive community of students interested in Artificial Intelligence. We promote community and education about AI by hosting workshops, competitions, and socials throughout the year.

## Local Setup 
- If the first time running after cloning, run `npm i` first to install the necessary dependencies
- To start the website, run `npm start`
- If you created a new page, then make sure to add a new route that links to that page component in `App.tsx`

### Connect the backend
Set up the API locally and seed the database. Ask your director if you need access to it. Make an `.env` file with the following
```
REACT_APP_API=http://localhost:9000
```

Run the following to create a docker container.
```
docker run -d -p 27017:27017 --name mongo -v data-vol:/data/db mongo:latest
```

## Documentation

**For all contributors and ACM team members, please refer to [our wiki](https://github.com/acmucsd/acm-ai-site/wiki) for documentation**.
When major functionality is changed or introduced, please help keep other devs up to date by contributing to the documentation in the wiki!
If you find anything that is incorrect or out of date on the wiki, please help update it.

The wiki can also be cloned locally with:
```
git clone https://github.com/acmucsd/acm-ai-site.wiki.git
```

## Contributing Guidelines
This site is actively maintained by members of ACM AI's Development Team. If you'd like to contribute a feature, we're happy to look at any pull request, but please note that we might not merge it. If you're interested in trying out some freelance work, reach out to us via email (ai@acmucsd.org), or join AI dev team when applications open up.
