export function crudCreate(url, object) {
    fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    })
        .then(response => response.json())
        .then(data => console.log('Created item:', data))
        .catch(error => console.error('Error:', error));
}

export function crudRead(url, id) {
    fetch(`${url}/${id}`, {
        method: 'GET',
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