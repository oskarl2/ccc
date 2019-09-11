export async function saveWorkers(workers) {
    return localStorage.setItem('workers_list', JSON.stringify(workers))
}

export async function loadWorkers() {
    const value = localStorage.getItem('workers_list');

    if (value !== null && value !== undefined) {
        return JSON.parse(value);
    }

    return [];
}