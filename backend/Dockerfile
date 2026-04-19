# ============================================================
# FastAPI Backend Dockerfile
# ============================================================
# WHAT: Recipe to build the container image for the Python backend.
# WHY:  Ensures the backend runs exactly the same in production as it 
#       does on your machine. No "but it works on my machine" issues.

# Use official, lightweight Python 3.12 image
FROM python:3.12-slim

# Prevent Python from writing byte-code (.pyc files)
# Prevent Python from buffering stdout/stderr (so logs show up immediately in Docker)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /app

# Install dependencies first (for better Docker layer caching)
# If requirements change, this layer is rebuilt. If only code changes, this is skipped!
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the internal port that uvicorn will listen on
EXPOSE 8000

# Make the startup script executable
RUN chmod +x start.sh

# Command to run the application using our custom startup script
CMD ["./start.sh"]
