import React, { useEffect, useState } from 'react'

function App() {

    const [users, setUsers] = useState(null);
    const [posts, setPosts] = useState(null);
    const [albums, setAlbums] = useState(null);

    useEffect(() => {
        getAllData();
    }, [])

    const getAllData = async () => {
        try {
            const responses = await Promise.all([
                fetch('https://jsonplaceholder.typicode.com/users'),
                fetch('https://jsonplaceholder.typicode.com/posts'),
                fetch('https://jsonplaceholder.typicode.com/albums')
            ])

            const values = await Promise.all(responses.map((response) => response.json()));

            const [users, posts, albums] = values; // destructuring users, posts, and albums from values (array)

            setUsers(users);
            setPosts(posts);
            setAlbums(albums);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>App</div>
    )
}

export default App