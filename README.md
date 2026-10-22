<div align="center">

# ХакТайка

**Сайт digital-агентства: многоязычный лендинг на React, заявки через FastAPI и мгновенные уведомления в Telegram**

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

</div>

<!-- TODO: скриншот главной страницы -->

## 📖 О проекте

Корпоративный сайт digital-агентства «ХакТайка»: витрина услуг и портфолио, а также форма заявки, через которую клиент описывает задачу. Заявка сохраняется в PostgreSQL, а администраторам сразу уходит уведомление в Telegram — менеджер не теряет лиды и не проверяет почту вручную.

## ✨ Возможности

- **Лендинг** — Hero, форма заявки, услуги, отзывы, портфолио, контакты, футер; секции появляются с анимацией (GSAP).
- **Две локали** — русский и английский (`i18next`, переводы в `frontend/public/locales`), язык определяется по браузеру.
- **Каталог услуг** — веб-разработка, Telegram-боты и автоматизация, UI/UX и графический дизайн, хостинг и поддержка, маркетинг и реклама, мобильная разработка.
- **Портфолио** — страницы проектов (`/portfolio/:id`) с обложками, скриншотами и видео.
- **Заявки** — клиент и заявка сохраняются в БД, дубликаты клиентов ищутся по email или телефону.
- **Telegram-бот** — рассылка уведомлений о новых заявках; команды `/start` и `/help`; доступ определяется таблицей администраторов.
- **Юридические страницы и cookie-баннер** — политика конфиденциальности, условия использования, согласие на cookie.
- **SEO** — `SEOHelmet`, `sitemap.xml`, `robots.txt`, `manifest.json`.
- **Продакшен-обвязка** — Nginx с HTTPS, заголовками безопасности и reverse proxy на API.

## 🧱 Стек

| Технология | Роль |
|---|---|
| Python 3.11, FastAPI, Uvicorn | REST API |
| SQLAlchemy 2 (async) + asyncpg | работа с PostgreSQL |
| Alembic | миграции (конфигурация в `backend/`) |
| Pydantic / pydantic-settings | схемы и конфигурация из `.env` |
| aiogram 3 | Telegram-бот (long polling) |
| React 19, react-router-dom 7 | клиентская часть |
| GSAP, Swiper, Recharts | анимации, слайдеры, графики |
| i18next | локализация RU / EN |
| PostgreSQL 14 | хранилище |
| Docker Compose, Nginx | запуск и reverse proxy |

## 🗂 Структура проекта

```text
Hacktaika/
├── backend/
│   ├── app/
│   │   ├── api/v1/        # роуты: clients, admins, blog
│   │   ├── core/          # настройки (pydantic-settings)
│   │   ├── db/            # движок, сессия, Base
│   │   ├── models/        # Client, Task, Service, Admin
│   │   ├── schemas/       # Pydantic-схемы
│   │   ├── services/      # telegram_service (бот + уведомления)
│   │   └── main.py        # точка входа FastAPI
│   ├── alembic/ migrations/   # конфигурация и миграции Alembic
│   └── create_blog_table.sql  # init-скрипт для таблицы blog_submissions
├── frontend/
│   ├── public/            # статика, локали, медиа портфолио
│   └── src/               # компоненты, страницы, данные, API-клиент
├── nginx/                 # Dockerfile, nginx.conf, conf.d/default.conf
├── docker-compose.yml     # postgres + backend + nginx
├── Dockerfile.backend / Dockerfile.frontend
└── requirements.txt
```

## 🚀 Быстрый старт

### Через Docker Compose

`docker-compose.yml` поднимает три сервиса: `postgres` (5432), `backend` (8000) и `nginx` (80/443). Nginx раздаёт готовую сборку из `frontend/build`, поэтому фронтенд нужно собрать заранее.

```bash
git clone https://github.com/Edvvard0/Hacktaika.git
cd Hacktaika

# 1. Сборка фронтенда (Node.js 20, yarn)
cd frontend
yarn install --frozen-lockfile
yarn build
cd ..

# 2. Переменные окружения (compose читает TELEGRAM_BOT_TOKEN и TELEGRAM_ADMIN_ID)
cp .env.example .env

# 3. Запуск
docker compose up --build -d
docker compose logs -f backend
```

> Конфигурация Nginx рассчитана на HTTPS-сертификаты Let's Encrypt, смонтированные из `/etc/letsencrypt` хоста. Для запуска на локальной машине используйте режим разработки ниже.

### Локальная разработка

**Backend** (Python 3.11+):

```bash
docker compose up -d postgres        # БД из compose

cd backend
python -m venv venv
source venv/bin/activate             # Windows: venv\Scripts\activate
pip install -r ../requirements.txt

# .env в корне репозитория: DATABASE_URL, SECRET_KEY (см. «Конфигурация»)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Таблицы создаются автоматически при старте приложения. Документация API: `http://localhost:8000/docs`.

**Frontend:**

```bash
cd frontend
yarn install
REACT_APP_API_URL=http://localhost:8000 yarn start    # http://localhost:3000
```

## ⚙️ Конфигурация

Backend читает `.env` из корня репозитория (шаблон — `.env.example`).

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | строка подключения к БД (`postgresql+asyncpg://...`), обязательна |
| `SECRET_KEY` | секретный ключ приложения, обязателен |
| `ENVIRONMENT` | `development` / `production` |
| `ALLOWED_ORIGINS` | список origin для CORS через запятую |
| `FRONTEND_URL`, `BACKEND_URL` | публичные адреса фронтенда и API |
| `TELEGRAM_BOT_TOKEN` | токен бота; без него бот не запускается |
| `TELEGRAM_ADMIN_ID` | Telegram ID администратора (необязательно) |
| `API_V1_STR`, `PROJECT_NAME`, `PROJECT_VERSION` | параметры API |
| `REACT_APP_API_URL` | адрес API для фронтенда (по умолчанию `http://localhost:8000`) |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | параметры БД из `.env.example` |

> Не коммитьте реальные значения: `.env` добавлен в `.gitignore`.

## 🔌 API / Команды

<details>
<summary>REST API (префикс <code>/api/v1</code>, Swagger — <code>/docs</code>)</summary>

| Метод | Путь | Описание |
|---|---|---|
| `GET` | `/clients/services` | список услуг |
| `GET` | `/clients/tasks` | список заявок |
| `POST` | `/clients/tasks` | создать заявку клиента + уведомление в Telegram |
| `GET` / `POST` | `/admins/` | список / добавление администраторов бота |
| `PATCH` | `/admins/{admin_id}/toggle` | включить / выключить администратора |
| `POST` | `/blog/blog-form` | подробная форма-бриф: сохранение в `blog_submissions` + уведомление |
| `GET` | `/healthz` (без префикса) | проверка доступности и БД |

</details>

**Telegram-бот:** `/start` — приветствие и проверка доступа, `/help` — справка.

## 👤 Автор

**Эдвард Осипчук** — Python backend-разработчик

[![GitHub](https://img.shields.io/badge/GitHub-Edvvard0-181717?style=flat&logo=github)](https://github.com/Edvvard0)
[![Telegram](https://img.shields.io/badge/Telegram-Edward0076-26A5E4?style=flat&logo=telegram&logoColor=white)](https://t.me/Edward0076)
