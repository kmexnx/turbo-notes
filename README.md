# ⚡️ Turbo Notes

Turbo Notes is a full-stack application built for the technical hiring challenge. It uses **Next.js 15**, **Django REST Framework**, and **PostgreSQL** to create a fast, distraction-free writing environment.

![Dashboard Preview](image.png)

## 🛠 Quick Start

The project is fully containerized. You don't need to install Python or Node locally to run it.

1.  **Start the app:**
    ```bash
    docker-compose up --build
    ```

2.  **Run Migrations:**
    Open a new terminal tab:
    ```bash
    docker-compose exec backend python manage.py migrate
    ```

3.  **Access:**
    -   App: [http://localhost:3000](http://localhost:3000)
    -   API: [http://localhost:8000/api/](http://localhost:8000/api/)

---

## 🏗 Tech Stack

I chose this stack to balance modern frontend features with a solid, relational backend.

* **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS.
* **Backend:** Django 4.2 (LTS), DRF, PostgreSQL 15.
* **Auth:** JWT via Djoser.
* **DevOps:** Docker Compose.

---

## 🧠 Technical Decisions & Trade-offs

I had 72 hours to build this, so I had to make some specific architectural choices to ship a complete MVP.


### 1. Auth with Cookies
I'm using `js-cookie` to handle the JWTs.
* **Why:** Setting up a full BFF (Backend for Frontend) proxy to handle HttpOnly cookies strictly on the server would have taken too much time for this scope. This approach let me move fast with Client Components.
* **Security:** In a real production environment, I'd enforce HttpOnly cookies via Middleware to prevent XSS.

### 2. The "New Note" Logic
Instead of a complex "Draft" state on the frontend, clicking "New Note" immediately creates an empty note in the database.
* **Why:** This makes the Auto-save logic much simpler. The editor always updates an existing record (`PATCH`) rather than guessing if it needs to create or update.

### 3. Timezones
The backend saves everything in UTC. I used the browser's `Intl` API to format dates on the client. This way, users see the correct local time (e.g., "Today, 6:00 PM") regardless of where the server is hosted.

---

## ✨ Features

* **Auto-save:** No save buttons. It syncs automatically 500ms after you stop typing.
* **Voice-to-Text:** You can dictate notes using the microphone button.
* **Dynamic Themes:** The editor background changes color based on the selected category.
* **Responsive:** Works on mobile and desktop.

---

## 🤖 AI Usage

I used AI tools to speed up the boilerplate setup so I could focus on the logic.
* **Config:** Generating the initial `docker-compose` and Django settings.
* **Debugging:** Helping me figure out the new `params` Promise changes in Next.js 15.

---

## 🔮 Future Roadmap (What I'd add with more time)

* **Testing:** Add `pytest` for the backend models and `Jest/React Testing Library` for the critical frontend components (Editor/Auth).
* **Search:** Implement server-side full-text search to filter notes by content.
* **Soft Deletes:** Change the delete logic to archiving (trash can) instead of permanent removal to prevent data loss.
* **Accessibility:** Improve keyboard navigation within the editor and ARIA labels for screen readers.