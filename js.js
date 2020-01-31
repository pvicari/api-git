var btn_add = document.querySelector("#adicionar");
var input_name = document.querySelector("#nome");
var list_repo = document.querySelector('#repositorios');
var span_status = document.querySelector('#status');

console.log(btn_add);
function getRepos(name) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/" + name + "/repos");
    xhr.send(null);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject('Erro na requisição');
        }
      }
    };
  });
}

btn_add.onclick = () => {
  console.log("comecou");
  var nome = input_name.value;
  span_status.innerHTML = 'Carregando...';
  getRepos(nome)
    .then(function(response) {
        console.log(response);
        let list = '';
        for(repo of response){
            list += `<li><a href = "`+ repo.html_url + `">`+ repo.name + `</a></li>`;
        }
        span_status.innerHTML = '';
        list_repo.innerHTML = list;
    })
    .catch(function(response) {
        span_status.innerHTML = response;
        list_repo.innerHTML = '';
    });
};
