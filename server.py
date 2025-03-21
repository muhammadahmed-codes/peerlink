from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the uploads directory exists

@app.route("/upload-folder", methods=["POST"])
def upload_folder():
    requirements_exist = False  # Track if requirements.txt is uploaded

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


@app.route("/uploaded-files", methods=["GET"])
def get_uploaded_files():
    try:
        # Check if the upload folder exists
        if not os.path.exists(UPLOAD_FOLDER):
            return jsonify({"message": "Upload folder does not exist"}), 404

        # Get the list of files in the uploads folder (including subdirectories)
        files = []
        for root, _, filenames in os.walk(UPLOAD_FOLDER):
            for filename in filenames:
                # Store relative file paths
                file_path = os.path.relpath(os.path.join(root, filename), UPLOAD_FOLDER)
                files.append(file_path)

        return jsonify({"files": files}), 200

    except Exception as e:
        return jsonify({"message": "Error reading files", "error": str(e)}), 500


if __name__ == "__main__":
    # process = subprocess.Popen('../../dicedb-cli/dicedb-cli', shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    # process.stdin.write('SET k v\n')
    # process.stdin.write('GET k\n')
    # process.stdin.flush()  # Ensure commands are sent

    app.run(host="0.0.0.0", port=5001, debug=True)
