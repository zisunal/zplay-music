import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp, faPlay } from '@fortawesome/free-solid-svg-icons';
import thumbnail from '../img/song.png';
import { Link } from 'react-router-dom';

const intl = new Intl.NumberFormat('en-US', { 
    notation: "compact", 
    compactDisplay: "short" 
});

const MusicItem = ({ music }) => {
    return (
        <Link to={`/music/${music.id}`} className="content">
            <img src={thumbnail} alt="thumbnail" />
            <h3>{ music.title }</h3>
            <div className="meta">
                <p>Artist: <Link to={'/artist/' + music.artistId} >{ music.artist }</Link></p>
                <p>Album: <Link to={'/album/' + music.albumId} >{ music.album }</Link></p>
            </div>
            <div className="stats">
                <p>
                    <FontAwesomeIcon icon={faEye} />: { intl.format(music.views) }
                </p>
                <p>
                    <FontAwesomeIcon icon={faThumbsUp} />: { intl.format(music.likes) }
                </p>
            </div>
            <button className='play-btn'>
                <FontAwesomeIcon icon={faPlay} />
            </button>
        </Link>
    );
}

export default MusicItem;