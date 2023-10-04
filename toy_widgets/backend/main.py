from fastapi import FastAPI
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
    return json.dumps({"headlines": headlines})


# an endpoint to fetch RSS headlines from a specified URL and return them as JSON
@app.get("/headlines")
def headlines(url: str):
    return fetch_headlines(url)
