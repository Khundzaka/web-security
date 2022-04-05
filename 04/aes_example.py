import hashlib
# pip install pycryptodome // for installing pycrypto
from Crypto.Cipher import AES
from Crypto import Random
from base64 import b64decode, b64encode

class MyAES(object):
    def __init__(self, key) -> None:
        self.block_size = AES.block_size
        self.key = hashlib.sha256(key.encode()).digest()

    def encrypt(self, plain_text):
        padded_text = self.__pad(plain_text)
        iv = Random.new().read(self.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        encrypted_text = cipher.encrypt(padded_text.encode())
        return b64encode(iv + encrypted_text).decode('utf-8')

    def decrypt(self, encrypted_text):
        decoded_text = b64decode(encrypted_text)
        iv = decoded_text[:self.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        plain_text = cipher.decrypt(decoded_text[self.block_size:]).decode('utf-8')
        return self.__unpad(plain_text)
    
    def __pad(self, plain_text):
        number_of_bytes_to_pad = self.block_size - len(plain_text) % self.block_size
        ascii_string = chr(number_of_bytes_to_pad)
        padding_str = number_of_bytes_to_pad * ascii_string
        padded_plain_text = plain_text + padding_str
        return padded_plain_text

    @staticmethod
    def __unpad(plain_text):
        last_character = plain_text[len(plain_text) - 1:]
        bytes_to_remove = ord(last_character)
        return plain_text[:-bytes_to_remove]

inst = MyAES('randomkeythatIwanted')
wrong = MyAES('randomWrongText')

print(inst.block_size)
print(inst.key)
encrypted = inst.encrypt('random text')
print(encrypted)
print(wrong.decrypt(encrypted))

print(chr(5))
print(ord('a'))