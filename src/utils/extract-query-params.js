// transforma a string da url em um objeto
export function extractQueryParams(query) {
    return query.substr(1)// remove o primeiro caractere "?"
      .split('&') //"id=123&active=true" se torna ["id=123", "active=true"].
      .reduce((queryParams, param) => {
      const [key, value] = param.split('=') //"id=123" se torna key = "id" e value = "123"
  
      queryParams[key] = value
  
      return queryParams
    }, {})
  }