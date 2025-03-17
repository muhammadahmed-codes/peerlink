from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure main upload folder exists

@app.route("/upload-folder", methods=["POST"])
def upload_folder():
    requirements_exist = False  # Corrected variable name

    if "files" not in request.files:
        return jsonify({"message": "No files uploaded"}), 400

    files = request.files.getlist("files")  # Get all uploaded files

    for file in files:
        relative_path = file.filename  # Preserve folder structure
        save_path = os.path.join(UPLOAD_FOLDER, relative_path)

        # Check if requirements.txt exists
        if "requirements.txt" in relative_path:
            requirements_exist = True

        # Ensure directories exist before saving
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        file.save(save_path)
    
    if requirements_exist: 
        return jsonify({"message": "Files uploaded successfully, requirements.txt found"}), 200
    
    return jsonify({"message": "Folder uploaded but requirements.txt is missing"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
