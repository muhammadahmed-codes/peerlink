import json
import os

# Function to generate a unique log file name based on parameters
def generate_log_filename(source, target, algorithm, data_structure):
    # Create a filename that incorporates the source, target, algorithm, and data structure
    filename = f"log_{source}_{target}_{algorithm}_{data_structure}.json"
    return filename

# Function to load existing paths from a dynamically generated log file
def load_log(source, target, algorithm, data_structure):
    log_filename = generate_log_filename(source, target, algorithm, data_structure)
    if os.path.exists(log_filename):
        with open(log_filename, 'r') as file:
            return json.load(file)
    else:
        return {}

# Function to save a path to a dynamically generated log file (including all paths explored)
def save_log(source, target, algorithm, data_structure, cost, path, all_paths):
    log_filename = generate_log_filename(source, target, algorithm, data_structure)

    log_data = load_log(source, target, algorithm, data_structure)

    # Create a unique key for this combination of parameters
    key = f"{source}_{target}_{algorithm}_{data_structure}"

    # Store the data under the generated key
    log_data[key] = {
        "cost": cost,
        "path": path,
        "all_paths": all_paths  # Save all paths explored
    }

    # Save the log data back to the dynamically generated file
    with open(log_filename, 'w') as file:
        json.dump(log_data, file, indent=4)

# Function to get the log entry for a specific source, target, algorithm, and data structure
def get_log_entry(source, target, algorithm, data_structure):
    log_filename = generate_log_filename(source, target, algorithm, data_structure)
    log_data = load_log(source, target, algorithm, data_structure)

    # Generate the unique key for this combination of parameters
    key = f"{source}_{target}_{algorithm}_{data_structure}"

    # Return the log entry if it exists, otherwise return None
    return log_data.get(key)