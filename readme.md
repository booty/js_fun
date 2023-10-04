# Toy Apps®

Possibly the least useful app ever created.™

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