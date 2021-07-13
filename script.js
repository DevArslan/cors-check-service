
function addListenerOnButton(){
    const button = document.getElementById('send-button')
    console.log(button)
    button.addEventListener("click", ()=> {
        sendRequest().then(res=>console.log(res))
    } );
}

function generateBasicAuthToken({
    username,
    password,
  }) {
    return btoa(unescape(encodeURIComponent(`${username}:${password}`)));
  }

//http://192.168.112.5:9090/vp.core/control?method=get_all_cameras
async function sendRequest(){
    const url = document.getElementById('request').value
    const method = document.getElementById('http-method').value
    const body = document.getElementById('request-body').value
    const login = document.getElementById('login').value
    const password = document.getElementById('password').value

    const response = await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${generateBasicAuthToken(login,password)}`
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(body) // body data type must match "Content-Type" header
      });
      return await response.json(); // parses JSON response into native JavaScript objects

}

addListenerOnButton()