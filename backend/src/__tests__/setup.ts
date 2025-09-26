process.env.TZ = 'America/Sao_Paulo'

if (typeof jest !== 'undefined') {
  jest.setTimeout(10000)
}
