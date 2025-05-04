from pinecone import Pinecone, ServerlessSpec
import requests
from sentence_transformers import SentenceTransformer

# Your Pinecone and Strapi details
PINECONE_API_KEY = "pcsk_5mHAPq_7p3j66o1objVUHaLeam7u2uDN6c926WXBMfYronL9Y6d3AvNB6Jn4tKpWDsBEGq"  # Paste your key from pinecone-key.txt
PINECONE_INDEX_NAME = "nicorai-faq"
STRAPI_URL = "http://localhost:1337/api/faqs"

# Set up Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

# Check if index exists; skip creation if it does
index_exists = any(index["name"] == PINECONE_INDEX_NAME for index in pc.list_indexes())
if not index_exists:
    pc.create_index(
        name=PINECONE_INDEX_NAME,
        dimension=768,  # Matches the index
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")  # Matches your index region
    )

# Connect to the index
index = pc.Index(PINECONE_INDEX_NAME)

# Set up the model to create vectors (1024 dimensions)
model = SentenceTransformer('gtr-t5-large')

# Get FAQs from Strapi
try:
    response = requests.get(STRAPI_URL)
    response.raise_for_status()  # Check for errors
    faqs = response.json()['data']
except requests.RequestException as e:
    print(f"Error fetching FAQs from Strapi: {e}")
    exit(1)

# Prepare FAQs for Pinecone
vectors = []
for faq in faqs:
    question = faq['question']  # Matches JSON structure
    answer = faq['answer']      # Matches JSON structure
    text = f"{question} {answer}"  # Combine question and answer
    vector = model.encode(text).tolist()  # Turn text into a 1024-dimensional vector
    vectors.append({
        "id": f"faq-{faq['id']}",
        "values": vector,
        "metadata": {"question": question, "answer": answer}
    })

# Send vectors to Pinecone
index.upsert(vectors=vectors)
print("FAQs synced to Pinecone!")