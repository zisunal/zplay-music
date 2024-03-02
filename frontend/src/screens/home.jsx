import MusicItem from "../components/music-item";

const Home = () => {

    var feedMusics = [
        {
            id: 1,
            title: 'Music Title 1',
            artist: 'Shreya Ghosal',
            album: 'Porineeta',
            views: 100,
            likes: 30
        },
        {
            id: 2,
            title: 'Music Title 2',
            artist: 'AR Rahman',
            album: 'Cocktail',
            views: 900,
            likes: 50
        },
        {
            id: 3,
            title: 'Music Title 3',
            artist: 'Arjit Singh',
            album: 'Dil Bechara',
            views: 700,
            likes: 110
        },
        {
            id: 4,
            title: 'Music Title 4',
            artist: 'Atif Aslam',
            album: 'Tere Bin',
            views: 1100,
            likes: 115
        },
        {
            id: 5,
            title: 'Music Title 5',
            artist: 'Sonu Nigam',
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