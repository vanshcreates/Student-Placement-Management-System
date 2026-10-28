# CamCarr: Design and Build Guide

**CamCarr** is a Student Placement Management System for a college Training & Placement Cell (TPO).
Users: **Admin (TPO)** and **Students**. Built solo, with plain HTML/CSS/JS, Node.js/Express and MySQL.

This guide covers the look and feel, the frontend, the backend, and the build plan in one place.

---

## 1. Design concept

**Idea: a campus notice board that became software.**
Placement news has always lived on notice boards and WhatsApp groups. CamCarr keeps that feel: drives are "posted" like notices, status changes are "pinned" updates, and the interface is bold, flat, and easy to read.

This avoids the usual blue-and-white, gradient-heavy "AI dashboard" look.

### Design principles

1. **Data screens stay calm.** Tables, forms, and reports are plain and readable. The personality lives in the login page, headings, buttons, and empty states.
2. **Spend boldness in one place.** The memorable element is the thick-bordered "notice card" used for drives. Everything else stays quiet.
3. **Structure carries meaning.** A border, divider, or badge must tell the user something (status, category, urgency). Do not add decoration.
4. **Plain words.** Use sentence case and clear verbs: "Apply to drive", not "Submit". Keep the same action name across the whole flow.
5. **Built for phones first.** Most students will open it on mobile.

### What to avoid

- Blue-and-white themes, purple-blue gradients, glassmorphism, glowing blobs
- Identical rounded cards with the same soft grey shadow everywhere
- Tracked-out ALL-CAPS labels above every heading
- Accenting a single word in each headline
- Scattered fade-in animations on every section

---

## 2. Color palette

### Core tokens

| Name | Hex | Use |
|---|---|---|
| Pine | `#12372A` | Primary: sidebar, headings, main buttons |
| Chalk | `#F2F4EC` | Page background (slightly green-tinted off-white) |
| Paper | `#FFFFFF` | Cards, tables, form fields |
| Marigold | `#F2B84B` | Accent: highlights, key buttons, notice tags |
| Ink | `#1B1F1D` | Body text and borders |
| Moss | `#5E7A5F` | Secondary text, icons, muted borders |

### CSS variables

```css
:root {
  --pine: #12372A;
  --chalk: #F2F4EC;
  --paper: #FFFFFF;
  --marigold: #F2B84B;
  --ink: #1B1F1D;
  --moss: #5E7A5F;

  --border: 2px solid var(--ink);
  --shadow-hard: 4px 4px 0 var(--ink);
  --radius: 8px;
}
```

### Status badges (tinted background with dark text)

| Status | Background | Text |
|---|---|---|
| Applied | `#E4E7E2` | `#3B423E` |
| Shortlisted | `#FBE9B7` | `#5C4100` |
| Test / Interview | `#D9E6F5` | `#1D3F66` |
| Selected | `#D5EEDD` | `#0F4D2E` |
| Rejected | `#F7D4D0` | `#7A1F17` |

Always show the status as **text in the badge**, never as color alone.

### Rules

- Marigold is a **fill color only**. Put Ink text on it; never use Marigold as text on Chalk (it is too light).
- Pine on Chalk and Ink on Paper give strong contrast. Check any new pairing at a contrast checker (aim for 4.5:1 for body text).
- Optional dark mode: swap Chalk for `#10201A`, Paper for `#18302A`, and keep Marigold as the accent.

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Headings, numbers on dashboard | **Bricolage Grotesque** | Distinctive grotesque with character; weights 600 to 800 |
| Body, forms, tables | **Instrument Sans** | Clean and readable at small sizes; weights 400 to 600 |

Both are free on Google Fonts. Fallbacks: `system-ui, sans-serif`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
body { font-family: 'Instrument Sans', system-ui, sans-serif; font-size: 16px; line-height: 1.55; color: var(--ink); }
h1, h2, h3 { font-family: 'Bricolage Grotesque', system-ui, sans-serif; line-height: 1.1; }
table, .stat { font-variant-numeric: tabular-nums; } /* aligned numbers in tables and packages */
```

### Type scale

| Level | Size | Weight |
|---|---|---|
| Page title (h1) | 36px / 2.25rem | 800 |
| Section title (h2) | 24px / 1.5rem | 700 |
| Card title (h3) | 18px / 1.125rem | 600 |
| Body | 16px | 400 |
| Table text | 14px | 400 |
| Small note | 13px | 400 |

Keep line length under about 75 characters for paragraphs.

---

## 4. Components

### Buttons
- **Primary:** Pine fill, Chalk text, 2px Ink border, `box-shadow: var(--shadow-hard)`.
- **Accent (one per page, e.g. "Apply to drive"):** Marigold fill, Ink text, same border.
- **Secondary:** Paper fill, Ink text, Ink border, no shadow.
- Hover: shift 2px and reduce shadow. Press: remove shadow. This responds to the user's action, so it is welcome motion.
- Hard shadows go on buttons only, not on every card.

### Notice card (the signature element)
Used for each placement drive.

```
+--------------------------------------------+
| [Open]  Deadline: 12 Nov                   |
| Infosys, Systems Engineer                  |
| Package 3.6 LPA | Min CGPA 6.5 | CSE, IT   |
| You are eligible                           |
| [Apply to drive]                           |
+--------------------------------------------+
```

- 2px Ink border, Paper background, small Marigold tag at the top left showing drive state
- Ineligible drives are shown dimmed with the exact reason: "Needs CGPA 7.0, you have 6.4"

### Tables
- Paper background, 1px Ink-tinted row dividers, sticky header
- Search box and filters above the table; row count shown ("42 students")
- Pagination (20 rows per page); horizontal scroll inside the table container on mobile
- Bulk actions appear only after rows are selected

### Forms
- Labels above fields, not placeholder-only
- Inline validation with a clear fix: "Enter CGPA between 0 and 10"
- Primary action on the right, cancel on the left

### Empty, loading, and error states
- Empty: say what to do next: "No drives yet. Post your first drive."
- Loading: skeleton rows, not a blank screen
- Errors: state what happened and how to fix it; do not apologize or stay vague

### Motion
- One entrance moment only: the login page
- Everything else responds to clicks (open modal, expand row, confirm save)
- Respect `prefers-reduced-motion`

### Accessibility floor
- Visible keyboard focus (3px Marigold outline with Ink offset)
- Labels on every input, alt text on images, minimum 44px tap targets
- Works at 360px width

---

## 5. Screens

### Public
1. **Login:** split layout. Left: a large bold line about placements and a few sample notice cards. Right: the login form.

### Student
2. **Dashboard:** eligible drives (notice cards), upcoming deadlines, application status timeline
3. **Drives list:** filters by company, package, deadline; eligible/all toggle
4. **My applications:** table with status badges and a timeline per application
5. **Profile:** personal details, CGPA, backlogs, skills, resume upload, completion percentage

### Admin (TPO)
6. **Dashboard:** stat blocks (total students, placed, unplaced, active drives), branch-wise placement chart, package distribution
7. **Students:** table with search, filters, bulk Excel import, export
8. **Companies:** list and add/edit form
9. **Drives:** create drive with eligibility rules; see eligible and applied students; update status in bulk
10. **Reports:** placed vs unplaced, branch-wise %, company-wise hires, package statistics (highest, average, median); export to Excel and PDF
11. **Audit log:** who changed what and when

### Layout
```
Desktop                          Mobile
+------+-----------------+       +----------------+
| Side | Page title      |       | Top bar + menu |
| bar  | Filters         |       | Page title     |
| Pine | Content         |       | Cards stacked  |
+------+-----------------+       | Bottom nav     |
```
- Left-aligned content, maximum width 1200px
- Sidebar in Pine with Chalk text; active item marked with a Marigold left bar

---

## 6. Frontend plan

**Stack:** HTML, CSS, vanilla JavaScript. Optional: Alpine.js for small interactions (modals, tabs), Chart.js for charts.

### Folder structure
```
frontend/
├── index.html            (login)
├── student/
│   ├── dashboard.html
│   ├── drives.html
│   ├── applications.html
│   └── profile.html
├── admin/
│   ├── dashboard.html
│   ├── students.html
│   ├── companies.html
│   ├── drives.html
│   ├── reports.html
│   └── audit-log.html
├── css/
│   ├── tokens.css        (colors, fonts, spacing variables)
│   ├── base.css          (reset, typography)
│   └── components.css    (buttons, cards, tables, badges, forms)
├── js/
│   ├── api.js            (fetch wrapper that adds the auth token)
│   ├── auth.js           (login, logout, role check, redirect)
│   ├── ui.js             (toasts, modals, loaders)
│   └── pages/            (one JS file per page)
└── assets/               (logo, icons, images)
```

### Frontend rules
- All server calls go through `api.js`, so token handling and error handling live in one place
- Check the user's role on every page load and redirect if it does not match
- Never trust the frontend for permissions; the backend checks again
- Icons: Lucide (outline, consistent weight)
- Keep the CSS in three files only; avoid per-page style sprawl

---

## 7. Backend plan

**Stack:** Node.js, Express, MySQL (`mysql2`), JWT auth, bcrypt.

### Folder structure
```
backend/
├── server.js
├── .env                  (never commit; add to .gitignore)
├── config/db.js
├── middleware/
│   ├── auth.js           (verify JWT)
│   ├── role.js           (allow only certain roles)
│   ├── validate.js       (input validation)
│   └── errorHandler.js
├── routes/
│   ├── auth.routes.js
│   ├── students.routes.js
│   ├── companies.routes.js
│   ├── drives.routes.js
│   ├── applications.routes.js
│   └── reports.routes.js
├── controllers/          (request handling)
├── services/
│   ├── eligibility.js    (core logic)
│   ├── importExcel.js
│   └── exportReports.js
├── sql/
│   ├── schema.sql
│   └── seed.sql
└── uploads/              (resumes; restrict type and size)
```

### Database tables (key columns)

| Table | Columns |
|---|---|
| `users` | id, email, password_hash, role (admin/student), created_at |
| `students` | id, user_id, name, roll_no (unique), branch, batch_year, cgpa, backlogs, skills, phone, resume_url, is_placed |
| `companies` | id, name, industry, website, contact_name, contact_email |
| `drives` | id, company_id, role_title, package_lpa, min_cgpa, max_backlogs, allowed_branches, deadline, status (open/closed) |
| `applications` | id, student_id, drive_id, status, applied_on, updated_on, remarks (unique on student_id + drive_id) |
| `audit_logs` | id, user_id, action, entity, entity_id, details, created_at |

Add indexes on `roll_no`, `branch`, `cgpa`, `drive_id`, and `status` so search and reports stay fast.

### Eligibility logic (the heart of the system)
A student can apply only when all of these are true:
1. `student.cgpa >= drive.min_cgpa`
2. `student.backlogs <= drive.max_backlogs`
3. `student.branch` is in `drive.allowed_branches`
4. The deadline has not passed and the drive is open
5. The student has not already applied to this drive

Return the **reason** when a check fails, so the UI can show "Needs CGPA 7.0, you have 6.4". Run the same check on the server when the application is submitted, not only in the UI.

### Main API endpoints

| Method | Endpoint | Who |
|---|---|---|
| POST | `/api/auth/login` | Everyone |
| GET | `/api/me` | Logged in |
| GET / POST | `/api/students` | Admin |
| GET / PUT / DELETE | `/api/students/:id` | Admin (student can edit own profile) |
| POST | `/api/students/import` | Admin (Excel upload) |
| GET / POST | `/api/companies` | Admin |
| PUT / DELETE | `/api/companies/:id` | Admin |
| GET | `/api/drives` | Admin (all), Student (with eligibility flag) |
| POST / PUT / DELETE | `/api/drives` and `/api/drives/:id` | Admin |
| POST | `/api/drives/:id/apply` | Student |
| GET | `/api/applications/mine` | Student |
| PUT | `/api/applications/:id/status` | Admin |
| GET | `/api/reports/summary` | Admin |
| GET | `/api/reports/export?type=excel` | Admin |
| GET | `/api/audit-logs` | Admin |

Search uses query strings, e.g. `/api/students?branch=CSE&minCgpa=7&q=aman&page=1`.

### Security checklist
- Hash passwords with bcrypt; never store plain text
- Verify JWT on every protected route; check role on admin routes
- Use parameterized queries (never build SQL with string concatenation)
- Validate and sanitize all inputs (e.g. `express-validator`)
- Add `helmet` and `cors` with an allowed origin, and rate-limit the login route
- Limit resume uploads to PDF and 2 MB
- Keep secrets in `.env`
- Force password change on first login for imported students
- Write an audit log entry for every create, update, delete, and status change

---

## 8. Reports and exports

- **Summary cards:** total students, placed, unplaced, placement %
- **Charts (Chart.js):** branch-wise placement, package distribution, year-wise trend
- **Tables:** company-wise hires, student-wise offers
- **Package stats:** highest, average, median, lowest
- **Exports:** Excel (SheetJS or ExcelJS) and PDF (PDFKit or Puppeteer)
- Format the report headings so the TPO can paste them straight into NAAC/NIRF documents

---

## 9. Extra features (add only after the MVP works)

1. Email notifications for new drives and status changes (Nodemailer)
2. Fuzzy search so "pyton" still finds Python
3. Resume skill match score against a drive's required skills
4. Calendar view of upcoming drives and deadlines
5. Dark mode

---

## 10. Build order and timeline

| Week | Goal |
|---|---|
| 1 | Meet the TPO, requirements, ER diagram, schema, project setup, first commit |
| 2 | Login, roles, student/company CRUD, base CSS and components |
| 3 | Drives, eligibility logic, applications |
| 4 | Search, filters, reports, charts, Excel import/export |
| 5 | UI polish, testing with 100+ sample records, deployment |
| 6 | Pilot with the TPO, fix feedback, documentation, demo video |

### Deployment
- Backend and database: Render or Railway (free tiers for a demo)
- Frontend: served by Express, or Netlify/Vercel
- Keep a database backup (export SQL regularly)

### Documentation to include
- README with screenshots, features, tech stack, and setup steps
- ER diagram, use-case diagram, and DFD
- A one-page user guide for the TPO
- A 1 to 2 minute demo video

---

## 11. Resume line

> **CamCarr: Student Placement Management System** | Node.js, Express, MySQL, JavaScript
> Built a role-based placement portal with automated eligibility checking, application tracking, Excel bulk import, and analytics reports. Designed with the college Training & Placement Cell and piloted with [N] students across [N] drives. Live: [link] | GitHub: [link]

Replace the bracketed items with your real numbers after the pilot.

---

## 12. Quick checklist

- [ ] GitHub repo created with folder structure
- [ ] Requirements confirmed with the TPO
- [ ] ER diagram and `schema.sql` ready
- [ ] `tokens.css` created with the palette and fonts
- [ ] Login and roles working
- [ ] Eligibility logic tested with edge cases
- [ ] Sample data of 100+ students loaded
- [ ] Reports and exports working
- [ ] Deployed with a live link
- [ ] Pilot completed and feedback recorded
