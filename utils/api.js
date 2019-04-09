// This is the API class that we will use to make the api calls to the local server that is running
class Api {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json'
        };
    }
    async get(endpoint) {
        const getRequest = await fetch(endpoint);
        const getResponse = await getRequest.json();

        return getResponse;
    }
    async post(endpoint, dataToPost) {
        const postRequest = await fetch(endpoint, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(dataToPost)
        });
        const postResponse = await postRequest.json();

        return postResponse;
    }
    async put(endpoint, dataToUpdate) {
        const putRequest = await fetch(endpoint, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(dataToUpdate)
        });
        const putResponse = await putRequest.json();

        return putResponse;
    }
    async delete(endpoint, dataToDelete) {
        const deleteRequest = await fetch(endpoint, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(dataToDelete)
        });
        const deleteResponse = await deleteRequest.json();

        return deleteResponse;
    }
}

export default Api;
