from pinecone import Pinecone
from sentence_transformers import SentenceTransformer

# Your Pinecone details
PINECONE_API_KEY = "pcsk_5mHAPq_7p3j66o1objVUHaLeam7u2uDN6c926WXBMfYronL9Y6d3AvNB6Jn4tKpWDsBEGq"  # Paste your key from pinecone-key.txt
PINECONE_INDEX_NAME = "nicorai-faq"

# Set up Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX_NAME)

# Set up the same embedding model as sync_strapi_to_pinecone.py
model = SentenceTransformer('paraphrase-mpnet-base-v2')

# Test query
query = "What does NicorAi do?"
query_vector = model.encode(query).tolist()  # Convert query to 768-dimensional vector

# Query Pinecone
results = index.query(vector=query_vector, top_k=1, include_metadata=True)
print(results)