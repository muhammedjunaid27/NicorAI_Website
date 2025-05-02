import sqlite3
import os
import json

# --- FIX: Update this line with the FULL path to your knowledge_base.db file ---
# Example for Windows:
DATABASE_FILE = 'C:\\Users\\muham\\NicorAI_Website\\knowledge-base\\knowledge_base.db'

# Example for macOS/Linux (if you were using that):
# DATABASE_FILE = '/path/to/your/project/knowledge-base/knowledge_base.db'

# Make sure to use double backslashes \\ in Windows paths within Python strings
# or use forward slashes / which often work on Windows too:
# DATABASE_FILE = 'C:/Users/muham/NicorAI_Website/knowledge-base/knowledge_base.db'
# -----------------------------------------------------------------------------


def format_kb_response(entries, total_count):
    """
    Formats the retrieved knowledge entries and total count
    into the structure required by the Orchestration module (4.3.5 Response).
    """
    formatted_output = {
        "results": [],
        "totalResults": total_count
    }

    for entry in entries:
        formatted_entry = {
            "id": str(entry.get('id')),
            "content": entry.get('content'),
            "metadata": {
                "title": entry.get('title'),
                "keywords": entry.get('keywords'),
                "source": entry.get('source')
            },
            "relevanceScore": entry.get('relevanceScore', 0.0)
        }
        formatted_output["results"].append(formatted_entry)

    return formatted_output


def get_knowledge_entries(query: str, filters: dict = None, limit: int = 10, offset: int = 0):
    """
    Retrieves knowledge entries, adds simulated relevance, and formats the output.
    """
    conn = None
    entries = []
    total_results_count = 0
    try:
        # Ensure the database file exists before trying to connect
        if not os.path.exists(DATABASE_FILE):
            print(f"Error: Database file not found at {DATABASE_FILE}")
            return format_kb_response([], 0) # Return empty results if file not found

        conn = sqlite3.connect(DATABASE_FILE)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        # --- Get paginated entries ---
        sql_query = """
        SELECT id, title, content, keywords, source
        FROM knowledge_entries
        WHERE content LIKE ? OR keywords LIKE ?
        """
        query_params = [f'%{query}%', f'%{query}%']

        if filters:
            # Basic filtering implementation (FR-KB-05)
            for key, value in filters.items():
                if isinstance(value, str):
                     sql_query += f" AND {key} = ?"
                     query_params.append(value)
                # Add other filter types if needed

        sql_query += " LIMIT ? OFFSET ?"
        query_params_paginated = query_params + [limit, offset]

        print(f"Executing paginated SQL: {sql_query} with params: {query_params_paginated}")

        cursor.execute(sql_query, query_params_paginated)
        rows = cursor.fetchall()

        processed_entries = []
        for row in rows:
            entry = dict(row)
            entry['relevanceScore'] = 0.9 # Simulated score (FR-KB-03)
            processed_entries.append(entry)

        entries = processed_entries

        # --- Get total count (for totalResults) ---
        count_query = """
        SELECT COUNT(*)
        FROM knowledge_entries
        WHERE content LIKE ? OR keywords LIKE ?
        """
        count_params = [f'%{query}%', f'%{query}%']
        if filters:
             for key, value in filters.items():
                if isinstance(value, str):
                     count_query += f" AND {key} = ?"
                     count_params.append(value)

        print(f"Executing count SQL: {count_query} with params: {count_params}")
        cursor.execute(count_query, count_params)
        total_results_count = cursor.fetchone()[0]

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # In a real app, log this error properly
        total_results_count = 0 # Ensure count is 0 on error
        entries = [] # Ensure entries are empty on error

    finally:
        if conn:
            conn.close()

    # Format the final response (FR-KB-04)
    return format_kb_response(entries, total_results_count)


# Example of how to call the function (for testing)
if __name__ == "__main__":
    print("Testing retrieval for 'services' and formatting:")
    formatted_response = get_knowledge_entries(query="services")
    print(json.dumps(formatted_response, indent=2))

    print("\nTesting retrieval for 'nonexistent' query and formatting:")
    formatted_response_none = get_knowledge_entries(query="nonexistent")
    print(json.dumps(formatted_response_none, indent=2))

    print("\nTesting retrieval for 'company goal' with limit 1 and formatting:")
    formatted_response_limited = get_knowledge_entries(query="company goal", limit=1)
    print(json.dumps(formatted_response_limited, indent=2))

    print("\nTesting retrieval with a filter (example, assuming a 'source' filter):")
    # Note: This filter example assumes you want to filter by the 'source' column
    # and that the filter value is an exact match string.
    # formatted_response_filtered = get_knowledge_entries(query="AI", filters={'source': 'NicorAI Systems Private Limited .pdf'})
    # print(json.dumps(formatted_response_filtered, indent=2))

