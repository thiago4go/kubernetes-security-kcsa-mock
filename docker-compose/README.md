# 🚀 Kubernetes Security Exam Mock

This project provides a simulation platform for Kubernetes security-related exams.

## 📌 Requirements
Before getting started, make sure you have the following requirements installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 How to Run the Application

### 1️⃣ Clone the Repository
If you haven't done so, clone the repository and navigate to the project folder:

```sh
git clone https://github.com/your-repo/kubernetes-security-exam.git
cd kubernetes-security-exam/docker-compose
```

### 2️⃣ Build and Start the Containers
Run the following command to build and start the containers in the background:

```sh
docker-compose up -d --build
```

### 3️⃣ Check Running Containers
Verify that the containers are running correctly:

```sh
docker ps
```

### 4️⃣ View Logs (Optional)
If you need to check the application logs:

```sh
docker-compose logs -f
```

## 🌍 Accessing the Application
Open your browser and go to:

👉 [http://localhost:3000](http://localhost:3000)

## 🔄 Stopping and Removing Containers

### ❌ Stop the Application
If you need to stop the running containers:

```sh
docker-compose down
```

### 🧹 Remove Containers, Volumes, and Images
To remove all containers, volumes, and associated images:

```sh
docker-compose down --volumes --rmi all
```

---

Made with ❤️ for the Kubernetes community!
