# Toy Apps®

Possibly the least useful app ever created.™

![vuewwidgets-v2](https://github.com/booty/js_fun/assets/170685/89a3a8db-76ed-4d69-b86b-372f5d6431b0)

## General Setup

```bash
asdf install
```

## "Toy Widgets" Frontend

Setup:

```bash
cd toy_widgets/frontend
npm install
```

Run:

```bash
npm run dev
```

## "Toy Widgets" Backend

Setup:

```bash
cd toy_widgets/backend
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
