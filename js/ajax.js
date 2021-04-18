//funciones anonimas
//XMLHttpResquest
(() => {
  const xhr = new XMLHttpRequest();
  const xhrDom = document.getElementById("xhr");
  const fragment = document.createDocumentFragment();

  //console.log(xhr)

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    //console.log(xhr)

    let json = JSON.parse(xhr.responseText);
    //console.log(json)

    json.forEach((el) => {
      const li = document.createElement("li");
      li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
      fragment.appendChild(li);
    });
    xhrDom.appendChild(fragment);
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

  xhr.send();
})();

//fetch then
(() => {
  const fetchDom = document.getElementById("fetch");
  const fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      //console.log(res)
      return res.ok ? res.json() : Promise.reject(res); //res.json
    })
    .then((json) => {
      //console.log(json)
      //fetchDom.innerHTML = json
      json.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        fragment.appendChild(li);
      });
      fetchDom.appendChild(fragment);
    })
    .catch((error) => {
      //console.log('Estamos en el error', error)
      let mensaje = error.statusText || "Ocurrio un error";
      fetchDom.innerHTML = `Error ${error.status}: ${mensaje}`;
    });
  //.finally(() => console.log('Esto se ejecuta independientemente del resultado de la promesa'))
})();

//async await
(() => {
  const fetchAsync = document.getElementById("fetch-async");
  const fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch('https://jsonplaceholder.typicode.com/users"');
      let json = await res.json();
      //console.log(res, json)

      if (!res.ok) throw { status: res.status, statusText: res.statusText };

      json.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        fragment.appendChild(li);
      });
      fetchAsync.appendChild(fragment);
    } catch (error) {
      console.log(error);
      let mensaje = error.statusText || "Ocurrio un error";
      fetchAsync.innerHTML = `Error ${error.status}: ${mensaje}`;
    } finally {
      //console.log('Esto se ejecuta independientemente del try catch')
    }
  }

  getData();
})();

//axios
(() => {
  const axiosDom = document.getElementById("axios");
  const fragment = document.createDocumentFragment();

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      //console.log(res)
      let data = res.data;
      data.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        fragment.appendChild(li);
      });
      axiosDom.appendChild(fragment);
    })
    .catch((error) => {
      //console.log(error.response)
      let mensaje = error.response.statusText || "Ocurrio un error";
      axiosDom.innerHTML = `Error ${error.response.status}: ${mensaje}`;
    })
    .finally(() => {
      //console.log('Esto se ejecuta independientemente del resultado Axios')
    });
})();

//axios con async await
(() => {
  const axiosAsync = document.getElementById("axios-async");
  const fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users");
      let json = await res.data;

      json.forEach((el) => {
        const li = document.createElement("li");
        li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        fragment.appendChild(li);
      });
      axiosAsync.appendChild(fragment);
    } catch (error) {
      console.log(error.response);
      let mensaje = error.response.statusText || "Ocurrio un error";
      axiosAsync.innerHTML = `Error ${error.response.status}: ${mensaje}`;
    } finally {
    }
  }

  getData();
})();
