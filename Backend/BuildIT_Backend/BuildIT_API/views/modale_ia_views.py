from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from openai import OpenAI
import time
import os

#ASSISTANT_ID="asst_z7Ae71fbnBfLWGp6ChWz98NG" # Assistant ID for BuildIT v3
ASSISTANT_ID="asst_RpHjOisE2GGzQJ2MK4LGnlT0" # Assistant ID for BuildIT v4

PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, os.pardir))
ENV_FOLDER = os.path.join(PATH, ".env")
API_KEY = None
if os.path.exists(ENV_FOLDER):
    with open(ENV_FOLDER, "r") as f:
        lines = f.readlines()
        for line in lines:
            if "OPENAI_API_KEY_BUILDIT" in line:
                API_KEY = line.split("=")[1].strip()
if not API_KEY:
    raise ValueError("OPENAI_API_KEY_BUILDIT not found in .env file")


client = OpenAI(api_key=API_KEY)

class CreateThread(APIView):
    def post(self, request):
        thread = client.beta.threads.create()
        my_thread_id = thread.id
        return Response({"thread_id": my_thread_id}, status=status.HTTP_200_OK)

class UpdateRunThread(APIView):
    def post(self, request):
        my_thread_id = request.data.get("thread_id")
        message = request.data.get("content")
        client.beta.threads.messages.create(
            thread_id=my_thread_id,
            role="user",
            content=str(message)
        )
        run = client.beta.threads.runs.create(
            thread_id=my_thread_id,
            assistant_id=ASSISTANT_ID
        )
        return Response({"run_id": run.id, "thread_id": my_thread_id}, status=status.HTTP_200_OK)

class GetAssistantResponse(APIView):
    def post(self, request):
        thread_id = request.data.get("thread_id")
        run_id = request.data.get("run_id")
        if not thread_id:
            return Response({"error": "thread_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not run_id:
            return Response({"error": "run_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check the status of the run
        run_id = request.data.get("run_id")
        if run_id:
            run_status = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id).status
            while run_status != "completed":
                time.sleep(1)  # Wait for 1 second before checking again
                run_status = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id).status
        
        response = client.beta.threads.messages.list(thread_id=thread_id)
        assistant_reply = None
        if response.data:
            for message in response.data:
                if message.role == "assistant":
                    if message.content[0].text.value.startswith("```json") and message.content[0].text.value.endswith("```"):
                        assistant_reply = message.content[0].text.value.strip("```json").strip("```")
                        break
                    else:
                        assistant_reply = message.content[0].text.value
        
        return Response({"assistant_reply": assistant_reply}, status=status.HTTP_200_OK)

class DeleteThread(APIView):
    def post(self, request):
        thread_id = request.data.get("thread_id")
        if not thread_id:
            return Response({"error": "thread_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        client.beta.threads.delete(thread_id=thread_id)
        return Response({"message": "Thread deleted successfully"}, status=status.HTTP_200_OK)