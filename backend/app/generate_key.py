from cryptography.fernet import Fernet

# Generate a key
key = Fernet.generate_key()

# Print the key and copy it to your environment
print(key)
