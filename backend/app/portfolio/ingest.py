# """ Ingest.py — One-Time Data Loader
#     This file is NOT part of the API. Its job is:
#          data.json ->  create embeddings -> store in ChromaDB

#      run it manually whenever your portfolio data changes.
#      python app/portfolio/ingest.py //// python -m app.portfolio.ingest
# """

from app.portfolio.chromaDB import collection, chroma_client,embedding_fn, CHROMA_PATH
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
JSON_PATH = BASE_DIR / "portfolio.json"
# ------------delete and create new collection----------------------------------
try:
    chroma_client.delete_collection("portfolio")
    print("Deleted existing collection")
except:
    pass

collection = chroma_client.create_collection(
    name="portfolio",
    embedding_function=embedding_fn,
)
print("Created new ChromaDB collection 'portfolio' at:", CHROMA_PATH)
# ───────────────────────────────────────────────────────
# with open("./portfolio.json") as f:
with open(JSON_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

docs, ids, metas = [], [], []

# ── 1. About ──────────────────────────────────────────────────────────────────
about = data["about"]
docs.append(f"""
About Satyam Kumar:
{about['description1']}

{about['description2']}
""".strip())
ids.append("about_me")
metas.append({"type": "about"})

# ── 2. Hero / contact info ────────────────────────────────────────────────────
hero = data["hero"]
docs.append(f"""
Name: {hero['name']}
Availability: {hero['availability']}
Badge: {hero['badge']}
Email: {hero['email']}
Phone: {hero['phone']}
GitHub: {hero['github_link']}
LinkedIn: {hero['linkedin_link']}
LeetCode: {hero['leetcode_link']}
Top Technologies: {', '.join(hero['top_tech'])}
Roles: {', '.join(hero['role2'])}
Bio: {hero['bio']}
""".strip())
ids.append("hero_contact")
metas.append({"type": "contact"})

# ── 3. Skills ─────────────────────────────────────────────────────────────────
for skill in data["skills"]:
    cat = skill["category"]
    docs.append(f"""
Skill Category: {cat}
Skills: {', '.join(skill['skills'])}
""".strip())
    ids.append(f"skill_{cat.lower().replace(' ', '_').replace('/', '_').replace('&', 'and')}")
    metas.append({"type": "skill", "category": cat})

# ── 4. Experience ─────────────────────────────────────────────────────────────
for exp in data["experience"]:
    project_text = "\n".join(
        f"  - {p['name']}: {p['detail']}" for p in exp["projects"]
    )
    docs.append(f"""
Role: {exp['title']}
Company: {exp['company']}
Duration: {exp['period']}

Summary:
{exp['description']}

Key Projects & Work:
{project_text}
""".strip())
    ids.append(f"experience_{exp['id']}")
    metas.append({"type": "experience", "company": exp["company"], "role": exp["title"]})

# ── 5. Projects ───────────────────────────────────────────────────────────────
for proj in data["projects"]:
    docs.append(f"""
Project: {proj['name']}
Description: {proj['description']}
Technologies: {', '.join(proj['tech'])}
GitHub: {proj.get('github', 'N/A')}
Live Demo: {proj.get('live', 'N/A')}
""".strip())
    ids.append(f"project_{proj['id']}")
    metas.append({"type": "project", "name": proj["name"]})

# ── 6. Education ──────────────────────────────────────────────────────────────
for edu in data["education"]:
    docs.append(f"""
Degree / School: {edu['title']}
Institution: {edu['institution']}
Duration: {edu['period']}
Details: {edu['description']}
""".strip())
    ids.append(f"education_{edu['id']}")
    metas.append({"type": "education", "institution": edu["institution"]})

# ── 7. Certifications ─────────────────────────────────────────────────────────
for cert in data["certifications"]:
    docs.append(f"""
Certification: {cert['title']}
Issuer: {cert['issuer']}
Date: {cert['date']}
Link: {cert.get('link', 'N/A')}
""".strip())
    ids.append(f"cert_{cert['id']}")
    metas.append({"type": "certification", "issuer": cert["issuer"]})

# ── 8. Additional info ────────────────────────────────────────────────────────
for idx, info in enumerate(data["additional_info"]):
    docs.append(f"""
Topic: {info['title']}
{info['content']}
""".strip())
    ids.append(f"info_{idx}")
    metas.append({"type": "additional_info", "topic": info["title"]})


# ── Batch upsert ──────────────────────────────────────────────────────────────
# if collection.count() > 0:
#     print("Portfolio data already exists.")
#     exit()

collection.add(documents=docs, ids=ids, metadatas=metas)

print(f"✅ Ingested {len(docs)} documents into ChromaDB.")
print("   Breakdown:")
from collections import Counter
counts = Counter(m["type"] for m in metas)
for t, n in counts.items():
    print(f"   • {t}: {n}")
