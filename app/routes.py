# RecomMix/app/routes.py

from flask import render_template
from app import app
from .recommendation.data_processing import fetch_songs_from_api, extract_audio_features, preprocess_data, normalize_data, save_data_to_database

@app.route('/data_collection_and_preprocessing')
def data_collection_and_preprocessing():
    # Define your API endpoint
    api_endpoint = 'https://api.spotify.com/v1/me/tracks'

    # Step 1: Fetch songs dataset using an API
    songs_dataset = fetch_songs_from_api(api_endpoint)

    # Step 2: Extract relevant audio features
    audio_features = extract_audio_features(songs_dataset)

    # Step 3: Preprocess the dataset
    preprocessed_data = preprocess_data(audio_features)

    # Step 4: Normalize and scale audio features
    normalized_data = normalize_data(preprocessed_data)

    # Step 5: Save the preprocessed dataset for future use
    table_name = 'preprocessed_data_table'
    save_data_to_database(normalized_data, table_name)

    return "Data collection and preprocessing completed!"
