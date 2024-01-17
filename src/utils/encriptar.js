import crypto from 'crypto'

async function encriptar(string, claveCifrado){
  const iv = crypto.randomBytes(16) // Generar un vector de inicialización aleatorio
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(claveCifrado), iv)

  let encrypted = cipher.update(string, 'utf-8', 'hex')
  encrypted += cipher.final('hex')

  return {
    iv: iv.toString('hex'),
    encryptedString: encrypted,
  }
}

async function desencriptar(string, claveCifrado, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(claveCifrado), Buffer.from(iv, 'hex'))
  let decrypted = decipher.update(string, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  console.log(decrypted)
  return decrypted
}

export { encriptar, desencriptar }