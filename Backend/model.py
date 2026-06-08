# ============================
# Step 1: Import libraries
# ============================
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout, Conv1D, MaxPooling1D
from tensorflow.keras.callbacks import EarlyStopping
import pickle

# ============================
# Step 2: Load CSV files
# ============================
fake = pd.read_csv("Fake.csv")
real = pd.read_csv("Real.csv")

# Add labels
fake["label"] = "FAKE"
real["label"] = "REAL"

# Merge datasets
data = pd.concat([fake, real], axis=0)
data = data.sample(frac=1, random_state=42).reset_index(drop=True)

# Combine title + text (same as your LSTM model)
data["content"] = data["title"].fillna("") + " " + data["text"].fillna("")

# Label Encoding
le = LabelEncoder()
data["label_encoded"] = le.fit_transform(data["label"])

# ============================
# Step 3: Train–test split
# ============================
X_train, X_test, y_train, y_test = train_test_split(
    data["content"],
    data["label_encoded"],
    test_size=0.2,
    random_state=42
)

# ============================
# Step 4: Tokenization
# ============================
max_words = 10000
max_len = 200

tokenizer = Tokenizer(num_words=max_words, oov_token="<OOV>")
tokenizer.fit_on_texts(X_train)

X_train_seq = tokenizer.texts_to_sequences(X_train)
X_test_seq = tokenizer.texts_to_sequences(X_test)

# Padding
X_train_pad = pad_sequences(X_train_seq, maxlen=max_len, padding='post', truncating='post')
X_test_pad = pad_sequences(X_test_seq, maxlen=max_len, padding='post', truncating='post')

# ============================
# Step 5: Build CNN + LSTM model
# ============================
embedding_dim = 128

model = Sequential()

# Embedding
model.add(Embedding(input_dim=max_words, output_dim=embedding_dim, input_length=max_len))

# ⭐ CNN Layer (kept small to avoid destroying LSTM behavior)
model.add(Conv1D(filters=64, kernel_size=3, activation='relu'))
model.add(MaxPooling1D(pool_size=2))

# ⭐ LSTM Layer (same as your working model)
model.add(LSTM(128, dropout=0.2, recurrent_dropout=0.2))

# Output Layer
model.add(Dense(1, activation='sigmoid'))

# Compile
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

# ============================
# Step 6: Train the model
# ============================
es = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)

history = model.fit(
    X_train_pad,
    y_train,
    epochs=10,
    batch_size=64,
    validation_split=0.2,
    callbacks=[es],
    verbose=1
)

# ============================
# Step 7: Evaluate
# ============================
loss, accuracy = model.evaluate(X_test_pad, y_test)
print("\n🎯 Test Accuracy:", accuracy)

# ============================
# Step 8: Save model + tokenizer
# ============================
model.save("fake_news_lstm_model.h5")

with open("tokenizer.pkl", "wb") as f:
    pickle.dump(tokenizer, f)

print("\n✅ CNN+LSTM model and tokenizer saved successfully!")

# ============================
# Step 9: Test Prediction
# ============================
sample_text = ["Breaking news: government announces new economic reform"]
sample_seq = tokenizer.texts_to_sequences(sample_text)
sample_pad = pad_sequences(sample_seq, maxlen=max_len, padding='post', truncating='post')

prediction = model.predict(sample_pad)[0][0]
pred_label = "REAL" if prediction >= 0.5 else "FAKE"

print("\n📰 Sample Prediction:", pred_label, "| Score:", prediction)


# # ================================================================
# # 🧠 Fake News Detection using BiLSTM + GloVe Embeddings (Improved)
# # ================================================================

# # Step 1: Import libraries
# import pandas as pd
# import numpy as np
# import re
# import nltk
# from nltk.corpus import stopwords
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import LabelEncoder
# from sklearn.metrics import classification_report, confusion_matrix
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Embedding, Bidirectional, LSTM, Dense, Dropout
# from tensorflow.keras.callbacks import EarlyStopping
# import pickle

# nltk.download("stopwords")
# stop_words = set(stopwords.words("english"))

# # Step 2: Load CSV files
# fake = pd.read_csv("Fake.csv")
# real = pd.read_csv("Real.csv")

# # Step 3: Add labels
# fake["label"] = "FAKE"
# real["label"] = "REAL"

# # Step 4: Combine datasets and shuffle
# data = pd.concat([fake, real], axis=0)
# data = data.sample(frac=1).reset_index(drop=True)

# # Step 5: Combine title + text
# data["content"] = data["title"].fillna("") + " " + data["text"].fillna("")

# # Step 6: Clean text (remove URLs, punctuation, stopwords)
# def clean_text(text):
#     text = str(text).lower()
#     text = re.sub(r"http\S+", "", text)            # remove URLs
#     text = re.sub(r"[^a-zA-Z\s]", "", text)        # remove punctuation/numbers
#     text = " ".join([word for word in text.split() if word not in stop_words])
#     return text

# data["content"] = data["content"].apply(clean_text)

# # Step 7: Remove invalid/empty rows
# before_rows = len(data)
# data = data[data["content"].str.strip() != ""]
# after_rows = len(data)
# print(f"\n✅ Total valid rows after cleaning: {after_rows}/{before_rows}")

# # Step 8: Encode labels (FAKE=0, REAL=1)
# le = LabelEncoder()
# data["label_encoded"] = le.fit_transform(data["label"])

# # Step 9: Split data into train/test
# X_train, X_test, y_train, y_test = train_test_split(
#     data["content"], data["label_encoded"], test_size=0.2, random_state=42
# )

# # Step 10: Tokenize text
# max_words = 10000   # max vocabulary size
# max_len = 200       # max sequence length

# tokenizer = Tokenizer(num_words=max_words, oov_token="<OOV>")
# tokenizer.fit_on_texts(X_train)

# X_train_seq = tokenizer.texts_to_sequences(X_train)
# X_test_seq = tokenizer.texts_to_sequences(X_test)

# # Step 11: Pad sequences
# X_train_pad = pad_sequences(X_train_seq, maxlen=max_len, padding="post", truncating="post")
# X_test_pad = pad_sequences(X_test_seq, maxlen=max_len, padding="post", truncating="post")

# # Step 12: Load Pre-trained GloVe Embeddings
# embedding_dim = 100
# embeddings_index = {}
# print("\n🔍 Loading GloVe vectors (this may take a minute)...")

# with open("glove.6B.100d.txt", encoding="utf8") as f:
#     for line in f:
#         values = line.split()
#         word = values[0]
#         coefs = np.asarray(values[1:], dtype="float32")
#         embeddings_index[word] = coefs

# embedding_matrix = np.zeros((max_words, embedding_dim))
# for word, i in tokenizer.word_index.items():
#     if i < max_words:
#         embedding_vector = embeddings_index.get(word)
#         if embedding_vector is not None:
#             embedding_matrix[i] = embedding_vector

# print("✅ GloVe embeddings loaded successfully!")

# # Step 13: Build BiLSTM Model
# model = Sequential()
# model.add(Embedding(input_dim=max_words,
#                     output_dim=embedding_dim,
#                     weights=[embedding_matrix],
#                     input_length=max_len,
#                     trainable=False))
# model.add(Bidirectional(LSTM(128, dropout=0.3, recurrent_dropout=0.3, return_sequences=True)))
# model.add(Bidirectional(LSTM(64)))
# model.add(Dropout(0.3))
# model.add(Dense(64, activation="relu"))
# model.add(Dropout(0.2))
# model.add(Dense(1, activation="sigmoid"))

# model.compile(loss="binary_crossentropy", optimizer="adam", metrics=["accuracy"])
# model.summary()

# # Step 14: Train the model
# es = EarlyStopping(monitor="val_loss", patience=3, restore_best_weights=True)

# history = model.fit(
#     X_train_pad, y_train,
#     epochs=10,
#     batch_size=32,
#     validation_split=0.2,
#     callbacks=[es]
# )

# # Step 15: Evaluate the model
# loss, accuracy = model.evaluate(X_test_pad, y_test)
# print("\n🎯 Test Accuracy:", round(accuracy * 100, 2), "%")

# # Step 16: F1-score, Precision, Recall
# y_pred = (model.predict(X_test_pad) > 0.5).astype("int32")
# print("\n📊 Classification Report:")
# print(classification_report(y_test, y_pred, target_names=["FAKE", "REAL"]))

# # Step 17: Save model and tokenizer
# model.save("fake_news_bilstm_glove.h5")
# with open("tokenizer.pkl", "wb") as f:
#     pickle.dump(tokenizer, f)
# print("\n✅ Model and tokenizer saved successfully!")

# # Step 18: Test with a sample input
# sample_text = ["Breaking news: scientists confirm water on Mars"]
# sample_text_clean = [clean_text(sample_text[0])]
# sample_seq = tokenizer.texts_to_sequences(sample_text_clean)
# sample_pad = pad_sequences(sample_seq, maxlen=max_len, padding="post", truncating="post")
# prediction = model.predict(sample_pad)[0][0]
# pred_label = "REAL" if prediction >= 0.5 else "FAKE"

# print(f"\n📰 Sample Prediction: {pred_label} (Confidence: {round(float(prediction), 3)})")




