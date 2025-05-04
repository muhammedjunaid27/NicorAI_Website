def mock_ai_function(request):
    query = request.get("query", "")
    response_type = request.get("responseType", "text")
    response = {
        "responseId": "mock-1",
        "responseType": response_type,
        "content": {
            "text": f"Mock AI response to: {query}"
        },
        "metadata": {
            "modelUsed": "mock-model",
            "tokensUsed": 10
        }
    }
    return response

# Test the function
test_request = {
    "query": "What does NicorAi do?",
    "context": [],
    "responseType": "text"
}
print(mock_ai_function(test_request))