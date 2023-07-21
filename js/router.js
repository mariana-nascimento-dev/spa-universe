export class Router {

  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  //essa função é para cortar o redirecionamento quando clicar no lick, já que o padrão é redirecionar para outra paágina e o SPA não faz isso
  route(ev) {
    ev = ev || window.ev
    ev.preventDefault()
  
    window.history.pushState({}, "", ev.target.href)//mostra no histórico da barra de pesquisa que a página está sendo mudada
  
    this.handle()
  }
  
  handle() {
    const pathName = window.location.pathname // de forma desestruturada escrevemos assim: const { pathname } = window.location
    const route = this.routes[pathName] || this.routes[404]
  
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })
  }

}
