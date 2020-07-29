/*
Easy HTTP Library
Library for making HTTP requests

@Version 3.0.0

@Author Justin Fulton

@License Unsubstantiated_Script

*/

class EasyHTTP {
    //Make an HTTP get request
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }

    //Make an HTTP POST request 
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    };


    //Make an HTTP PUT request 
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    };



    //Make an HTTP Delete Request 

    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const resData = await 'Resource Deleted...';
        return resData;
    }

}

export const hTTp = new EasyHTTP();