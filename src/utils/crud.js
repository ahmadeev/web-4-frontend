export function crudCreate(url, object) {
    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    })
    //  удалена обработка !response.ok, response.status === 401, catch, превращение в json
}

export function crudRead(url, id) {
    fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`,
        },
    })
        .then(response => response.json())
        .then(data => console.log('Item data:', data))
        .catch(error => console.error('Error:', error));
}

export function crudUpdate(url, id) {
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`,
        },
        body: JSON.stringify({
            name: 'Updated Item',
            description: 'Updated description of the item',
        }),
    })
        .then(response => response.json())
        .then(data => console.log('Updated item:', data))
        .catch(error => console.error('Error:', error));
}

export function crudDelete(url, id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`,
        },
    })
        .then(response => {
            if (response.ok) {
                console.log('Item deleted');
            } else {
                console.log('Failed to delete item');
            }
        })
        .catch(error => console.error('Error:', error));
}

//--------------------many

export async function crudReadMany(url, page = 0, size = 10) {
    return fetch(`${url}?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`,
        },
    });
}

export async function crudDeleteMany(url) {
    try {
        const response = await fetch(`${url}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('sessionToken')}`,
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Item data:', data);
        return data;
    } catch (error) {
        console.error('Error:', error.message || error);
        return null;
    }
}