import librosa
import numpy as np

audio_path = "audio/sample-speech-1m (1).wav"
audio, sr = librosa.load(
    audio_path,
    sr=16000,
    mono=True
)

intervals = librosa.effects.split(
    audio,
    top_db= 35
)

print("\nDetected Speech Segments:\n")

for i, (start, end) in enumerate(intervals):

    start_time = start / sr
    end_time = end / sr

    print(
        f"Segment {i+1}: "
        f"{start_time:.2f}s -> {end_time:.2f}s"
    )