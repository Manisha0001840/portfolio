import numpy as np

embedding = np.load(
    "embeddings/sample_embedding.npy"
)

print("Shape:", embedding.shape)

print("\nFirst 20 values:\n")

print(embedding[0][:20])