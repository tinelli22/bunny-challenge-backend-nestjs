import * as crypto from "crypto";
const aesKey = 'H+KbPeShVmYq3t6w9z$C&F)J@NcQfTjW';

export class CryptoService{
    
    decryptAES(hashKey: string) {
        const encryptionType = 'aes-256-ecb';
        const encryptionEncoding = 'base64';
        const bufferEncryption = 'utf-8';
  
        const buff = Buffer.from(hashKey, encryptionEncoding);
        const key = Buffer.from(aesKey, bufferEncryption);
        const iv = Buffer.from('', bufferEncryption);
        const decipher = crypto.createDecipheriv(encryptionType, key, iv);
    
        var deciphered = decipher.update(buff).toString() + decipher.final().toString();
    
        return deciphered;
      }
    
      cryptAES(hashKey: string) {
  
        const encryptionType = 'aes-256-ecb';
        const encryptionEncoding = 'base64';
        const bufferEncryption = 'utf-8';
  
        const val = hashKey;
        const key = Buffer.from(aesKey, bufferEncryption);
        const iv = Buffer.from('', bufferEncryption);
        const cipher = crypto.createCipheriv(encryptionType, key, iv);
  
        let encrypted = cipher.update(val, bufferEncryption, encryptionEncoding);
        
        return (encrypted += cipher.final(encryptionEncoding));
      }
}