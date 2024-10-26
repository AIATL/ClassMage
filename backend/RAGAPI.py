from fastapi import FastAPI, HTTPException, Query
from main import createOrUpdateRag, askRagQuestion
import json

app = FastAPI()

@app.post("/create_update_rag/{ragname}")
async def create_update_rag(ragname: str):
    try:
        createOrUpdateRag(ragname)
        return {"message": f"RAG '{ragname}' created or updated successfully."}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask_question/")
async def ask_question(ragname: str, query: str, prior_queries):
    try:
        response, source = askRagQuestion(ragname, query, prior_queries)
        return {
            "response": response.text,
            "source": source
        }
    except ValueError as e:
        print(e)
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


