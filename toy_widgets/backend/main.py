from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import feedparser
import aiohttp
import sqlite3
import os

app = FastAPI()
db_conn = None
db_dir = "data"
db_path = os.path.join(db_dir, "widgets.sqlite3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # or you can specify: ["GET", "POST", "PUT"]
    allow_headers=["*"],
)


def db_init():
    global db_dir
    global db_path

    if not os.path.exists(db_dir):
        print("Creating directory %s" % db_dir)
        os.makedirs(db_dir)

    with sqlite3.connect(db_path) as conn:
        print("Creating table userpreferences")
        conn.execute(
            "CREATE TABLE IF NOT EXISTS userpreferences (name TEXT PRIMARY KEY, value TEXT)"
        )

        print("Seeding")
        conn.execute(
            "INSERT INTO userpreferences (name, value) SELECT 'income', '50000' WHERE NOT EXISTS (SELECT 1 FROM userpreferences WHERE name = 'income')"
        )


def db_get_user_preference():
    global db_path

    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM userpreferences")

        # TODO: this is not the way - what's the right way
        foo = cursor.fetchone()
        user_preferences = {}
        while foo is not None:
            user_preferences[foo[0]] = foo[1]
            foo = cursor.fetchone()
        return user_preferences


def db_set_user_preferences(data):
    global db_path

    print("okay, let's set some user preferences", data)
    with sqlite3.connect(db_path) as conn:
        for key, value in data.items():
            conn.execute(
                "INSERT INTO userpreferences (name, value) VALUES (?, ?) ON CONFLICT(name) DO UPDATE SET value = ?",
                (key, value, value),
            )


db_init()


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


@app.get("/headlines")
async def headlines(url: str):
    content = await fetch_headlines(url)
    headers = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(content=content, headers=headers)


@app.get("/userpreferences")
async def userpreferences():
    return db_get_user_preference()


@app.put("/userpreferences")
async def set_userpreferences(request: Request):
    data = await request.json()
    db_set_user_preferences(data)
    return {"message": "User preferences updated successfully."}
