


GreenTender
A GreenTech hackathon prototype built with React, Vite, JavaScript and CSS.
Problem and Solution
Organizations may buy new items while reusable resources sit idle. GreenTender helps them compare purchasing options by budget, availability and estimated environmental impact, discover surplus items and group deliveries.
Features
- Compare reuse, repair, refurbished and new purchasing scenarios.
- Filter options by budget, quantity and deadline.
- Reserve sample surplus items.
- Simulate shared deliveries.
- View estimated savings and download a JSON report.
- Inspect environmental assumptions and record demo sponsor interest.
Run Locally
Install Node.js and open the folder containing package.json:
npm install
npm run dev
Open the URL printed in the terminal, usually http://localhost:5173.
To build and preview:
npm run build
npm run preview
Source Structure
Location	Purpose
src/components/	Sidebar, header, cards and request form.
src/pages/	Procurement, reuse, deliveries, impact and evidence pages.
src/App.jsx	Shared state and page navigation.
src/data.js	Sample suppliers, prices and factors.
src/model.js	Validation, ranking and calculations.
src/styles.css	Design and responsive layout.
src/main.jsx	React entry point.


Demo Flow
Create a request → compare options → select reuse → combine deliveries → review and export estimated impact.
Limitations
This is a frontend demo with illustrative data. Decisions reset on refresh. There is no database, authentication, payment processing or live routing. Environmental estimates are not verified results; no water savings or certified carbon credits are claimed.
Next Steps
Validate a real purchasing case, verify supplier information, add persistent records and
