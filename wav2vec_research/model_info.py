from transformers import Wav2Vec2Model

model = Wav2Vec2Model.from_pretrained(
    "facebook/wav2vec2-base-960h"
)

total_params = sum(
    p.numel() for p in model.parameters()
)

print(f"Parameters: {total_params:,}")
