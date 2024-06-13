import csv
import json
import os
import sys

def load_genres(csv_file_path):
    try:
        genres = set()
        with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                for genre in row['genres'].split('|'):
                    if genre:  # Exclude empty genres
                        genres.add(genre)
                    else:
                        genres.add('ALL')  # Add 'ALL' for empty genres
        return sorted(genres)  # Sort genres alphabetically
    except Exception as e:
        print(f"Error loading genres: {e}", file=sys.stderr)
        return []

def main():
    try:
        csv_file_path = os.path.join(os.path.dirname(__file__), '../CSV/movies.csv')
        genres = load_genres(csv_file_path)
        print(json.dumps(genres))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
