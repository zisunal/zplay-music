import MusicItem from "../components/music-item";

const Home = () => {

    var feedMusics = [
        {
            id: 1,
            title: 'Music Title 1',
            artist: 'Shreya Ghosal',
            artistId: 1,
            album: 'Porineeta',
            albumId: 1,
            views: 100,
            likes: 30
        },
        {
            id: 2,
            title: 'Music Title 2',
            artist: 'AR Rahman',
            artistId: 2,
            albumId: 2,
            album: 'Cocktail',
            views: 900,
            likes: 50
        },
        {
            id: 3,
            title: 'Music Title 3',
            artist: 'Arjit Singh',
            artistId: 3,
            albumId: 3,
            album: 'Dil Bechara',
            views: 700,
            likes: 110
        },
        {
            id: 4,
            title: 'Music Title 4',
            artist: 'Atif Aslam',
            artistId: 4,
            albumId: 4,
            album: 'Tere Bin',
            views: 1100,
            likes: 115
        },
        {
            id: 5,
            title: 'Music Title 5',
            artist: 'Sonu Nigam',
            artistId: 5,
            albumId: 5,
            album: 'Kal Ho Na Ho',
            views: 135,
            likes: 39
        }
    ]

    return (
        <div className="home">
            <div className="feed">
                <h3>Your Feed</h3>
                <div className="contents">
                {
                    feedMusics.map((music, index) => {
                        return <MusicItem key={index} music={music} />
                    })
                }
                </div>
            </div>
        </div>
    );
}

export default Home;