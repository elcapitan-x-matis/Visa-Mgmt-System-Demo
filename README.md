# Work VISA Management System - Static Demo

This is a fully functional, client-side replica of the PNG Immigration & Citizenship Authority Work VISA Management System. It is built using static HTML, CSS, and JavaScript, using `localStorage` to simulate a real database.

## Live Demo

Visit: [https://elcapitan-x-matis.github.io/Visa-Mgmt-System-Demo/](https://elcapitan-x-matis.github.io/Visa-Mgmt-System-Demo/)

## Demo Credentials

You can log in using any of the seeded accounts. The default password for all accounts is `password`.

- **Administrator:** `rnongkas`
- **User Employee:** `jdoe`

## Features

- **Dashboard:** Live KPI stats, Charts, and recent activity.
- **Clients:** View records, add/edit clients, and manage notes.
- **Establishments:** View companies, sub-companies, and assigned client employees.
- **Permits:** View all permits, issue new ones (requires selecting a client), and edit/delete.
- **Users (Admin):** Manage user accounts and assign specific CRUD permissions.
- **Local Persistence:** Any changes you make are saved in your browser's `localStorage`. You can reset the data at any time using the **"Reset Demo Data"** button in the profile dropdown.

## Tech Stack

- **HTML5 / CSS3**
- **Bootstrap 5.3.3** (via CDN)
- **Bootstrap Icons 1.11.3** (via CDN)
- **jQuery 3.7.1** (via CDN)
- **DataTables 2.0.8** (via CDN)
- **Chart.js 4.4.1** (via CDN)
- **SweetAlert2 11** (via CDN)