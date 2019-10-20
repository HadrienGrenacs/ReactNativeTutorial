const clientID = "546c25a59c58ad7";
const token = "4c7e8ed1b89fc7914a284014a6cc7312e8f7bc00";
const gabtoken = "842f54e843ec42d8f5f3c58ec954353d5efed3cc";

export function getImageFromApi(cover) {
    const url = 'https://api.imgur.com/3/image/' + cover
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "Client-ID " + clientID
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getAccountImagesFromApi() {
    const url = 'https://api.imgur.com/3/account/me/images'
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + gabtoken
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getGalleryFromApi(section) {
    const url = 'https://api.imgur.com/3/gallery/' + section + '/viral/day/1'
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "Client-ID " + clientID
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getGalleryFromApiWithText(text) {
    const url = 'https://api.imgur.com/3/gallery/search?q=' + text
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "Client-ID " + clientID
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}


export function getProfileFromApi(name) {
    const url = 'https://api.imgur.com/3/account/' + name
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "Client-ID " + clientID
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function uploadPhoto(photo) {
    const formData = new FormData();
    formData.append('image', photo);
    fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
    })
        .then((response) => console.log(response))
        .catch((error) => console.error(error))
}
