import sys
import csv
import json
import os

def load_movies(csv_file_path):
    try:
        movies = []
        with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                movies.append({
                    'id': int(row['movieId']),
                    'title': row['title'],
                    'genres': row['genres'].split('|')
                })
        return movies
    except Exception as e:
        print(f"Error loading movies: {e}", file=sys.stderr)
        return []

def filter_movies(movies, genres):
    filtered_movies = [
        movie for movie in movies
        if genres & set(movie['genres'])
    ]
    return filtered_movies

def paginate_movies(movies, page, limit):
    start = (page - 1) * limit
    end = start + limit
    return movies[start:end], len(movies)

def main():
    try:
        csv_file_path = os.path.join(os.path.dirname(__file__), '../CSV/movies.csv')
        genres = set(sys.argv[1:-2])  # Exclude the last two arguments for page and limit
        page = int(sys.argv[-2])
        limit = int(sys.argv[-1])

        movies = load_movies(csv_file_path)

        if not genres:
            print(json.dumps([]))
            return

        filtered_movies = filter_movies(movies, genres)
        paginated_movies, total_movies = paginate_movies(filtered_movies, page, limit)
        total_pages = (total_movies + limit - 1) // limit  # Calculate total pages
        response = {
            "movies": paginated_movies,
            "totalPages": total_pages
        }
        print(json.dumps(response))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
