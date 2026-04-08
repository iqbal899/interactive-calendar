# Interactive Calendar Application

## Overview

This project is a responsive calendar application built using Next.js and React. It allows users to manage notes across three contexts: individual dates, date ranges, and monthly memos. The application is designed to maintain a clean and intuitive user experience while handling structured data efficiently.

---

## Live Demo

The application is deployed and accessible here:

https://real-calendar.vercel.app/

---

## Design Decisions

### 1. Separation of Note Types

The application distinguishes between three types of notes:

* **Date Notes**: Stored per specific day
* **Range Notes**: Stored with a start and end date
* **Monthly Notes**: Stored per month

This separation prevents conflicts and ensures predictable behavior when retrieving and displaying notes.

---

### 2. Data Structure

All data is stored in a single object using localStorage:

```js
{
  monthNotes: {
    "2026-3": "April memo"
  },
  dateNotes: {
    "2026-04-12": "Meeting"
  },
  rangeNotes: [
    {
      start: "2026-04-10",
      end: "2026-04-15",
      note: "Trip"
    }
  ]
}
```

* Monthly notes are keyed using `year-month`
* Date notes use ISO date strings
* Range notes are stored as objects

This structure keeps the system scalable and easy to query.

---

### 3. Note Limit Strategy

A maximum of **6 notes per month** is enforced for:

* Date notes
* Range notes

The monthly memo is excluded from this limit to preserve its purpose as a high-level overview.

---

### 4. Range Handling

* A date inside a range cannot have a separate date note
* Range notes can span across multiple months
* If the starting month is full, the range appears in the next valid month

This ensures consistent behavior without data conflicts.

---

### 5. UI/UX Considerations

* Notes are displayed as cards over a contextual image for quick visibility
* The layout is responsive and supports mobile scrolling
* Textarea expands dynamically based on input
* Dark mode is supported for better accessibility

---

### 6. State Management

Custom hooks are used to separate logic from UI:

* `useNoteState` → retrieves notes based on context
* `useSaveNote` → handles saving logic
* `useDeleteNote` → handles deletion
* `useMonthNotesGrid` → prepares notes for display

This keeps the code modular and maintainable.

---

## How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/interactive-calendar.git
cd interactive-calendar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in browser

http://localhost:3000

---

## Tech Stack

* Next.js (App Router)
* React
* Tailwind CSS
* date-fns
* Framer Motion
* LocalStorage

---

## Conclusion

This project demonstrates structured state management, handling of multiple note types, and maintaining a consistent user experience under constraints such as note limits and overlapping date ranges.
