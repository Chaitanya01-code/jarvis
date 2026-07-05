import os

def create_file(file_path, content):
    """Create a new file with the given content."""
    try:
        with open(file_path, 'w') as file:
            file.write(content)
        print(f"File '{file_path}' created successfully.")
    except Exception as e:
        print(f"Error creating file: {e}")

def read_file(file_path):
    """Read and return the contents of a file."""
    try:
        with open(file_path, 'r') as file:
            content = file.read()
        print(f"Content of '{file_path}':")
        print(content)
        return content
    except Exception as e:
        print(f"Error reading file: {e}")
        return None

def append_to_file(file_path, content):
    """Append content to an existing file."""
    try:
        with open(file_path, 'a') as file:
            file.write(content)
        print(f"Content appended to '{file_path}' successfully.")
    except Exception as e:
        print(f"Error appending to file: {e}")

def delete_file(file_path):
    """Delete a file."""
    try:
        os.remove(file_path)
        print(f"File '{file_path}' deleted successfully.")
    except Exception as e:
        print(f"Error deleting file: {e}")

# Example usage
if __name__ == "__main__":
    file_path = 'example.txt'
    
    # Create a new file and write content to it
    create_file(file_path, "Hello, this is a test file.\n")
    
    # Read the contents of the file
    read_content = read_file(file_path)
    
    # Append more content to the file
    append_to_file(file_path, "This is additional content.\n")
    
    # Read the updated contents of the file
    updated_content = read_file(file_path)
    
    # Delete the file
    delete_file(file_path)