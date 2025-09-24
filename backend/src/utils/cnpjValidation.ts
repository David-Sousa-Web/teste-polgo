export function isValidCNPJ(cnpj: string): boolean {
  const cleanCnpj = cnpj.replace(/\D/g, '')
  
  if (cleanCnpj.length !== 14) {
    return false
  }

  if (/^(\d)\1+$/.test(cleanCnpj)) {
    return false
  }

  let soma = 0
  let peso = 2
  
  for (let i = 11; i >= 0; i--) {
    soma += parseInt(cleanCnpj.charAt(i)) * peso
    peso = peso === 9 ? 2 : peso + 1
  }
  
  const resto = soma % 11
  const digito1 = resto < 2 ? 0 : 11 - resto
  
  if (parseInt(cleanCnpj.charAt(12)) !== digito1) {
    return false
  }
  
  soma = 0
  peso = 2
  
  for (let i = 12; i >= 0; i--) {
    soma += parseInt(cleanCnpj.charAt(i)) * peso
    peso = peso === 9 ? 2 : peso + 1
  }
  
  const resto2 = soma % 11
  const digito2 = resto2 < 2 ? 0 : 11 - resto2
  
  return parseInt(cleanCnpj.charAt(13)) === digito2
}

export function cleanCNPJ(cnpj: string): string {
  return cnpj.replace(/\D/g, '')
}
