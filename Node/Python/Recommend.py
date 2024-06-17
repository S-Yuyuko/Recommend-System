import json
import os
import sys
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

def load_data():
    movies = pd.read_csv('../CSV/movies.csv')
    ratings = pd.read_csv('../CSV/ratings.csv')
    return movies, ratings

def get_user_profile(liked_movies, movies):
    for movie in liked_movies:
        movie['genres'] = '|'.join(movie['genres'])
    
    user_profile = pd.DataFrame(liked_movies)
    
    user_profile = user_profile.merge(movies[['movieId', 'title']], on='title', how='left')
    user_profile = user_profile.drop(columns=['movieId_x'])
    user_profile = user_profile.rename(columns={'movieId_y': 'movieId'})
    
    return user_profile

def create_user_item_matrix(ratings):
    user_item_matrix = ratings.pivot(index='userId', columns='movieId', values='rating')
    return user_item_matrix

def collaborative_filtering(user_profile, user_item_matrix, movies):
    current_user_id = user_item_matrix.index.max() + 1
    for _, row in user_profile.iterrows():
        user_item_matrix.at[current_user_id, row['movieId']] = row['score']
    
    user_ratings = user_item_matrix.fillna(0)
    similarity_matrix = cosine_similarity(user_ratings)
    similarity_df = pd.DataFrame(similarity_matrix, index=user_ratings.index, columns=user_ratings.index)
    
    similar_users = similarity_df[current_user_id].sort_values(ascending=False).index[1:11]
    
    similar_users_ratings = user_item_matrix.loc[similar_users]
    mean_ratings = similar_users_ratings.mean(axis=0)
    user_movies = set(user_profile['movieId'])
    recommended_movies = mean_ratings[~mean_ratings.index.isin(user_movies)]
    recommended_movies = recommended_movies.sort_values(ascending=False).head(10)
    recommendations = movies[movies['movieId'].isin(recommended_movies.index)]
    return recommendations

def content_based_filtering(user_profile, movies):
    tfidf = TfidfVectorizer(stop_words='english')
    movies['genres'] = movies['genres'].fillna('')
    tfidf_matrix = tfidf.fit_transform(movies['genres'])
    
    user_genres = ' '.join(user_profile['genres'].values)
    user_tfidf = tfidf.transform([user_genres])
    cosine_sim = cosine_similarity(user_tfidf, tfidf_matrix)
    
    similarity_scores = list(enumerate(cosine_sim[0]))
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    similarity_scores = similarity_scores[:10]
    
    movie_indices = [i[0] for i in similarity_scores]
    recommendations = movies.iloc[movie_indices]
    return recommendations

def get_recommendations(liked_movies):
    movies, ratings = load_data()
    user_profile = get_user_profile(liked_movies, movies)
    
    user_item_matrix = create_user_item_matrix(ratings)
    
    collaborative_recommendations = collaborative_filtering(user_profile, user_item_matrix, movies)
    content_recommendations = content_based_filtering(user_profile, movies)
    
    combined_recommendations = pd.concat([collaborative_recommendations, content_recommendations]).drop_duplicates().head(10)
    return combined_recommendations.to_json(orient='records')

def main():
    input_data = sys.stdin.read()
    liked_movies = json.loads(input_data)
    recommendations = get_recommendations(liked_movies)
    print(recommendations)

if __name__ == "__main__":
    main()
