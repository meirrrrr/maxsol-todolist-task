# Todo List Application

Полнофункциональное приложение для управления задачами с frontend на Next.js и backend на FastAPI.

## Запуск с помощью Docker Compose

### Предварительные требования
- 1. Разработайте REST API на FastAPI с использованием SQLite для
управления пользователями (регистрация, авторизация, JWT) и личными
задачами (CRUD, привязка к текущему пользователю). ✅
- 2. Создайте простой фронтенд с использованием NextJS и Mantine (/sign-up,
/sign-in, /tasks). Если пользователь не авторизован, нужно перенаправить
его на /sign-in. ✅
- 3. В README опишите как запускать backed и frontend локально, а также
приведите пример запросов. ✅
- 4. Дополнительные плюсы (необязательно):
 - a. Pagination ✅, выходит если добавить больше чем 5 тасков.
 - b. Фильтрация ✅
 - c. Docker ✅
 - d. Logout кнопка ✅

### Быстрый запуск

1. Клонируйте репозиторий:

```bash
git clone <repository-url>
cd todo-list
```

2. Запустите приложение:

```bash
docker-compose up --build
```

3. Откройте браузер:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API документация: http://localhost:8000/docs

### Остановка приложения

```bash
docker-compose down
```

### Очистка данных

```bash
docker-compose down -v
rm test.db
```

## Отдельный запуск Backend и Frontend

### Запуск Backend

#### Предварительные требования

- Python 3.12+
- pip

#### Установка и запуск

1. Перейдите в папку backend:

```bash
cd backend
```

2. Создайте виртуальное окружение:

```bash
python -m venv venv
```

3. Активируйте виртуальное окружение:

```bash
# macOS/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

4. Установите зависимости:

```bash
pip install -r requirements.txt
```

5. Запустите сервер:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend будет доступен по адресу: http://localhost:8000

### Запуск Frontend

#### Предварительные требования

- Node.js 18+
- npm

#### Установка и запуск

1. Перейдите в папку frontend:

```bash
cd frontend
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env.local` с переменными окружения:

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

4. Запустите в режиме разработки:

```bash
npm run dev
```

Frontend будет доступен по адресу: http://localhost:3000

### Запуск в Production режиме

#### Backend (Production)

```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Frontend (Production)

```bash
cd frontend
npm run build
npm start
```

## Структура проекта

```
todo-list/
├── frontend/          # Next.js приложение
├── backend/           # FastAPI сервер
├── docker-compose.yml # Конфигурация Docker Compose
└── test.db           # SQLite база данных
```

## API Endpoints

- `POST /sign-up` - Регистрация пользователя
- `POST /sign-in` - Авторизация пользователя
- `GET /tasks` - Получение списка задач
- `POST /tasks` - Создание новой задачи
- `PUT /tasks/{id}` - Обновление задачи
- `DELETE /tasks/{id}` - Удаление задачи

## Технологии

- **Frontend**: Next.js, React, TypeScript, Mantine UI
- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Authentication**: JWT tokens
- **Containerization**: Docker, Docker Compose
