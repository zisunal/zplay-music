import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp, faPlay } from '@fortawesome/free-solid-svg-icons';
import thumbnail from '../img/song.png';
import { useNavigate } from 'react-router-dom';

const intl = new Intl.NumberFormat('en-US', { 
    notation: "compact", 
    compactDisplay: "short" 
});

const MusicItem = ({ music }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/music/${music.id}`)
    }
    return (
        <div onClick={handleClick} className="content">
            <img src={thumbnail} alt="thumbnail" />
            <h3>{ music.title }</h3>
            <div className="meta">
                <p>Artist: { music.artist }</p>
                <p>Album: { music.album }</p>
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
        </div>
    );
}

export default MusicItem;