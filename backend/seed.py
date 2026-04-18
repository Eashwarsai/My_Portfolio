from sqlmodel import Session, SQLModel
from app.core.db import engine
from app.models.blog import Blog

# Create tables matching our Models dynamically
SQLModel.metadata.create_all(engine)

# Open Database Session connecting to portfolio.db
with Session(engine) as session:
    # Check if we already created the initial data
    if session.query(Blog).count() == 0:
        
        blog1 = Blog(
            title="Building a Python + React Monorepo Architecture",
            slug="building-a-python-react-monorepo",
            published=True,
            content="""# Bridging the Full-Stack Gap

Welcome to my very first technical blog post! In this entry, I want to talk about why separating Frontend and Backend within a singular Monorepo workspace forces better software design.

Normally developers spin up two completely distinct repositories. While that keeps code clean, it increases friction scaling up Continuous Deployment configurations. By wrapping everything into one `docker-compose.yml`, local environments perfectly represent live staging instances.

## Why Python & React?

Using **React (Vite/TS)** pushes me to define highly responsive, interactive UI elements, while **FastAPI (Python)** allows me to write extremely fast, concurrent REST endpoints backed by the Pydantic type safety engine.

### Code Demonstration

Here is what the dependency injection looks like when validating our simple `.env` API Key before allowing destructive DB interactions:

```python
def verify_admin_key(credentials: HTTPAuthorizationCredentials = Depends(security)):
    expected_key = getattr(settings, "ADMIN_API_KEY", "DEV_KEY")
    
    if credentials.credentials != expected_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid administration credentials",
        )
    return True
```

Notice the sheer elegance. It stops the bad actors structurally before they could even hit the DB querying context! 

---
*If you are interested in System Design, look out for my next post coming shortly.*
"""
        )

        blog2 = Blog(
            title="Aesthetics and Token-driven Styling with TailwindCSS",
            slug="tailwind-design-system-tokens",
            published=True,
            content="""# No More Hardcoding.
            
If you write explicit HEX values in your React components, you aren't writing sustainable code. Here is how I structured this website using CSS Custom variables and the native `<alpha-value>` modifier.

## The Problem
When a UI designer tells us we need a **"Glassmorphism surface backdrop"**, commonly we might throw in something messy via generic Tailwind:
`bg-[#12121c]/80 backdrop-blur-md`

This breaks the minute we want to offer a Light Mode.

## The Solution
Instead, define an RGB matrix in `:root` and map it into the native tailwind config:

```css
:root {
  --color-surface: 255 255 255; 
}
.dark {
  --color-surface: 18 18 28;
}
```

Now `bg-surface/80` dynamically evaluates to correct RBGA mappings without requiring specific generic components!

| Pattern Type | Problem | Solution |
| ----------- | ----------- | ----------- |
| Hex Codes | Hard to theme | Convert into space-separated RGB tokens. |
| In-line Styles | Low maintainability. | Use `@apply` layers to abstract. |
"""
        )

        session.add(blog1)
        session.add(blog2)
        session.commit()
        print("Database seeded with sample Markdown blogs successfully!")
    else:
        print("Database already contains data! Skipping Seed.")
