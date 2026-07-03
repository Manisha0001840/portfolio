import torch
import librosa

from transformers import AutoProcessor
from transformers import Wav2Vec2Model

print("Loading processor...")
processor = AutoProcessor.from_pretrained(
    "facebook/wav2vec2-base-960h"
)

print("Loading model...")
model = Wav2Vec2Model.from_pretrained(
    "facebook/wav2vec2-base-960h"
)

print("Loading audio...")
audio, sr = librosa.load(
    "audio/sample-15s.wav",
    sr=16000,
    mono=True
)

print("Audio Shape:", audio.shape)

inputs = processor(
    audio,
    sampling_rate=16000,
    return_tensors="pt"
)

print("Input Shape:")
print(inputs.input_values.shape)

print("Running model...")

with torch.no_grad():
    outputs = model(
        inputs.input_values
    )

print("Success!")
print(outputs.last_hidden_state.shape)

# Create one embedding for the whole audio
embedding = outputs.last_hidden_state.mean(dim=1)

print("Embedding Shape:")
print(embedding.shape)

import numpy as np

np.save(
    "embeddings/sample_embedding.npy",
    embedding.numpy()
)

print("Embedding Saved!")