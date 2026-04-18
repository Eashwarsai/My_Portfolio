import random
from datetime import datetime, timedelta
from sqlmodel import Session, SQLModel
from app.core.db import engine
from app.models.learning import LearningLog

SQLModel.metadata.create_all(engine)

categories = ['Frontend', 'Backend', 'DevOps', 'System Design']
snippets = [
    "Finally understood why `useEffect` requires an extensive dependency array mapping.",
    "Broke down the monolithic Redux store into RTK Queries utilizing cache invalidation tags. Code shrunk by 40%!",
    "Configured a Multi-Stage Dockerfile replacing 800MB Node containers with an 11MB Nginx dist server.",
    "Realized `SQLModel` utilizes Pydantic under the hood enabling flawless typing alongside ORM capabilities bridging the boundaries.",
    "Explored the complexities underlying Event Streams versus WebSockets. Found SSEs work exceptionally well for one-way log feeds.",
    "Learned that Tailwind opacity modifiers literally fail if `:root` variables utilize Hex codes rather than raw space-separated RGB matrices.",
    "Tidying up Python Circular import hierarchies by isolating my database `engine` instance independent of the central controller routers."
]

def seed_learning_logs():
    with Session(engine) as session:
        # Check if already seeded
        if session.query(LearningLog).count() > 0:
            print("Learning logs already exist. Skipping seed.")
            return

        logs_to_add = []
        today = datetime.utcnow()
        
        # Plot roughly 70 entries varying systematically over the last 150 days
        for i in range(150):
            # Skip some days to make the Heatmap realistic (not every day is active)
            if random.random() < 0.6: 
                # Pick a random date offsetting from today backwards
                log_date = (today - timedelta(days=i)).strftime("%Y-%m-%d")
                
                # Sometimes log multiple times a day
                daily_commits = random.randint(1, 3) 
                
                for _ in range(daily_commits):
                    logs_to_add.append(
                        LearningLog(
                            category=random.choice(categories),
                            content=random.choice(snippets),
                            date=log_date,
                            # Shift the SQL creation time manually to match the historic context
                            created_at=today - timedelta(days=i)
                        )
                    )
        
        for log in logs_to_add:
            session.add(log)
            
        session.commit()
        print(f"Successfully injected {len(logs_to_add)} randomized daily logs spanning across 5 months!")

if __name__ == "__main__":
    seed_learning_logs()
