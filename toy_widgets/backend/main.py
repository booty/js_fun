from fastapi import FastAPI
from fastapi.responses import JSONResponse
import feedparser
import json

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


def fetch_headlines(url):
    # fetch the RSS feed
    feed = feedparser.parse(url)
    # headlines = [entry.title for entry in feed.entries]

    headlines = [{"title": entry.title, "link": entry.link} for entry in feed.entries]
    return {"headlines": headlines}


# an endpoint to fetch RSS headlines from a specified URL and return them as JSON
# @app.get("/headlines")
# def headlines(url: str):
#     # set the CORS header ‘Access-Control-Allow-Origin’ to ‘*’
#     response = fetch_headlines(url)
#     response.headers["Access-Control-Allow-Origin"] = "*"
#     return response


# a /headlines endpoint that returns the RSS headlines as JSON, setting the "Access-Control-Allow-Origin" header to "*" to allow cross-origin requests
@app.get("/headlines")
async def headlines(url: str):
    content = fetch_headlines(url)
    headers = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(content=content, headers=headers)
