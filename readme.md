# Toy Apps®

Possibly the least useful app ever created.™

![Screenshot of the Vue Widgets app](https://github.com/booty/js_fun/assets/170685/94d74307-15a0-434e-9254-391def0c5826){width=300px}

<img src="https://github.com/booty/js_fun/assets/170685/94d74307-15a0-434e-9254-391def0c5826" width="300">

## General Setup

```bash
asdf install
```

## "Toy Widgets" Frontend

Setup:

```bash
cd frontend
```

Run:

```bash
npm install
npm run dev
```

## "Toy Widgets" Backend

Setup:

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

Run:

```bash
# PRO MODE. WE DON'T NEED HOT RELOADING, WE ALREADY GOT IT RIGHT
uvicorn main:app

# Dev mode with hot reload
uvicorn main:app --reload
```

## TODO

Well, pretty much everything.
