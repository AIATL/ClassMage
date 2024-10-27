// src/utils/fetchAIResponse.js
export async function fetchAIResponse(ragname, query, priorQueries = []) {
    const response = await fetch(`${import.meta.env.VITE_FIREBASE_BACKEND_URL}/ask_question/?ragname=${ragname}&query=${query}&prior_queries=${JSON.stringify(priorQueries)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ragname: ragname,
            query: query,
            prior_queries: JSON.stringify(priorQueries),
        }),
    });
    
    if (!response.ok) {
        console.error(response);
        throw new Error("Error fetching AI response");
    }
    
    const data = await response.json();
    return data;
}
