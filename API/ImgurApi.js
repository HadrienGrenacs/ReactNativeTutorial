const clientID = "80d39b58ac93dda";

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

export function getFavoritesImagesFromApi(access, name) {
    const url = 'https://api.imgur.com/3/account/' + name + '/favorites'
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + access
        }
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
}


export function getAccountImagesFromApi(access) {
    const url = 'https://api.imgur.com/3/account/me/images'
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + access
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

export function uploadPhoto(access, photo, title, description) {
    const formData = new FormData();
    formData.append('image', photo);
    formData.append('title', title);
    formData.append('description', description);
    fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + access
        },
        body: formData
    })
        .then((response) => console.log(response))
        .catch((error) => console.error(error))
}
