from cryptography.fernet import Fernet
import os

def generate_and_store_key():
    
    key = Fernet.generate_key()

    print("key generated:", key)
    
    
    os.environ["ENCRYPTION_KEY"] = key.decode()

if __name__ == "__main__":
    generate_and_store_key()
