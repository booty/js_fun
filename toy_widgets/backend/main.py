from fastapi import FastAPI
from fastapi.responses import JSONResponse
import feedparser
import aiohttp

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


async def fetch_headlines(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            feed = await response.text()
    feed = feedparser.parse(feed)
    headlines = [{"title": entry.title, "link": entry.link} for entry in feed.entries]
    return {"headlines": headlines}


# a /headlines endpoint that returns the RSS headlines as JSON, setting the "Access-Control-Allow-Origin" header to "*" to allow cross-origin requests
@app.get("/headlines")
@app.get("/headlines")
async def headlines(url: str):
    content = await fetch_headlines(url)
    headers = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(content=content, headers=headers)
