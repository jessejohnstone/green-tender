# GreenTender — React hackathon prototype

A circular procurement workspace built with React and Vite, using plain JavaScript and CSS.

## Run locally

Install Node.js (20.19+ or 22.12+), then open a terminal in the folder containing package.json:

    npm install
    npm run dev

Open the local URL printed by Vite, normally http://localhost:5173.

## Build

    npm run build
    npm run preview

## Structure

- src/App.jsx: React interface, component composition and session state
- src/model.js: option ranking, constraints and savings calculations
- src/data.js: illustrative supplier catalog
- src/styles.css: responsive design
- src/main.jsx: React entry point
- index.html: page metadata and root element

## Demo flow

Compare 30 chairs, select internal reuse, reserve an exchange item, combine deliveries, confirm a demo receipt and download the JSON impact report.

## Limits

Sample suppliers, prices and environmental factors. No verified climate claims. Decisions exist only in memory and reset on refresh. No authentication, database, payment processing or live route service.

## Upload to GitHub

Create an empty repository named greentender under your GitHub account, then run:

    git init
    git add .
    git commit -m "Build GreenTender React prototype"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/greentender.git
    git push -u origin main

Replace YOUR_USERNAME with your account name. Later clone using that repository URL.

## Component and page organization

`App.jsx` holds shared application state and chooses the active page.

Reusable interface components are in `src/components/`: Sidebar, Header, Intro,
Stat, OptionCard and RequestDialog.

The five page components are in `src/pages/`: ProcurementStudio, ReuseExchange,
SharedDeliveries, ImpactFunding and Evidence.

Components receive data and callback functions through props. Editing a page's
text or layout belongs in its page file; editing shared cards belongs in its
component file. Calculations remain in model.js, sample records in data.js and
styling in styles.css. There is no separate router: App selects pages with React
state so the existing demo behavior stays the same.
