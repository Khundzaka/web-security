import hashlib
from Crypto.Cipher import AES
from Crypto import Random
from base64 import b64decode, b64encode

class MyAES(object):
    def __init__(self, key) -> None:
        self.block_size = AES.block_size
        self.key = hashlib.sha256(key.encode()).digest()
    
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

print(inst.block_size)
print(inst.key)

print(chr(97))
print(ord('a'))