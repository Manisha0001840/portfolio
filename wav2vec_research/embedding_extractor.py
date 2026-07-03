import torch
import numpy as np
import soundfile as sf
import librosa

from transformers import (
    AutoProcessor,
    Wav2Vec2Model
)

processor = AutoProcessor.from_pretrained(
    "facebook/wav2vec2-base-960h"
)
print("Loading model...")


model = Wav2Vec2Model.from_pretrained(
    "facebook/wav2vec2-base-960h"
)

print("Loading audio...")

audio, sample_rate = librosa.load(
    "audio/sample-15s.wav",
    sr=16000
)

print("Sample Rate:", sample_rate)
print("Audio Length:", len(audio))
print("Audio Type:", type(audio))
print("Audio Shape:", audio.shape)

inputs = processor(
    audio,
    sampling_rate=16000,
    return_tensors="pt"
)

print("Input Keys:", inputs.keys())
print("Input Shape:", inputs.input_values.shape)

with torch.no_grad():
    outputs = model(**inputs)

hidden_states = outputs.last_hidden_state

print("Hidden State Shape:")
print(hidden_states.shape)

embedding = hidden_states.mean(dim=1)

print("Final Embedding Shape:")
print(embedding.shape)

np.save(
    "embeddings/sample_embedding.npy",
    embedding.numpy()
)

print("Embedding Saved!")
print("Sample Rate:", sample_rate)











