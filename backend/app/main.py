from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool
import vertexai
import json

from google.oauth2 import service_account
import os
from dotenv import load_dotenv

load_dotenv()

json_account_info = json.loads(os.environ.get("GOOGLE_CLOUD_JSON"))  # convert JSON to dictionary
print(json_account_info)

credentials = service_account.Credentials.from_service_account_info(json_account_info)

# Create a RAG Corpus, Import Files, and Generate a response

# TODO(developer): Update and un-comment below lines
PROJECT_ID = "coursemage-2db7f"

# Supports Google Cloud Storage and Google Drive Links

# Initialize Vertex AI API once per session
vertexai.init(project=PROJECT_ID, location="us-central1")

ragLookUp = {}

def loadRag(corpora):
    ragLookUp[corpora.display_name] = corpora

def loadRags():
    print(f" loading rags")
    corpora = rag.list_corpora()

    i = 0
    for c in corpora:
        i+=1
        loadRag(c)

    print(f"finished loading {i} rags")


loadRags()

def createOrUpdateRag(name):
    if name in ragLookUp:
        updateRagFiles(name)
    else:
        newRag = createNewRag(name)
        loadRag(newRag)



def createNewRag(name):
    print(f"creating new rag for {name}")
    paths = ["gs://coursemage-2db7f.appspot.com/" + name]
    # Create RagCorpus
    # Configure embedding model, for example "text-embedding-004".
    embedding_model_config = rag.EmbeddingModelConfig(
        publisher_model="publishers/google/models/text-embedding-004"
    )

    rag_corpus = rag.create_corpus(
        display_name=name,
        embedding_model_config=embedding_model_config,
    )

    # Import Files to the RagCorpus
    rag.import_files(
        rag_corpus.name,
        paths,
        use_advanced_pdf_parsing=True,
        chunk_size=512,  # Optional
        chunk_overlap=100,  # Optional
        max_embedding_requests_per_min=900,  # Optional
    )
    print(f"completed creation of {name}")
    return rag_corpus

def updateRagFiles(name):
    paths = ["gs://coursemage-2db7f.appspot.com/" + name]

    print(f"updating rag files for {name}")
    rag_corpus = ragLookUp[name]

    # Import Files to the RagCorpus
    response = rag.import_files(
        rag_corpus.name,
        paths,
        use_advanced_pdf_parsing=True,
        chunk_size=512,  # Optional
        chunk_overlap=100,  # Optional
        max_embedding_requests_per_min=900,  # Optional
    )
    print(f"Imported {response.imported_rag_files_count} files.")
    print(f"skiped {response.skipped_rag_files_count} files.")
    print(f"completed update of rag files for {name}")

# def loadRagRetrival():
#     # Direct context retrieval
#     response = rag.retrieval_query(
#         rag_resources=[
#             rag.RagResource(
#                 rag_corpus=rag_corpus.name,
#                 # Optional: supply IDs from `rag.list_files()`.
#                 # rag_file_ids=["rag-file-1", "rag-file-2", ...],
#             )
#         ],
#         text="What is the law of Universal Gravitation?",
#         similarity_top_k=10,  # Optional
#         vector_distance_threshold=0.5,  # Optional
#     )
#     print(f"dir {response}")

def askRagQuestion(name, query, priorqueries):
    rag_corpus = ragLookUp[name]
    # Enhance generation
    # Create a RAG retrieval tool
    rag_retrieval_tool = Tool.from_retrieval(
        retrieval=rag.Retrieval(
            source=rag.VertexRagStore(
                rag_resources=[
                    rag.RagResource(
                        rag_corpus=rag_corpus.name,  # Currently only 1 corpus is allowed.
                        # Optional: supply IDs from `rag.list_files()`.
                        # rag_file_ids=["rag-file-1", "rag-file-2", ...],
                    )
                ],
                similarity_top_k=3,  # Optional
                vector_distance_threshold=0.5,  # Optional
            ),
        )
    )
    # Create a gemini-pro model instance
    rag_model = GenerativeModel(
        model_name="gemini-1.5-flash-001", tools=[rag_retrieval_tool]
    )
    try:
        with open(priorqueries, "r") as f:
            priorqueries = json.load(f)
            final = json.dumps(priorqueries, indent=4)
    except:
        final = priorqueries
    query_final = f"""
            **Context:**
            use this list of prior queries:
            {priorqueries}
            to answer the following query:
            {query}
            **Instruction:**
            do not include asterisks or slashes. Give the student one example of the explanation of the query,
            do not exceed more than 1 paragraph or 150 words.
            
            Please ensure your response is:
            * Clear and concise
            * Informative and helpful
            * Free of self-references
            * Tailored to the specific context and instruction
            """
    response = rag_model.generate_content(query_final)
    sources = response.to_dict()["candidates"][0]["grounding_metadata"]["grounding_chunks"][0]["retrieved_context"]["uri"]
    return response, sources

