import sys
import json
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

def load_data():
    movies = pd.read_csv('CSV/movies.csv')
    ratings = pd.read_csv('CSV/ratings.csv')
    return movies, ratings

def preprocess_data(movies):
    # Combine genres into a single string
    movies['genres'] = movies['genres'].str.replace('|', ' ')
    return movies

def get_user_profile(liked_movies, movies):
    liked_movies_df = pd.DataFrame(liked_movies)
    liked_movies_df = liked_movies_df.merge(movies, on='title', how='inner')
    
    # Create user profile based on liked movies and scores
    cv = CountVectorizer()
    genre_matrix = cv.fit_transform(liked_movies_df['genres'])
    user_profile = genre_matrix.T.dot(liked_movies_df['score'])
    
    return user_profile, cv

def recommend_movies(user_profile, cv, movies):
    genre_matrix = cv.transform(movies['genres'])
    similarity_scores = cosine_similarity(user_profile.T, genre_matrix)
    movies['similarity'] = similarity_scores[0]
    
    # Recommend movies that the user hasn't liked yet
    recommended_movies = movies.sort_values(by='similarity', ascending=False)
    recommended_movies = recommended_movies[~recommended_movies['title'].isin(user_profile.index)]
    
    return recommended_movies[['title', 'genres', 'similarity']].head(10).to_dict(orient='records')

def main():
    liked_movies = json.loads(sys.argv[1])
    movies, ratings = load_data()
    movies = preprocess_data(movies)
    
    user_profile, cv = get_user_profile(liked_movies, movies)
    recommended_movies = recommend_movies(user_profile, cv, movies)
    
    print(json.dumps(recommended_movies))

if __name__ == "__main__":
    main()
